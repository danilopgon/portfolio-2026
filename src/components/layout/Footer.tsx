export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-16 py-4 border-t border-border">
      <span className="text-[8px] tracking-[0.15em] uppercase text-muted">
        Dani López González © {new Date().getFullYear()}
      </span>
      <span className="text-[8px] tracking-[0.15em] uppercase text-border">
        Next.js · GSAP · <span className="text-coral">Tailwind</span>
      </span>
    </footer>
  )
}
