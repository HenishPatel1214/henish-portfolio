import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

export default function AboutSection({ highlights }) {
  return (
    <AnimatedSection id="about" variant="fromLeft" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="About"
        title="I build software systems that make complex operations feel simple."
        description="I care about practical engineering: robust architecture, measurable performance, and clear user outcomes. My work spans full-stack product development, data engineering, and AI systems that support high-stakes decisions."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-[#1f7a59]/55 bg-[#0b2018] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-300/50 hover:bg-[#0e2c22]"
          >
            <h3 className="font-display text-lg font-semibold text-brand-50">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-200/90">{item.detail}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  )
}
