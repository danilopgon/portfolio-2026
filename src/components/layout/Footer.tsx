export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-16 py-4 border-t border-border">
      <span className="text-[10px] tracking-[0.15em] uppercase text-muted">
        Dani López González © {new Date().getFullYear()}
      </span>
      <span className="text-[10px] tracking-[0.15em] uppercase text-muted">
        Next.js · GSAP · Tailwind
      </span>
    </footer>
  )
}
