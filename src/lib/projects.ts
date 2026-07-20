import type { Locale } from './i18n/translations'

export type Project = {
  slug: string
  name: string
  description: string
  process?: string
  year: number
  tags: string[]
  gradient: string
  image?: string
  url?: string
}

const projectsData: Record<Locale, Project[]> = {
  es: [
    {
      slug: 'lazy-lands',
      name: 'Lazy Lands',
      description:
        'Un compañero de campaña para directores de juego que mantiene la coherencia entre sesiones en partidas largas. Frontend en Next.js, backend en FastAPI, Supabase para datos y autenticación, y una abstracción de proveedor LLM para que la IA sea intercambiable, con un fake en desarrollo para tests deterministas. La regla de fondo: la IA propone recuerdos, el director decide. Nunca fija el canon por su cuenta.',
      process:
        'La IA nunca fija el canon: propone recuerdos de sesión y el director de juego los acepta, edita o descarta. Cada aportación queda marcada según su origen (IA sin tocar o editada por el director), para que la memoria de la campaña sea siempre revisable, nunca automática.',
      year: 2026,
      tags: ['Next.js', 'FastAPI', 'Supabase', 'LLM'],
      gradient: 'from-[#0c2a1a] to-[#14361f]',
      image: '/images/projects/lazy-lands.webp',
      url: 'https://lazy-lands.com',
    },
    {
      slug: 'hotel-sur',
      name: 'Hotel Sur',
      description:
        'Landing page para Hotel Sur, mi banda. Construida desde cero, sin plantilla, sin CMS. Quería que sintiera como suena la banda: con textura, con intención, con un punto nostálgico. GSAP para el movimiento, Next.js para la estructura.',
      process:
        'Dirección de arte pensada desde cero para la banda: brutalista y atmosférica, oscura por defecto, con el blanco reservado a interrupciones narrativas puntuales. Evité conscientemente la plantilla típica de banda indie.',
      year: 2025,
      tags: ['Next.js', 'Tailwind', 'GSAP'],
      gradient: 'from-[#0a0a20] to-[#0a1a30]',
      image: '/images/projects/hotel-sur.png',
      url: 'https://hotelsur.es',
    },
    {
      slug: 'holy-seitan',
      name: 'Holy Seitan',
      description:
        'Una app de recetas que busca ante todo ser útil. Las recetas viven como archivos Markdown, Supabase maneja el backend y Drizzle ORM mantiene las consultas con tipos seguros. El tradeoff: Markdown frente a un CMS cambia flexibilidad por un formato rápido de escribir y fácil de versionar. La uso cada semana.',
      year: 2025,
      tags: ['Next.js', 'Supabase', 'Drizzle ORM', 'Shadcn/UI'],
      gradient: 'from-[#3a0a0a] to-[#1a1a0a]',
      image: '/images/projects/holy-seitan.webp',
      url: 'https://holy-seitan.danilopgon.com/',
    },
    {
      slug: 'dia-de-gachas',
      name: 'Día de Gachas',
      description:
        'Una app que detecta si hace tiempo de gachas. Frontend en Angular, backend en NestJS, API del tiempo en tiempo real. El objetivo era mantenerlo simple mientras hacía trabajo full-stack real, una prueba útil de cómo Angular y Nest se integran de principio a fin con facilidad.',
      year: 2025,
      tags: ['Angular', 'Nest', 'PrimeNG', 'GSAP'],
      gradient: 'from-[#1a3a20] to-[#3a3a10]',
      image: '/images/projects/dia-de-gachas.webp',
      url: 'https://www.diadegachas.com/',
    },
  ],
  en: [
    {
      slug: 'lazy-lands',
      name: 'Lazy Lands',
      description:
        'A campaign companion for Dungeon Masters that keeps long campaigns coherent between sessions. Next.js frontend, FastAPI backend, Supabase for data and auth, and an LLM provider abstraction so the AI stays swappable, with a fake in dev for deterministic tests. The core rule: the AI proposes memories, the DM decides. It never writes canon on its own.',
      process:
        "The AI never decides what's canon: it proposes session memories, and the Dungeon Master accepts, edits, or dismisses each one. Every entry is tagged by origin (untouched AI or DM-edited), so the campaign's memory stays reviewable, never automatic.",
      year: 2026,
      tags: ['Next.js', 'FastAPI', 'Supabase', 'LLM'],
      gradient: 'from-[#0c2a1a] to-[#14361f]',
      image: '/images/projects/lazy-lands.webp',
      url: 'https://lazy-lands.com',
    },
    {
      slug: 'hotel-sur',
      name: 'Hotel Sur',
      description:
        'Landing page for Hotel Sur, my band. Built from scratch, no template, no CMS. I wanted it to feel like the music: textured, intentional, kind of nostalgic. GSAP for the motion, Next.js for the structure.',
      process:
        'Art direction built from scratch for the band: brutalist and atmospheric, dark by default, with white reserved for deliberate narrative interruptions. I deliberately avoided the generic indie band template look.',
      year: 2025,
      tags: ['Next.js', 'Tailwind', 'GSAP'],
      gradient: 'from-[#0a0a20] to-[#0a1a30]',
      image: '/images/projects/hotel-sur.png',
      url: 'https://hotelsur.es',
    },
    {
      slug: 'holy-seitan',
      name: 'Holy Seitan',
      description:
        "A recipe app that keeps it simple. Recipes live as Markdown files, Supabase handles the backend and Drizzle ORM keeps the queries type-safe. The tradeoff: Markdown over a CMS trades flexibility for a format that's fast to write and easy to version. I use it weekly.",
      year: 2025,
      tags: ['Next.js', 'Supabase', 'Drizzle ORM', 'Shadcn/UI'],
      gradient: 'from-[#3a0a0a] to-[#1a1a0a]',
      image: '/images/projects/holy-seitan.webp',
      url: 'https://holy-seitan.danilopgon.com/',
    },
    {
      slug: 'dia-de-gachas',
      name: 'Día de Gachas',
      description:
        "A weather-aware app that tells you if it's gachas weather. Angular frontend, NestJS backend, live weather API. The goal was keeping it absurdly simple while doing real full-stack work, a useful test of how Angular and Nest integrate end-to-end easily.",
      year: 2025,
      tags: ['Angular', 'Nest', 'PrimeNG', 'GSAP'],
      gradient: 'from-[#1a3a20] to-[#3a3a10]',
      image: '/images/projects/dia-de-gachas.webp',
      url: 'https://www.diadegachas.com/',
    },
  ],
}

export function getProjects(locale: Locale): Project[] {
  return projectsData[locale]
}
