import { useEffect, useRef } from 'react'

/*
  Single source of truth for all visual/motion behavior.
  Matches the standalone contour-bg file defaults/ranges.
*/
const TOPO_CONFIG = {
  speed: 1, // 0..200
  density: 12, // 6..36
  scale: 230, // 40..260 (pixels)
  glow: 48, // 0..30 (can exceed for slightly stronger glow)
  lineWidth: 46, // 20..180 (x0.01 => 0.46px default)
  mouseWarp: 15, // 0..100
  palette: 'green', // white | green | cyan | amber | magenta
  cellSize: 12,
  background: '#050505',
}

const PALETTES = {
  white: {
    base: [230, 230, 230],
    accent: [255, 255, 255],
    glow: [255, 255, 255],
    baseAlpha: 0.24,
    accentAlpha: 0.52,
  },
  green: {
    base: [100, 236, 172],
    accent: [140, 255, 200],
    glow: [86, 255, 180],
    baseAlpha: 0.22,
    accentAlpha: 0.5,
  },
  cyan: {
    base: [120, 220, 255],
    accent: [170, 244, 255],
    glow: [100, 228, 255],
    baseAlpha: 0.21,
    accentAlpha: 0.48,
  },
  amber: {
    base: [255, 204, 140],
    accent: [255, 227, 172],
    glow: [255, 196, 118],
    baseAlpha: 0.22,
    accentAlpha: 0.5,
  },
  magenta: {
    base: [240, 170, 255],
    accent: [250, 205, 255],
    glow: [232, 150, 255],
    baseAlpha: 0.21,
    accentAlpha: 0.48,
  },
}

/*
  Compact 2D simplex noise implementation (public-domain style port).
  Adapted from Stefan Gustavson's widely used simplex approach.
*/
class Simplex2D {
  constructor(seed = 1337) {
    this.grad3 = new Float32Array([
      1, 1, -1, 1, 1, -1, -1, -1,
      1, 0, -1, 0, 1, 0, -1, 0,
      0, 1, 0, -1, 0, 1, 0, -1,
    ])

    const table = new Uint8Array(256)
    for (let i = 0; i < 256; i += 1) {
      table[i] = i
    }

    let current = seed >>> 0
    const random = () => {
      current += 0x6d2b79f5
      let value = Math.imul(current ^ (current >>> 15), 1 | current)
      value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296
    }

    for (let i = 255; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1))
      const temp = table[i]
      table[i] = table[j]
      table[j] = temp
    }

    this.perm = new Uint8Array(512)
    this.permMod12 = new Uint8Array(512)
    for (let i = 0; i < 512; i += 1) {
      this.perm[i] = table[i & 255]
      this.permMod12[i] = this.perm[i] % 12
    }
  }

  noise2D(x, y) {
    const F2 = 0.5 * (Math.sqrt(3) - 1)
    const G2 = (3 - Math.sqrt(3)) / 6

    const skew = (x + y) * F2
    const i = Math.floor(x + skew)
    const j = Math.floor(y + skew)

    const unskew = (i + j) * G2
    const X0 = i - unskew
    const Y0 = j - unskew
    const x0 = x - X0
    const y0 = y - Y0

    let i1 = 0
    let j1 = 0
    if (x0 > y0) {
      i1 = 1
    } else {
      j1 = 1
    }

    const x1 = x0 - i1 + G2
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1 + 2 * G2
    const y2 = y0 - 1 + 2 * G2

    const ii = i & 255
    const jj = j & 255

    const gi0 = this.permMod12[ii + this.perm[jj]] * 2
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]] * 2
    const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]] * 2

    const grad3 = this.grad3

    let n0 = 0
    let n1 = 0
    let n2 = 0

    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 >= 0) {
      t0 *= t0
      n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0)
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 >= 0) {
      t1 *= t1
      n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1)
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 >= 0) {
      t2 *= t2
      n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2)
    }

    return 70 * (n0 + n1 + n2)
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function toRgba(rgb, alpha) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
}

