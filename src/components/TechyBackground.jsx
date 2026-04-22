import { motion as Motion, useTransform } from 'framer-motion'

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

      <div className="absolute inset-0 tech-flow-grid" />
      <div className="absolute inset-0 bg-grid-mask opacity-45" />
      <div className="absolute inset-0 tech-vignette" />
    </div>
  )
}
