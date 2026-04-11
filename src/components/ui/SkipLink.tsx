'use client'
import { useLanguage } from '@/lib/i18n/context'

export default function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-coral focus:text-black focus:text-xs focus:font-mono focus:tracking-widest focus:uppercase"
    >
      {t.skipLink}
    </a>
  )
}
