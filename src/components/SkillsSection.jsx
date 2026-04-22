import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

export default function SkillsSection({ skills }) {
  const entries = Object.entries(skills)

  return (
    <AnimatedSection id="skills" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Skills"
        title="Technical toolkit built for end-to-end delivery."
        description="I work comfortably from low-level systems and data pipelines to polished frontend interfaces and cloud deployment workflows."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {entries.map(([category, values]) => (
          <article
            key={category}
            className="rounded-2xl border border-white/10 bg-slate-900/45 p-6 shadow-soft"
          >
            <h3 className="font-display text-lg font-semibold text-white">{category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {values.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  )
}
