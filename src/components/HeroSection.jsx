import { motion as Motion } from 'framer-motion'

function StatCard({ value, label, context }) {
  return (
    <Motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group rounded-2xl border border-[#3d63a7]/55 bg-[#18284f] p-5 shadow-soft backdrop-blur"
    >
      <p className="font-display text-2xl font-semibold text-brand-100">{value}</p>
      <p className="mt-1 text-sm font-semibold text-brand-50">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-brand-300/80 group-hover:text-brand-200/90">{context}</p>
    </Motion.article>
  )
}

export default function HeroSection({ personalInfo, quickStats }) {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden pb-8 pt-28 md:pt-36">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <Motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-xs uppercase tracking-[0.33em] text-brand-200/90"
          >
            Software x AI x Data Systems
          </Motion.p>

          <Motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] text-brand-50 md:text-6xl"
          >
            {personalInfo.name}
          </Motion.h1>

          <Motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-xl font-semibold text-brand-100 md:text-3xl"
          >
            {personalInfo.title}
          </Motion.h2>

          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-brand-200/90 md:text-lg"
          >
            {personalInfo.tagline}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-brand-300 px-6 py-3 text-sm font-semibold text-[#081739] transition hover:bg-brand-200"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-[#79a1df]/55 px-6 py-3 text-sm font-semibold text-brand-50 transition hover:border-brand-300/80 hover:text-brand-50"
            >
              Contact Me
            </a>
          </Motion.div>

          <p className="mt-8 text-sm text-brand-300/80">{personalInfo.education}</p>
        </div>

        <div className="grid gap-5">
          <Motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="grid gap-4"
          >
            {quickStats.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
