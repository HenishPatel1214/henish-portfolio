import { motion as Motion, useTransform } from 'framer-motion'

const wavePaths = [
  'M0 112 C 128 84, 256 140, 384 112 C 512 84, 640 36, 768 64 C 896 92, 1024 168, 1152 140 C 1280 112, 1408 56, 1536 72 C 1664 88, 1792 144, 1920 120 V 260 H 0 Z',
  'M0 122 C 160 96, 320 150, 480 122 C 640 94, 800 40, 960 72 C 1120 104, 1280 176, 1440 148 C 1600 120, 1760 74, 1920 86 V 260 H 0 Z',
  'M0 136 C 150 114, 300 158, 450 136 C 600 114, 750 70, 900 88 C 1050 106, 1200 172, 1350 158 C 1500 144, 1650 98, 1800 110 C 1920 120, 1920 120, 1920 120 V 260 H 0 Z',
]

export default function TechyBackground({ scrollYProgress }) {
  const driftY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const reverseY = useTransform(scrollYProgress, [0, 1], [0, -95])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-tech-base" />

      <Motion.div className="absolute inset-[-15%] tech-wave-cloud tech-wave-cloud-primary" style={{ y: driftY }} />
      <Motion.div className="absolute inset-[-20%] tech-wave-cloud tech-wave-cloud-secondary" style={{ y: reverseY }} />

      <div className="absolute inset-0 tech-dot-field" />

      <svg
        viewBox="0 0 1920 260"
        aria-hidden="true"
        className="tech-wave-lines tech-wave-lines-back"
        preserveAspectRatio="none"
      >
        {wavePaths.map((path) => (
          <path key={`${path}-back`} d={path} />
        ))}
      </svg>

      <svg
        viewBox="0 0 1920 260"
        aria-hidden="true"
        className="tech-wave-lines tech-wave-lines-front"
        preserveAspectRatio="none"
      >
        {wavePaths.map((path) => (
          <path key={`${path}-front`} d={path} />
        ))}
      </svg>

      <div className="absolute inset-0 bg-grid-mask opacity-70" />
      <div className="absolute inset-0 tech-vignette" />
    </div>
  )
}
