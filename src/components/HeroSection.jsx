import { motion as Motion } from 'framer-motion'

function StatCard({ value, label, context }) {
  return (
    <Motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-soft backdrop-blur"
    >
      <p className="font-display text-2xl font-semibold text-brand-100">{value}</p>
      <p className="mt-1 text-sm font-semibold text-white">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400 group-hover:text-slate-300">{context}</p>
    </Motion.article>
  )
}

function PortraitCluster({ headshots }) {
  const baseUrl = import.meta.env.BASE_URL
  const mainPhoto = headshots[0]
  const secondPhoto = headshots[1] ?? headshots[0]
  const thirdPhoto = headshots[2] ?? headshots[0]

  const toSrc = (photo) => {
    if (!photo?.src) {
      return 'https://avatars.githubusercontent.com/u/130112154?v=4'
    }

    if (photo.src.startsWith('http')) {
      return photo.src
    }

    return `${baseUrl}${photo.src}`
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.35 }}
      className="relative mx-auto h-[21rem] w-[17rem] md:h-[24rem] md:w-[19rem]"
    >
      <Motion.figure
        whileHover={{ y: -6, rotate: -1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/20 bg-slate-900/70 shadow-soft"
      >
        <img
          src={toSrc(mainPhoto)}
          alt={mainPhoto?.alt ?? 'Henish Patel portrait'}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051225]/75 via-transparent to-transparent" />
        <figcaption className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs text-slate-100 backdrop-blur-md">
          Building high-performance systems across software, AI, and data.
        </figcaption>
      </Motion.figure>

      <Motion.figure
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut' }}
        className="absolute -left-9 bottom-7 h-24 w-20 overflow-hidden rounded-2xl border border-brand-200/45 bg-slate-900/70 shadow-lg"
      >
        <img
          src={toSrc(secondPhoto)}
          alt={secondPhoto?.alt ?? 'Henish Patel profile image'}
          className="h-full w-full object-cover grayscale-[0.15]"
        />
      </Motion.figure>

      <Motion.figure
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 7.1, ease: 'easeInOut' }}
        className="absolute -right-10 top-8 h-28 w-24 overflow-hidden rounded-2xl border border-cyan-200/45 bg-slate-900/70 shadow-lg"
      >
        <img
          src={toSrc(thirdPhoto)}
          alt={thirdPhoto?.alt ?? 'Henish Patel headshot'}
          className="h-full w-full object-cover saturate-[1.05]"
        />
      </Motion.figure>
    </Motion.div>
  )
}

export default function HeroSection({ personalInfo, quickStats, headshots }) {
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
            className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl"
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
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
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
              className="inline-flex items-center rounded-full bg-brand-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-200"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-300/80 hover:text-white"
            >
              Contact Me
            </a>
          </Motion.div>

          <p className="mt-8 text-sm text-slate-400">{personalInfo.education}</p>
        </div>

        <div className="grid gap-5">
          <PortraitCluster headshots={headshots} />

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
