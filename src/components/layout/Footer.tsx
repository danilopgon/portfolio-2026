export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-6 md:px-16 py-4 border-t border-border">
      <span className="text-[12px] tracking-[0.15em] uppercase text-muted">
        Dani López González © {new Date().getFullYear()}
      </span>
      <a
        href="https://github.com/danilopgon"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] tracking-[0.15em] uppercase text-muted hover:text-cream transition-colors"
      >
        GitHub<span className="sr-only"> (abre en nueva pestaña)</span>
      </a>
    </footer>
  )
}
