import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

export default function BeyondCodeSection({ identity, lifestyle, funFacts, backgroundStory }) {
  return (
    <AnimatedSection id="beyond" variant="zoomIn" className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Beyond Code"
        title="A little more about me."
        description="This is the personal side of my story, the part that shapes how I work with people and approach problems."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-5">
        <article className="rounded-2xl border border-[#3d63a7]/55 bg-[#131f42] p-6 shadow-soft md:col-span-3">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-100/80">About Me</p>
          <h3 className="mt-3 font-display text-xl font-semibold text-brand-50">{identity.name}</h3>
          <p className="mt-2 text-sm text-brand-200/90">Nickname: {identity.nickname}</p>
          <p className="mt-4 text-sm leading-relaxed text-brand-200/90">{identity.note}</p>
          <p className="mt-3 text-sm leading-relaxed text-brand-200/90">
            Outside of software, I spend a lot of time around sports, fitness, friends, and family. That balance keeps me grounded
            and gives me energy for hard technical work.
          </p>
        </article>

        <article className="rounded-2xl border border-[#3d63a7]/55 bg-[#131f42] p-6 shadow-soft md:col-span-2">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-100/80">Interests</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {lifestyle.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#5f84cc]/55 bg-[#18284f] px-3 py-1 text-xs text-brand-100"
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[#3d63a7]/55 bg-[#131f42] p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-100/75">Quick Facts</p>
          <ul className="mt-4 space-y-3">
            {funFacts.map((fact) => (
              <li key={fact.title} className="border-b border-[#3d63a7]/25 pb-3 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold text-brand-50">{fact.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-200/90">{fact.text}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-[#3d63a7]/55 bg-[#131f42] p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-100/75">Background</p>
          <div className="mt-4 space-y-3">
            {backgroundStory.map((point, index) => (
              <div key={point} className="flex gap-3">
                <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5f84cc]/55 bg-[#18284f] text-[11px] text-brand-100">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-brand-200/90">{point}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </AnimatedSection>
  )
}
