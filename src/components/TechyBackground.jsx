import { motion as Motion, useTransform } from 'framer-motion'

const primaryStripePaths = [
  'M -260 52 C 120 -18 330 190 720 136 C 1010 96 1320 16 1710 92 C 2010 150 2280 96 2580 72',
  'M -260 118 C 160 40 360 232 780 176 C 1080 136 1360 52 1740 120 C 2040 172 2320 124 2600 98',
]

const secondaryStripePaths = [
  'M -260 166 C 120 86 360 302 760 242 C 1040 200 1360 130 1720 186 C 2010 230 2330 192 2620 150',
  'M -260 224 C 150 142 390 352 830 292 C 1120 254 1450 178 1820 240 C 2100 286 2360 250 2640 210',
]

function renderPaths(paths, keyPrefix) {
  return paths.map((path, index) => <path key={`${keyPrefix}-${index}`} d={path} />)
}

export default function TechyBackground({ scrollYProgress }) {
  const stripeParallaxY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const stripeParallaxYReverse = useTransform(scrollYProgress, [0, 1], [0, -70])
  const stripeParallaxX = useTransform(scrollYProgress, [0, 1], [0, -120])
  const stripeParallaxXReverse = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-specsheet-base" />

      <Motion.svg
        viewBox="0 0 2400 360"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="spec-stripe spec-stripe-a"
        style={{ x: stripeParallaxX, y: stripeParallaxY }}
      >
        {renderPaths(primaryStripePaths, 'primary')}
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 2400 380"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="spec-stripe spec-stripe-b"
        style={{ x: stripeParallaxXReverse, y: stripeParallaxYReverse }}
      >
        {renderPaths(secondaryStripePaths, 'secondary')}
      </Motion.svg>

      <div className="absolute inset-0 spec-dots-global" />
      <div className="absolute inset-0 spec-dots-focus" />
      <div className="absolute inset-0 spec-grid-haze" />
      <div className="absolute inset-0 spec-vignette" />
    </div>
  )
}
