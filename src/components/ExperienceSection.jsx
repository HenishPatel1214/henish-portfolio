import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

export default function ExperienceSection({ experiences }) {
  return (
    <AnimatedSection
      id="experience"
      className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24"
    >
      <SectionTitle
        eyebrow="Experience"
        title="From startup execution to institutional systems impact."
        description="I blend product thinking with engineering depth to build systems that reduce manual effort, improve speed, and scale with team needs."
      />

      <div className="relative mt-12 space-y-6 border-l border-[#5667c7]/55 pl-7 md:pl-10">
        {experiences.map((job) => (
          <article
            key={`${job.company}-${job.role}`}
            className="relative rounded-2xl border border-[#5667c7]/55 bg-[#121a46] p-6 shadow-soft"
          >
            <span className="absolute -left-[38px] top-8 h-3 w-3 rounded-full border border-brand-200/80 bg-brand-300 md:-left-[45px]" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-200/80">{job.period}</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-indigo-50">{job.role}</h3>
            <p className="mt-1 text-sm text-brand-100">{job.company}</p>
            <p className="mt-4 text-sm leading-relaxed text-indigo-200/90">{job.summary}</p>

            <ul className="mt-5 space-y-2">
              {job.highlights.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-relaxed text-indigo-200/90">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {job.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#6276d6]/55 bg-[#1a255d] px-3 py-1 text-xs text-indigo-200/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  )
}
