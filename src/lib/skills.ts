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
      desc: 'La interfaz es el producto. Construyo componentes que escalan, se mantienen accesibles y transmiten intención en cada detalle. Desde la fase de diseño hasta los casos límite.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'Del modelo de datos al deploy. APIs sólidas, contratos tipados entre capas e infraestructura solida. Las decisiones de backend se toman pensando en el producto, no a posteriori.',
    },
  ],
  en: [
    {
      n: '01',
      name: 'Front-end',
      desc: 'The interface is the product. I build components that scale, stay accessible and convey intention in every detail. From the design stage through the edge cases.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'From data model to deploy. Solid APIs, typed contracts between layers and infrastructure you can reason about. Backend decisions made with the product in mind, not as an afterthought.',
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
      name: 'Pensamiento de producto',
      desc: 'Antes de programar, era periodista. Eso marca cómo me acerco a los productos: quién los usa, qué intenta hacer y qué se lo impide. Que algo funcione no basta si nadie lo entiende.',
    },
    {
      n: '05',
      name: 'IA aplicada',
      desc: 'Uso la IA donde se gana su sitio: generación de specs, revisión de código con contexto y pipelines que reducen el trabajo repetitivo. Spec-Driven Development como práctica, no como palabra de moda. IA que mejora la ingeniería, no que la reemplaza.',
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
      name: 'Product thinking',
      desc: "Before programming, I was a journalist. That background shapes how I approach products: who uses it, what they're trying to do, and what gets in the way. Functional isn't enough if nobody understands it.",
    },
    {
      n: '05',
      name: 'Applied AI',
      desc: 'I use AI where it earns its place: spec generation, context-aware code review and pipelines that reduce repetitive overhead. Spec-Driven Development as a practice, not a buzzword. AI that makes the engineering better, not optional.',
    },
  ],
}

export function getDev(locale: Locale): Skill[] {
  return devData[locale]
}

export function getFoundations(locale: Locale): Skill[] {
  return foundationsData[locale]
}
