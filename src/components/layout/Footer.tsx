'use client'
import { useLanguage } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useLanguage()
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
        GitHub<span className="sr-only"> ({t.footer.newTab})</span>
      </a>
    </footer>
  )
}
