import { motion as Motion, useTransform } from 'framer-motion'

const primaryStripePaths = [
  'M -260 48 C 120 -26 330 186 722 132 C 1012 92 1322 12 1712 90 C 2012 148 2282 94 2580 72',
  'M -260 116 C 162 38 362 232 782 176 C 1082 136 1362 52 1742 120 C 2042 172 2322 124 2600 98',
]

const secondaryStripePaths = [
  'M -260 166 C 120 86 360 302 760 242 C 1040 200 1360 130 1720 186 C 2010 230 2330 192 2620 150',
  'M -260 224 C 150 142 390 352 830 292 C 1120 254 1450 178 1820 240 C 2100 286 2360 250 2640 210',
]

const tertiaryStripePaths = [
  'M -300 282 C 100 192 448 402 888 356 C 1230 320 1500 262 1844 316 C 2136 364 2400 336 2680 300',
  'M -300 338 C 82 256 420 452 906 410 C 1264 378 1540 324 1892 374 C 2172 414 2428 392 2702 356',
]

function renderPaths(paths, keyPrefix) {
  return paths.map((path, index) => <path key={`${keyPrefix}-${index}`} d={path} />)
}

export default function TechyBackground({ scrollYProgress }) {
  const layerAX = useTransform(scrollYProgress, [0, 1], [0, -110])
  const layerAY = useTransform(scrollYProgress, [0, 1], [0, 95])
  const layerBX = useTransform(scrollYProgress, [0, 1], [0, 95])
  const layerBY = useTransform(scrollYProgress, [0, 1], [0, -78])
  const layerCX = useTransform(scrollYProgress, [0, 1], [0, -64])
  const layerCY = useTransform(scrollYProgress, [0, 1], [0, 82])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-specsheet-blue-base" />

      <Motion.svg
        viewBox="0 0 2400 360"
        preserveAspectRatio="none"
        className="spec-blue-stripe spec-blue-stripe-a"
        style={{ x: layerAX, y: layerAY }}
        aria-hidden="true"
      >
        {renderPaths(primaryStripePaths, 'primary')}
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 2400 380"
        preserveAspectRatio="none"
        className="spec-blue-stripe spec-blue-stripe-b"
        style={{ x: layerBX, y: layerBY }}
        aria-hidden="true"
      >
        {renderPaths(secondaryStripePaths, 'secondary')}
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 2400 440"
        preserveAspectRatio="none"
        className="spec-blue-stripe spec-blue-stripe-c"
        style={{ x: layerCX, y: layerCY }}
        aria-hidden="true"
      >
        {renderPaths(tertiaryStripePaths, 'tertiary')}
      </Motion.svg>

      <div className="absolute inset-0 spec-blue-dots-global" />
      <div className="absolute inset-0 spec-blue-dots-focus" />
      <div className="absolute inset-0 spec-blue-vignette" />
    </div>
  )
}
