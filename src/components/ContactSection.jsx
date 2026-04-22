import { Download, ExternalLink, Mail } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import SectionTitle from './SectionTitle'

function ContactCard({ link }) {
  const isClickable = Boolean(link.href)

  if (!isClickable) {
    return (
      <article className="rounded-2xl border border-white/15 bg-black/20 p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-100/90">{link.label}</p>
        <p className="mt-3 text-sm text-slate-200">{link.value}</p>
      </article>
    )
  }

  return (
    <a
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
      className="group rounded-2xl border border-white/15 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-brand-300/70"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-brand-100/90">{link.label}</p>
      <p className="mt-3 text-sm text-slate-200">{link.value}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-xs text-brand-100">
        Open
        <ExternalLink size={12} />
      </span>
    </a>
  )
}

export default function ContactSection({ links, email }) {
  const resumeHref = `${import.meta.env.BASE_URL}resume/Henish_Patel_Resume.pdf`

  return (
    <AnimatedSection id="contact" className="mx-auto w-full max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/50 via-slate-950/80 to-slate-900/70 p-8 md:p-12">
        <SectionTitle
          eyebrow="Contact"
          title="Let’s build something exceptional."
          description="I am actively seeking software engineering and AI/data systems opportunities where I can ship meaningful products and scalable infrastructure."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <ContactCard key={link.label} link={link} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-300/80 hover:text-white"
          >
            <Mail size={16} />
            Email Me
          </a>

          <a
            href={resumeHref}
            download
            className="inline-flex items-center gap-2 rounded-full bg-brand-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-200"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </AnimatedSection>
  )
}
