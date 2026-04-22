import { useEffect, useRef, useState } from 'react'

const DEFAULT_TWEAKS = {
  speed: 0.086,
  contourCount: 16,
  cellSize: 28,
  noiseScale: 0.0092,
  warp: 0.41,
  lineWidth: 0.56,
  glow: 4.6,
  accentEvery: 3,
  baseAlpha: 0.17,
  accentAlpha: 0.36,
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function createSeededRandom(seed) {
  let current = seed >>> 0

  return function next() {
    current += 0x6d2b79f5
    let value = Math.imul(current ^ (current >>> 15), 1 | current)
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

class PerlinNoise2D {
  constructor(seed = 1) {
    const random = createSeededRandom(seed)
    const table = new Uint16Array(256)

    for (let i = 0; i < 256; i += 1) {
      table[i] = i
    }

    for (let i = 255; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1))
      const temp = table[i]
      table[i] = table[j]
      table[j] = temp
    }

    this.permutation = new Uint16Array(512)
    for (let i = 0; i < 512; i += 1) {
      this.permutation[i] = table[i & 255]
    }
  }

  static fade(value) {
    return value * value * value * (value * (value * 6 - 15) + 10)
  }

  static lerp(a, b, t) {
    return a + (b - a) * t
  }

  static gradient(hash, x, y) {
    const h = hash & 7
    const u = h < 4 ? x : y
    const v = h < 4 ? y : x
    const first = (h & 1) === 0 ? u : -u
    const second = (h & 2) === 0 ? v : -v
    return first + second
  }

  noise(x, y) {
    const xi = Math.floor(x) & 255
    const yi = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)

    const u = PerlinNoise2D.fade(xf)
    const v = PerlinNoise2D.fade(yf)

    const aa = this.permutation[this.permutation[xi] + yi]
    const ab = this.permutation[this.permutation[xi] + yi + 1]
    const ba = this.permutation[this.permutation[xi + 1] + yi]
    const bb = this.permutation[this.permutation[xi + 1] + yi + 1]

    const x1 = PerlinNoise2D.lerp(
      PerlinNoise2D.gradient(aa, xf, yf),
      PerlinNoise2D.gradient(ba, xf - 1, yf),
      u,
    )
    const x2 = PerlinNoise2D.lerp(
      PerlinNoise2D.gradient(ab, xf, yf - 1),
      PerlinNoise2D.gradient(bb, xf - 1, yf - 1),
      u,
    )

    return PerlinNoise2D.lerp(x1, x2, v)
  }
}

