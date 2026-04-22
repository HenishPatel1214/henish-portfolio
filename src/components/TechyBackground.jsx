import { motion as Motion, useTransform } from 'framer-motion'

const wavePaths = [
  'M0 118 C 110 92, 220 152, 330 126 C 440 100, 550 52, 660 70 C 770 88, 880 148, 990 130 C 1100 112, 1210 66, 1320 84 C 1430 102, 1540 160, 1650 136 C 1760 112, 1870 76, 1980 90',
  'M0 142 C 120 116, 240 172, 360 146 C 480 120, 600 66, 720 88 C 840 110, 960 170, 1080 152 C 1200 134, 1320 82, 1440 104 C 1560 126, 1680 186, 1800 166 C 1920 146, 2040 96, 2160 118',
  'M0 96 C 130 70, 260 130, 390 104 C 520 78, 650 36, 780 58 C 910 80, 1040 138, 1170 116 C 1300 94, 1430 50, 1560 70 C 1690 90, 1820 146, 1950 124 C 2080 102, 2210 64, 2340 82',
]

export default function TechyBackground({ scrollYProgress }) {
  const orbDrift = useTransform(scrollYProgress, [0, 1], [0, 110])
  const orbReverse = useTransform(scrollYProgress, [0, 1], [0, -95])
  const ribbonX = useTransform(scrollYProgress, [0, 1], [0, -180])
  const ribbonXReverse = useTransform(scrollYProgress, [0, 1], [0, 140])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-tech-base" />

      <Motion.div className="absolute left-[-20%] top-[-15%] h-[36rem] w-[36rem] tech-orb tech-orb-primary" style={{ y: orbDrift }} />
      <Motion.div className="absolute right-[-18%] top-[15%] h-[32rem] w-[32rem] tech-orb tech-orb-secondary" style={{ y: orbReverse }} />

      <Motion.div className="tech-ribbon tech-ribbon-a" style={{ x: ribbonX }} />
      <Motion.div className="tech-ribbon tech-ribbon-b" style={{ x: ribbonXReverse }} />

      <svg viewBox="0 0 2400 260" aria-hidden="true" className="tech-wave-layer tech-wave-layer-a" preserveAspectRatio="none">
        {wavePaths.map((path) => (
          <path key={`${path}-a`} d={path} />
        ))}
      </svg>
      <svg viewBox="0 0 2400 260" aria-hidden="true" className="tech-wave-layer tech-wave-layer-b" preserveAspectRatio="none">
        {wavePaths.map((path) => (
          <path key={`${path}-b`} d={path} />
        ))}
      </svg>

      <div className="absolute inset-0 tech-flow-grid" />
      <div className="absolute inset-0 bg-grid-mask opacity-45" />
      <div className="absolute inset-0 tech-vignette" />
    </div>
  )
}
