import { motion as Motion } from 'framer-motion'
import { clsx } from 'clsx'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function AnimatedSection({ id, className, children }) {
  return (
    <Motion.section
      id={id}
      className={clsx('relative scroll-mt-24', className)}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </Motion.section>
  )
}
