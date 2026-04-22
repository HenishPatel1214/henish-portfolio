import { motion as Motion, useTransform } from 'framer-motion'

export default function TechyBackground({ scrollYProgress }) {
  const blobAY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const blobAX = useTransform(scrollYProgress, [0, 1], [0, -80])
  const blobBY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const blobBX = useTransform(scrollYProgress, [0, 1], [0, 70])
  const blobCY = useTransform(scrollYProgress, [0, 1], [0, 95])
  const blobCX = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 ln-bg-base" />
      <Motion.div className="ln-bg-blob ln-bg-blob-a" style={{ x: blobAX, y: blobAY }} />
      <Motion.div className="ln-bg-blob ln-bg-blob-b" style={{ x: blobBX, y: blobBY }} />
      <Motion.div className="ln-bg-blob ln-bg-blob-c" style={{ x: blobCX, y: blobCY }} />
      <div className="absolute inset-0 ln-bg-grid" />
      <div className="absolute inset-0 ln-bg-noise" />
      <div className="absolute inset-0 ln-bg-vignette" />
    </div>
  )
}
