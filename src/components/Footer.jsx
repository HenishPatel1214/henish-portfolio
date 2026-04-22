export default function Footer() {
  return (
    <footer className="border-t border-[#5667c7]/55 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-xs text-indigo-300/70 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Henish Patel. Built with React, Tailwind, and Framer Motion.</p>
        <p>Focused on software engineering, AI systems, and data-driven impact.</p>
      </div>
    </footer>
  )
}
