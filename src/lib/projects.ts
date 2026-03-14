export type Project = {
  slug: string
  name: string
  type: string
  year: number
  tags: string[]
  gradient: string
  url?: string
}

export const projects: Project[] = [
  {
    slug: 'dia-de-gachas',
    name: 'Día de Gachas',
    type: 'App interactiva',
    year: 2024,
    tags: ['Angular', 'Next.js', 'Supabase'],
    gradient: 'from-[#1a3a20] to-[#3a3a10]',
  },
  {
    slug: 'hotel-sur',
    name: 'Hotel Sur',
    type: 'Identidad web',
    year: 2024,
    tags: ['Next.js', 'GSAP', 'Lenis'],
    gradient: 'from-[#0a0a20] to-[#0a1a30]',
    url: 'https://hotelsur.band',
  },
  {
    slug: 'holy-seitan',
    name: 'Holy Seitan',
    type: 'E-commerce',
    year: 2024,
    tags: ['React', '.NET', 'AWS'],
    gradient: 'from-[#3a0a0a] to-[#1a1a0a]',
  },
]
