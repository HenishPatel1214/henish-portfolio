import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

export default function Navbar({ navigation, activeSection, name }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#5667c7]/55 bg-[#101848]/92 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="font-display text-sm font-semibold tracking-[0.22em] text-indigo-50">
          {name}
        </a>

        <button
          type="button"
          className="rounded-md border border-[#6276d6]/55 p-2 text-indigo-50 transition hover:border-brand-300/60 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-[#5667c7]/55 bg-[#1a255d]/90 p-1 md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={clsx(
                'rounded-full px-4 py-2 text-sm transition',
                activeSection === item.id
                  ? 'bg-brand-400/20 text-brand-100'
                  : 'text-indigo-200/90 hover:bg-[#26337b]/90 hover:text-indigo-50',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="border-t border-[#5667c7]/55 bg-[#0f1642]/95 px-5 py-4 md:hidden">
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
                      : 'text-indigo-200/90 hover:bg-[#26337b]/90 hover:text-indigo-50',
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
