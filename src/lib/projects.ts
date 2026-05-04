import type { Locale } from './i18n/translations'

export type Project = {
  slug: string
  name: string
  description: string
  year: number
  tags: string[]
  gradient: string
  image?: string
  url?: string
}

const projectsData: Record<Locale, Project[]> = {
  es: [
    {
      slug: 'hotel-sur',
      name: 'Hotel Sur',
      description:
        'Landing page para Hotel Sur, mi banda. Construida desde cero, sin plantilla, sin CMS. Quería que sintiera como suena la banda: con textura, con intención, algo extraño. GSAP para el movimiento, Next.js para la estructura.',
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
        'Una app de recetas que no compite por tu atención. Las recetas viven como archivos Markdown, Supabase maneja el backend y Drizzle ORM mantiene las consultas con tipos seguros. El tradeoff: Markdown frente a un CMS cambia flexibilidad por un formato rápido de escribir y fácil de versionar. La uso cada semana.',
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
        'Una app que detecta si hace tiempo de gachas. Frontend en Angular, backend en NestJS, API del tiempo en tiempo real. El objetivo era mantenerlo absurdamente simple mientras hacía trabajo full-stack real, una prueba útil de cómo Angular y Nest se integran de principio a fin sin alcance de juguete.',
      year: 2025,
      tags: ['Angular', 'Nest', 'PrimeNG', 'GSAP'],
      gradient: 'from-[#1a3a20] to-[#3a3a10]',
      image: '/images/projects/dia-de-gachas.png',
      url: 'https://www.diadegachas.com/',
    },
  ],
  en: [
    {
      slug: 'hotel-sur',
      name: 'Hotel Sur',
      description:
        'Landing page for Hotel Sur, my band. Built from scratch, no template, no CMS. I wanted it to feel like the music: textured, intentional, a bit strange. GSAP for the motion, Next.js for the structure.',
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
        "A recipe app that doesn't fight you for attention. Recipes live as Markdown files, Supabase handles the backend and Drizzle ORM keeps the queries type-safe. The tradeoff: Markdown over a CMS trades flexibility for a format that's fast to write and easy to version. I use it weekly.",
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
        "A weather-aware app that tells you if it's gachas weather. Angular frontend, NestJS backend, live weather API. The goal was keeping it absurdly simple while doing real full-stack work, a useful test of how Angular and Nest integrate end-to-end without a toy scope.",
      year: 2025,
      tags: ['Angular', 'Nest', 'PrimeNG', 'GSAP'],
      gradient: 'from-[#1a3a20] to-[#3a3a10]',
      image: '/images/projects/dia-de-gachas.png',
      url: 'https://www.diadegachas.com/',
    },
  ],
}

export function getProjects(locale: Locale): Project[] {
  return projectsData[locale]
}