function buildRgba([red, green, blue], alpha) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export default function TechyBackground() {
  const canvasRef = useRef(null)
  const settingsRef = useRef(DEFAULT_TWEAKS)
  const [tweaks, setTweaks] = useState(DEFAULT_TWEAKS)
  const [showControls, setShowControls] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return new URLSearchParams(window.location.search).has('bg-controls')
  })

  useEffect(() => {
    settingsRef.current = tweaks
  }, [tweaks])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.shiftKey && event.key.toLowerCase() === 't') {
        setShowControls((current) => !current)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    })
    if (!context) {
      return undefined
    }

    const noise = new PerlinNoise2D(114735)
    const baseColor = [78, 148, 114]
    const accentColor = [0, 255, 136]
    const levelMin = -0.82
    const levelMax = 0.82

    let width = 0
    let height = 0
    let stride = 0
    let columns = 0
    let rows = 0
    let activeCellSize = settingsRef.current.cellSize
    let field = new Float32Array(0)
    let animationId = 0
    let previousTime = performance.now()
    let time = 0

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = motionQuery.matches
    const onMotionPreferenceChange = (event) => {
      prefersReducedMotion = event.matches
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', onMotionPreferenceChange)
    } else {
      motionQuery.addListener(onMotionPreferenceChange)
    }

    const interpolate = (target, a, b) => {
      const delta = b - a
      if (Math.abs(delta) < 1e-6) {
        return 0.5
      }
      return clamp((target - a) / delta, 0, 1)
    }

    const rebuildGrid = (cellSize) => {
      activeCellSize = cellSize
      columns = Math.ceil(width / activeCellSize)
      rows = Math.ceil(height / activeCellSize)
      stride = columns + 1
      field = new Float32Array((columns + 1) * (rows + 1))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))

      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      rebuildGrid(settingsRef.current.cellSize)
    }

    const sampleNoise = (x, y, t, settings) => {
      const flowX = noise.noise(x * 0.74 + t * 0.038, y * 0.74 - t * 0.03)
      const flowY = noise.noise(x * 0.74 - t * 0.034, y * 0.74 + t * 0.04)

      let value = 0
      let amplitude = 0.62
      let frequency = 1

      for (let octave = 0; octave < 3; octave += 1) {
        const warpedX = x * frequency + flowX * settings.warp
        const warpedY = y * frequency + flowY * settings.warp
        const movementX = t * 0.05 * frequency
        const movementY = t * 0.043 * frequency

        value += amplitude * noise.noise(warpedX + movementX, warpedY - movementY)
        amplitude *= 0.5
        frequency *= 1.94
      }

      return value
    }

    const sampleField = (t, settings) => {
      for (let y = 0; y <= rows; y += 1) {
        const yBase = y * activeCellSize * settings.noiseScale
        const rowOffset = y * stride

        for (let x = 0; x <= columns; x += 1) {
          const xBase = x * activeCellSize * settings.noiseScale
          field[rowOffset + x] = sampleNoise(xBase, yBase, t, settings)
        }
      }
    }

    const traceContour = (level) => {
      context.beginPath()

      for (let y = 0; y < rows; y += 1) {
        const rowOffset = y * stride

        for (let x = 0; x < columns; x += 1) {
          const index = rowOffset + x
          const valueTopLeft = field[index]
          const valueTopRight = field[index + 1]
          const valueBottomRight = field[index + stride + 1]
          const valueBottomLeft = field[index + stride]

          const state =
            (valueTopLeft >= level ? 1 : 0) |
            (valueTopRight >= level ? 2 : 0) |
            (valueBottomRight >= level ? 4 : 0) |
            (valueBottomLeft >= level ? 8 : 0)

          if (state === 0 || state === 15) {
            continue
          }

          const cellX = x * activeCellSize
          const cellY = y * activeCellSize

          const topT = interpolate(level, valueTopLeft, valueTopRight)
          const rightT = interpolate(level, valueTopRight, valueBottomRight)
          const bottomT = interpolate(level, valueBottomRight, valueBottomLeft)
          const leftT = interpolate(level, valueBottomLeft, valueTopLeft)

          const e0x = cellX + topT * activeCellSize
          const e0y = cellY
          const e1x = cellX + activeCellSize
          const e1y = cellY + rightT * activeCellSize
          const e2x = cellX + activeCellSize - bottomT * activeCellSize
          const e2y = cellY + activeCellSize
          const e3x = cellX
          const e3y = cellY + activeCellSize - leftT * activeCellSize

          switch (state) {
            case 1:
            case 14:
              context.moveTo(e3x, e3y)
              context.lineTo(e0x, e0y)
              break
            case 2:
            case 13:
              context.moveTo(e0x, e0y)
              context.lineTo(e1x, e1y)
              break
            case 3:
            case 12:
              context.moveTo(e3x, e3y)
              context.lineTo(e1x, e1y)
              break
            case 4:
            case 11:
              context.moveTo(e1x, e1y)
              context.lineTo(e2x, e2y)
              break
            case 5:
              context.moveTo(e3x, e3y)
              context.lineTo(e2x, e2y)
              context.moveTo(e0x, e0y)
              context.lineTo(e1x, e1y)
              break
            case 6:
            case 9:
              context.moveTo(e0x, e0y)
              context.lineTo(e2x, e2y)
              break
            case 7:
            case 8:
              context.moveTo(e3x, e3y)
              context.lineTo(e2x, e2y)
              break
            case 10:
              context.moveTo(e0x, e0y)
              context.lineTo(e3x, e3y)
              context.moveTo(e1x, e1y)
              context.lineTo(e2x, e2y)
              break
            default:
              break
          }
        }
      }

      context.stroke()
    }

    const draw = (t) => {
      const settings = settingsRef.current
      const roundedCellSize = Math.round(settings.cellSize)
      if (roundedCellSize !== activeCellSize) {
        rebuildGrid(roundedCellSize)
      }

      context.clearRect(0, 0, width, height)
      context.fillStyle = '#050505'
      context.fillRect(0, 0, width, height)

      sampleField(t, settings)

      const levelCount = Math.round(settings.contourCount)
      const levelStep = (levelMax - levelMin) / Math.max(1, levelCount - 1)

      context.lineCap = 'round'
      context.lineJoin = 'round'

      for (let i = 0; i < levelCount; i += 1) {
        const level = levelMin + i * levelStep
        const accent = i % settings.accentEvery === 0

        context.lineWidth = accent ? settings.lineWidth * 1.06 : settings.lineWidth
        context.strokeStyle = accent
          ? buildRgba(accentColor, settings.accentAlpha)
          : buildRgba(baseColor, settings.baseAlpha)
        context.shadowBlur = accent ? settings.glow : 0
        context.shadowColor = accent ? 'rgba(0, 255, 136, 0.18)' : 'transparent'

        traceContour(level)
      }

      context.shadowBlur = 0
      const vignette = context.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.22,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.88,
      )
      vignette.addColorStop(0, 'rgba(5, 5, 5, 0)')
      vignette.addColorStop(1, 'rgba(5, 5, 5, 0.52)')
      context.fillStyle = vignette
      context.fillRect(0, 0, width, height)
    }

    const animate = (timestamp) => {
      const deltaSeconds = Math.min(0.05, (timestamp - previousTime) / 1000)
      previousTime = timestamp

      if (!prefersReducedMotion) {
        time += deltaSeconds * settingsRef.current.speed
      }

      draw(time)
      animationId = requestAnimationFrame(animate)
    }

    resize()
    animationId = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', onMotionPreferenceChange)
      } else {
        motionQuery.removeListener(onMotionPreferenceChange)
      }
    }
  }, [])

  const updateTweak = (key, value) => {
    setTweaks((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="topo-canvas" aria-hidden="true" />
      <div className="absolute inset-0 topo-noise-overlay" />

      {showControls ? (
        <aside className="topo-controls pointer-events-auto">
          <header className="topo-controls-header">
            <span>Background Tweaks</span>
            <button type="button" onClick={() => setShowControls(false)}>
              Hide
            </button>
          </header>

          <label className="topo-control">
            <span>Speed</span>
            <input
              type="range"
              min="0.02"
              max="0.16"
              step="0.005"
              value={tweaks.speed}
              onChange={(event) => updateTweak('speed', Number(event.target.value))}
            />
          </label>

          <label className="topo-control">
            <span>Density</span>
            <input
              type="range"
              min="8"
              max="22"
              step="1"
              value={tweaks.contourCount}
              onChange={(event) => updateTweak('contourCount', Number(event.target.value))}
            />
          </label>

          <label className="topo-control">
            <span>Scale</span>
            <input
              type="range"
              min="0.005"
              max="0.014"
              step="0.0005"
              value={tweaks.noiseScale}
              onChange={(event) => updateTweak('noiseScale', Number(event.target.value))}
            />
          </label>

          <label className="topo-control">
            <span>Glow</span>
            <input
              type="range"
              min="0"
              max="8"
              step="0.2"
              value={tweaks.glow}
              onChange={(event) => updateTweak('glow', Number(event.target.value))}
            />
          </label>

          <label className="topo-control">
            <span>Line Width</span>
            <input
              type="range"
              min="0.3"
              max="1.1"
              step="0.02"
              value={tweaks.lineWidth}
              onChange={(event) => updateTweak('lineWidth', Number(event.target.value))}
            />
          </label>
        </aside>
      ) : null}
    </div>
  )
}
