'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { type Locale, translations } from './translations'

type LangContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (typeof translations)[Locale]
}

const LangContext = createContext<LangContextValue>({
  locale: 'es',
  setLocale: () => {},
  t: translations.es,
})

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'es'
  const lang = navigator.language.slice(0, 2)
  return lang === 'en' ? 'en' : 'es'
}

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem('locale')
    if (stored === 'es' || stored === 'en') return stored
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  return detectLocale()
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')

  // Runs once after hydration to pick up stored/detected locale.
  // Reading localStorage during SSR is not possible, so initializing state here is
  // intentional: we render with 'es' (SSR-safe default), hydrate consistently, then switch.
  useEffect(() => {
    const initial = readStoredLocale()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial !== 'es') setLocaleState(initial)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  function setLocale(l: Locale) {
    setLocaleState(l)
    try {
      localStorage.setItem('locale', l)
    } catch {
      // localStorage unavailable
    }
  }

  return (
    <LangContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LangContext)
}
