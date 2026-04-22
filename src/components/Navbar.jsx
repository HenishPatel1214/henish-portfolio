import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

export default function Navbar({ navigation, activeSection, name }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#060b12]/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="font-display text-sm font-semibold tracking-[0.22em] text-slate-100">
          {name}
        </a>

        <button
          type="button"
          className="rounded-md border border-white/15 p-2 text-slate-100 transition hover:border-brand-300/60 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={clsx(
                'rounded-full px-4 py-2 text-sm transition',
                activeSection === item.id
                  ? 'bg-brand-400/20 text-brand-100'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 bg-[#050910]/95 px-5 py-4 md:hidden">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'block rounded-lg px-3 py-2 text-sm transition',
                    activeSection === item.id
                      ? 'bg-brand-400/20 text-brand-100'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
