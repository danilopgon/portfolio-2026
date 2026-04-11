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
        'Landing page para la banda de art-rock Hotel Sur. Diseño y desarrollo de la página.',
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
        'Holy Seitan, nuestro recetario vegano en markdown: simple, bonito y totalmente funcional.',
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
        'Si hace frío, viento o llueve... la respuesta está clara: ¡Hoy es día de gachas!',
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
      description: 'Landing page for art-rock band Hotel Sur. Design and full development.',
      year: 2025,
      tags: ['Next.js', 'Tailwind', 'GSAP'],
      gradient: 'from-[#0a0a20] to-[#0a1a30]',
      image: '/images/projects/hotel-sur.png',
      url: 'https://hotelsur.es',
    },
    {
      slug: 'holy-seitan',
      name: 'Holy Seitan',
      description: 'Our vegan recipe book in markdown: simple, beautiful and fully functional.',
      year: 2025,
      tags: ['Next.js', 'Supabase', 'Drizzle ORM', 'Shadcn/UI'],
      gradient: 'from-[#3a0a0a] to-[#1a1a0a]',
      image: '/images/projects/holy-seitan.webp',
      url: 'https://holy-seitan.danilopgon.com/',
    },
    {
      slug: 'dia-de-gachas',
      name: 'Día de Gachas',
      description: "If it's cold, windy or rainy... the answer is clear: today is gachas day!",
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
