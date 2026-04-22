import { motion as Motion } from 'framer-motion'
import { clsx } from 'clsx'

const EASE = [0.22, 1, 0.36, 1]

const VARIANTS = {
  fade: {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  },
  fromLeft: {
    hidden: { opacity: 0, x: -220, scale: 0.9, rotate: -2 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  },
  fromRight: {
    hidden: { opacity: 0, x: 220, scale: 0.9, rotate: 2 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.72, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.95, ease: EASE },
    },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.25, y: -40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.95, ease: EASE },
    },
  },
  fromBottom: {
    hidden: { opacity: 0, y: 160, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: EASE },
    },
  },
  tilt: {
    hidden: { opacity: 0, rotate: -6, scale: 0.88, x: -80 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      x: 0,
      transition: { duration: 0.95, ease: EASE },
    },
  },
}

export default function AnimatedSection({ id, className, children, variant = 'fade' }) {
  const variants = VARIANTS[variant] ?? VARIANTS.fade

  return (
    <Motion.section
      id={id}
      className={clsx('relative scroll-mt-24', className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      {children}
    </Motion.section>
  )
}
