import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

export default function BeyondCodeSection({ identity, lifestyle, funFacts, backgroundStory }) {
  return (
    <AnimatedSection id="beyond" variant="zoomIn" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Beyond Code"
        title="Who I am outside engineering."
        description="I care deeply about building software, but I also bring personality, discipline, and team spirit into the way I collaborate and lead."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#1f7a59]/55 bg-[#0b2018] p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-100/80">Identity</p>
          <h3 className="mt-3 font-display text-xl font-semibold text-brand-50">{identity.name}</h3>
          <p className="mt-2 text-sm text-brand-200/90">Nickname: {identity.nickname}</p>
          <p className="mt-3 text-sm leading-relaxed text-brand-200/90">{identity.note}</p>
        </article>

        <article className="rounded-2xl border border-[#1f7a59]/55 bg-[#0b2018] p-6 shadow-soft md:col-span-2">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-100/80">Interests & Lifestyle</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {lifestyle.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#24936d]/55 bg-[#0f2a20] px-3 py-1 text-xs text-brand-100"
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {funFacts.map((fact) => (
          <article
            key={fact.title}
            className="rounded-2xl border border-[#1f7a59]/55 bg-[#0b2018] p-6 transition hover:-translate-y-1 hover:border-brand-300/50"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-brand-100/75">{fact.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-brand-200/90">{fact.text}</p>
          </article>
        ))}
      </div>

      <article className="mt-4 rounded-2xl border border-[#1f7a59]/55 bg-[#0b2018] p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-100/75">Background Story</p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {backgroundStory.map((point) => (
            <p key={point} className="text-sm leading-relaxed text-brand-200/90">
              • {point}
            </p>
          ))}
        </div>
      </article>
    </AnimatedSection>
  )
}
