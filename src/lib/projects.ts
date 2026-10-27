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
      slug: 'lazy-lands',
      name: 'Lazy Lands',
      description:
        'Un asistente de campaña para DMs que mantiene la coherencia entre sesiones en campañas largas. Frontend en Next.js, backend en FastAPI, Supabase para datos y autenticación, y una abstracción de proveedor LLM para que la IA sea intercambiable. La regla de fondo: la IA propone recuerdos, el director decide. Nunca fija el canon por su cuenta.',
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
        'Una app que te dice si hace tiempo de gachas. Frontend en Angular 22 sin librerías de componentes, backend en NestJS sobre Railway. La API no llama a AEMET en cada visita: un cron descarga cada tres horas la previsión de los más de 8.000 municipios, la valida y la publica como snapshot en un bucket, y la API sirve desde ahí. Empezó como prueba de Angular y Nest de punta a punta y acabó siendo un ejercicio de hacer robusto y barato algo pequeño.',
      year: 2025,
      tags: ['Angular', 'NestJS', 'Railway', 'GSAP'],
      gradient: 'from-[#1a3a20] to-[#3a3a10]',
      image: '/images/projects/dia-de-gachas.webp',
      url: 'https://www.diadegachas.danilopgon.com/',
    },
  ],
  en: [
    {
      slug: 'lazy-lands',
      name: 'Lazy Lands',
      description:
        'A campaign companion for Dungeon Masters that keeps long campaigns coherent between sessions. Next.js frontend, FastAPI backend, Supabase for data and auth, and an LLM provider abstraction so the AI stays swappable. The core rule: the AI proposes memories, the DM decides. It never writes canon on its own.',
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
        "A weather-aware app that tells you if it's gachas weather. Angular 22 frontend with no component library, NestJS backend on Railway. The API never calls AEMET per visit: a cron job pulls the forecast for all 8,000+ Spanish towns every three hours, validates it and publishes it as a snapshot to a bucket, and the API serves from there. It started as an end-to-end Angular and Nest test and became an exercise in making something small sturdy and cheap.",
      year: 2025,
      tags: ['Angular', 'NestJS', 'Railway', 'GSAP'],
      gradient: 'from-[#1a3a20] to-[#3a3a10]',
      image: '/images/projects/dia-de-gachas.webp',
      url: 'https://www.diadegachas.danilopgon.com/',
    },
  ],
}

export function getProjects(locale: Locale): Project[] {
  return projectsData[locale]
}
