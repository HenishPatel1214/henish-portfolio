export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <header className="max-w-3xl">
      <p className="font-display text-xs uppercase tracking-[0.35em] text-brand-300/80">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">{description}</p>
    </header>
  )
}
