import type { Locale } from './i18n/translations'

export type Skill = {
  n: string
  name: string
  desc: string
}

const devData: Record<Locale, Skill[]> = {
  es: [
    {
      n: '01',
      name: 'Front-end',
      desc: 'La interfaz es el producto. Construyo componentes que escalan, se comportan bien bajo presión y transmiten intención en cada detalle.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'De la base de datos al deploy con criterio. APIs sólidas, infraestructura que no da sorpresas y datos modelados con la vista puesta en el producto.',
    },
  ],
  en: [
    {
      n: '01',
      name: 'Front-end',
      desc: 'The interface is the product. I build components that scale, hold up under pressure and convey intention in every detail.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'From database to deploy with purpose. Solid APIs, infrastructure that never surprises and data modelled with the product in mind.',
    },
  ],
}

const foundationsData: Record<Locale, Skill[]> = {
  es: [
    {
      n: '03',
      name: 'UX / UI',
      desc: 'El diseño no termina en Figma. Entiendo qué hace que una experiencia funcione y me encargo de que eso sobreviva a la implementación.',
    },
    {
      n: '04',
      name: 'Narrativa digital',
      desc: 'Antes de programar, producía contenido. Esa mirada periodística es lo que convierte un producto funcional en uno que la gente recuerda.',
    },
    {
      n: '05',
      name: 'IA aplicada',
      desc: 'Spec Driven Development, RAG y pipelines de IA como parte del flujo de desarrollo. Diseño de sistemas donde la inteligencia artificial amplifica la ingeniería, no la sustituye.',
    },
  ],
  en: [
    {
      n: '03',
      name: 'UX / UI',
      desc: "Design doesn't end in Figma. I understand what makes an experience work and make sure that survives implementation.",
    },
    {
      n: '04',
      name: 'Digital narrative',
      desc: 'Before programming, I produced content. That journalistic eye is what turns a functional product into one people remember.',
    },
    {
      n: '05',
      name: 'Applied AI',
      desc: 'I focus on Spec-Driven Development and AI pipelines, designing systems where artificial intelligence amplifies engineering instead of replacing it.',
    },
  ],
}

export function getDev(locale: Locale): Skill[] {
  return devData[locale]
}

export function getFoundations(locale: Locale): Skill[] {
  return foundationsData[locale]
}