function interpolateEdge(iso, a, b) {
  const delta = b - a
  if (Math.abs(delta) < 1e-6) {
    return 0.5
  }
  return clamp((iso - a) / delta, 0, 1)
}

export default function TechyBackground() {
  const canvasRef = useRef(null)

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

    const config = TOPO_CONFIG
    const noise = new Simplex2D(38421)

    let width = 0
    let height = 0
    let deviceScale = 1

    let columns = 0
    let rows = 0
    let stride = 0
    let field = new Float32Array(0)

    let rafId = 0
    let time = 0
    let lastTimestamp = performance.now()

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      radius: 260,
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduceMotion = motionQuery.matches
    const onMotionPreferenceChange = (event) => {
      reduceMotion = event.matches
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', onMotionPreferenceChange)
    } else {
      motionQuery.addListener(onMotionPreferenceChange)
    }

    const rebuildGrid = () => {
      columns = Math.ceil(width / config.cellSize)
      rows = Math.ceil(height / config.cellSize)
      stride = columns + 1
      field = new Float32Array((columns + 1) * (rows + 1))
    }

    const resize = () => {
      width = Math.max(1, window.innerWidth)
      height = Math.max(1, window.innerHeight)

      deviceScale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * deviceScale)
      canvas.height = Math.floor(height * deviceScale)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)
      rebuildGrid()
    }

    const buildField = (phase) => {
      let minValue = Infinity
      let maxValue = -Infinity

      const warpStrength = (config.mouseWarp / 100) * 140
      const scale = Math.max(1, config.scale)

      for (let gy = 0; gy <= rows; gy += 1) {
        const rowOffset = gy * stride

        for (let gx = 0; gx <= columns; gx += 1) {
          let sampleX = gx * config.cellSize
          let sampleY = gy * config.cellSize

          if (pointer.active && config.mouseWarp > 0) {
            const dx = sampleX - pointer.x
            const dy = sampleY - pointer.y
            const distance = Math.hypot(dx, dy)

            if (distance > 0 && distance < pointer.radius) {
              const falloff = 1 - distance / pointer.radius
              const push = warpStrength * falloff * falloff
              sampleX += (dx / distance) * push
              sampleY += (dy / distance) * push
            }
          }

          const nx = sampleX / scale
          const ny = sampleY / scale

          const octaveA = noise.noise2D(nx + phase * 0.42, ny - phase * 0.36)
          const octaveB = noise.noise2D(nx * 2.15 - phase * 0.31, ny * 2.15 + phase * 0.29)
          const value = octaveA * 0.72 + octaveB * 0.28

          field[rowOffset + gx] = value
          if (value < minValue) minValue = value
          if (value > maxValue) maxValue = value
        }
      }

      return { minValue, maxValue }
    }

    const traceIsoLevel = (iso) => {
      const cellSize = config.cellSize

      context.beginPath()

      for (let y = 0; y < rows; y += 1) {
        const row = y * stride
        const y0 = y * cellSize

        for (let x = 0; x < columns; x += 1) {
          const index = row + x

          const v0 = field[index]
          const v1 = field[index + 1]
          const v2 = field[index + stride + 1]
          const v3 = field[index + stride]

          const state =
            (v0 >= iso ? 1 : 0) |
            (v1 >= iso ? 2 : 0) |
            (v2 >= iso ? 4 : 0) |
            (v3 >= iso ? 8 : 0)

          if (state === 0 || state === 15) {
            continue
          }

          const x0 = x * cellSize

          const tTop = interpolateEdge(iso, v0, v1)
          const tRight = interpolateEdge(iso, v1, v2)
          const tBottom = interpolateEdge(iso, v3, v2)
          const tLeft = interpolateEdge(iso, v0, v3)

          const eTopX = x0 + tTop * cellSize
          const eTopY = y0

          const eRightX = x0 + cellSize
          const eRightY = y0 + tRight * cellSize

          const eBottomX = x0 + tBottom * cellSize
          const eBottomY = y0 + cellSize

          const eLeftX = x0
          const eLeftY = y0 + tLeft * cellSize

          switch (state) {
            case 1:
            case 14:
              context.moveTo(eLeftX, eLeftY)
              context.lineTo(eTopX, eTopY)
              break
            case 2:
            case 13:
              context.moveTo(eTopX, eTopY)
              context.lineTo(eRightX, eRightY)
              break
            case 3:
            case 12:
              context.moveTo(eLeftX, eLeftY)
              context.lineTo(eRightX, eRightY)
              break
            case 4:
            case 11:
              context.moveTo(eRightX, eRightY)
              context.lineTo(eBottomX, eBottomY)
              break
            case 5:
              context.moveTo(eLeftX, eLeftY)
              context.lineTo(eTopX, eTopY)
              context.moveTo(eRightX, eRightY)
              context.lineTo(eBottomX, eBottomY)
              break
            case 6:
            case 9:
              context.moveTo(eTopX, eTopY)
              context.lineTo(eBottomX, eBottomY)
              break
            case 7:
            case 8:
              context.moveTo(eLeftX, eLeftY)
              context.lineTo(eBottomX, eBottomY)
              break
            case 10:
              context.moveTo(eTopX, eTopY)
              context.lineTo(eRightX, eRightY)
              context.moveTo(eLeftX, eLeftY)
              context.lineTo(eBottomX, eBottomY)
              break
            default:
              break
          }
        }
      }

      context.stroke()
    }

    const draw = (timestamp) => {
      const delta = Math.min(0.05, (timestamp - lastTimestamp) / 1000)
      lastTimestamp = timestamp

      if (!reduceMotion) {
        time += delta * config.speed * 0.035
      }

      const { minValue, maxValue } = buildField(time)

      context.clearRect(0, 0, width, height)
      context.fillStyle = config.background
      context.fillRect(0, 0, width, height)

      const palette = PALETTES[config.palette] || PALETTES.white
      const levels = clamp(Math.round(config.density), 2, 64)

      const range = Math.max(1e-6, maxValue - minValue)
      const pad = range * 0.06
      const lo = minValue + pad
      const hi = maxValue - pad
      const step = (hi - lo) / Math.max(1, levels - 1)

      const baseLineWidth = Math.max(0.05, config.lineWidth * 0.01)
      const pulse = 0.9 + 0.1 * Math.sin(time * 0.85)

      context.lineCap = 'round'
      context.lineJoin = 'round'

      for (let i = 0; i < levels; i += 1) {
        const iso = lo + step * i
        const isIndexLine = i % 4 === 0

        const alpha = (isIndexLine ? palette.accentAlpha : palette.baseAlpha) * pulse
        const color = isIndexLine ? palette.accent : palette.base

        context.strokeStyle = toRgba(color, alpha)
        context.lineWidth = isIndexLine ? baseLineWidth * 1.16 : baseLineWidth

        const glowRadius = config.glow * 0.27
        context.shadowBlur = isIndexLine ? glowRadius * 1.12 : glowRadius * 0.46
        context.shadowColor = toRgba(palette.glow, isIndexLine ? 0.38 : 0.2)

        traceIsoLevel(iso)
      }

      context.shadowBlur = 0
      rafId = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    rafId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    window.addEventListener('mouseleave', onPointerLeave)
    window.addEventListener('blur', onPointerLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('blur', onPointerLeave)

      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', onMotionPreferenceChange)
      } else {
        motionQuery.removeListener(onMotionPreferenceChange)
      }
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="topo-canvas" aria-hidden="true" />
      <div className="absolute inset-0 topo-vignette" aria-hidden="true" />
    </div>
  )
}
