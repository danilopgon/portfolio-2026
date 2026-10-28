import type { Locale } from './i18n/translations'

export type Project = {
  slug: string
  name: string
  description: string
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
      tags: ['Next.js', 'Tailwind', 'GSAP'],
      gradient: 'from-[#0a0a20] to-[#0a1a30]',
      image: '/images/projects/hotel-sur.png',
      url: 'https://hotelsur.es',
    },
    {
      slug: 'holy-seitan',
      name: 'Holy Seitan',
      description:
        'Un recetario vegano para dos personas que cocinan juntas, pensado para leerlo desde la encimera: la pantalla puede quedarse encendida mientras sigues la receta. Empezó con cada receta como un único Markdown en Supabase; ahora los ingredientes son datos aparte, que se pueden reducir a la mitad, doblar o triplicar. Desde una conversación con Claude o ChatGPT se le puede pedir una receta nueva o un cambio en una existente: el agente lo propone, solo se guarda si lo apruebas y cada versión queda en el historial. La usamos cada semana.',
      tags: ['Next.js', 'Supabase', 'Drizzle ORM', 'MCP'],
      gradient: 'from-[#3a0a0a] to-[#1a1a0a]',
      image: '/images/projects/holy-seitan.webp',
      url: 'https://holy-seitan.danilopgon.com/',
    },
    {
      slug: 'dia-de-gachas',
      name: 'Día de Gachas',
      description:
        'Una app que te dice si hace tiempo de gachas. Empezó como una prueba de Angular y Nest de punta a punta que preguntaba a AEMET en cada visita. Ahora un cron descarga cada tres horas la previsión de más de 8.000 municipios, la valida y la publica como snapshot, y la API sirve desde ahí: si AEMET falla un día, la web sigue con la última previsión válida. Angular 22 sin librerías de componentes, NestJS en Railway, menos de un dólar al mes.',
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
      tags: ['Next.js', 'Tailwind', 'GSAP'],
      gradient: 'from-[#0a0a20] to-[#0a1a30]',
      image: '/images/projects/hotel-sur.png',
      url: 'https://hotelsur.es',
    },
    {
      slug: 'holy-seitan',
      name: 'Holy Seitan',
      description:
        'A vegan recipe book for two people who cook together, built to be read from the counter: the screen can stay on while you follow a recipe. It started with each recipe as a single Markdown document in Supabase; now the ingredients are separate data you can halve, double or triple. From a chat with Claude or ChatGPT you can ask for a new recipe or a change to an existing one: the agent proposes it, nothing is saved until you approve it, and every version stays in the history. We use it weekly.',
      tags: ['Next.js', 'Supabase', 'Drizzle ORM', 'MCP'],
      gradient: 'from-[#3a0a0a] to-[#1a1a0a]',
      image: '/images/projects/holy-seitan.webp',
      url: 'https://holy-seitan.danilopgon.com/',
    },
    {
      slug: 'dia-de-gachas',
      name: 'Día de Gachas',
      description:
        "A weather-aware app that tells you if it's gachas weather. It started as an end-to-end Angular and Nest test that called AEMET, Spain's weather service, on every visit. Now a cron job pulls the forecast for 8,000+ towns every three hours, validates it and publishes it as a snapshot, and the API serves from there: if AEMET goes down for a day, the site keeps the last good forecast. Angular 22 with no component library, NestJS on Railway, under a dollar a month.",
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
