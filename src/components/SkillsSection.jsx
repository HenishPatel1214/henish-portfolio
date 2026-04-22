import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

export default function SkillsSection({ skills }) {
  const entries = Object.entries(skills)

  return (
    <AnimatedSection id="skills" variant="fromBottom" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Skills"
        title="Technical toolkit built for end-to-end delivery."
        description="I work comfortably from low-level systems and data pipelines to polished frontend interfaces and cloud deployment workflows."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {entries.map(([category, values]) => (
          <article
            key={category}
            className="rounded-2xl border border-[#3d63a7]/55 bg-[#131f42] p-6 shadow-soft"
          >
            <h3 className="font-display text-lg font-semibold text-brand-50">{category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {values.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#5f84cc]/55 bg-[#18284f] px-3 py-1 text-xs text-brand-200/90"
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
