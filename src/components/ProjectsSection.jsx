import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

function ProjectCard({ project }) {
  return (
    <Motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group h-full rounded-2xl border border-white/10 bg-slate-900/45 p-6 shadow-soft"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-200/80">{project.category}</p>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-slate-300 transition hover:border-brand-200 hover:text-brand-100"
          aria-label={`Open ${project.title} repository`}
        >
          <ArrowUpRight size={14} />
        </a>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.description}</p>

      <div className="mt-5 rounded-xl border border-brand-300/20 bg-brand-400/10 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-100/90">Impact</p>
        <p className="mt-2 text-sm leading-relaxed text-brand-50">{project.impact}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </Motion.article>
  )
}

export default function ProjectsSection({ projects, filters }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((item) => item.category === activeFilter)
  }, [activeFilter, projects])

  return (
    <AnimatedSection id="projects" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Projects"
        title="High-impact builds across AI, data, and full-stack systems."
        description="Each project emphasizes real engineering outcomes: better performance, stronger usability, and clearer technical decision-making."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? 'border-brand-200 bg-brand-300/20 text-brand-100'
                : 'border-white/15 bg-white/[0.03] text-slate-300 hover:border-brand-300/70 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </AnimatedSection>
  )
}
