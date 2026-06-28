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
      desc: 'La interfaz es el producto. Construyo frontends con Angular, React/Next.js y TypeScript que escalan, se mantienen accesibles y respetan la intención del diseño hasta producción.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'Del modelo de datos al deploy. Diseño APIs, contratos entre capas e infraestructura con Node.js y Python/FastAPI. Las decisiones de backend se toman pensando en el producto, no a posteriori.',
    },
  ],
  en: [
    {
      n: '01',
      name: 'Front-end',
      desc: 'The interface is the product. I build frontends with Angular, React/Next.js and TypeScript that scale, stay accessible and carry design intent into production.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'From data model to deploy. I design APIs, layer contracts and infrastructure with Node.js and Python/FastAPI. Backend decisions made with the product in mind, not as an afterthought.',
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
      desc: 'Uso la IA donde se gana su sitio: revisión con contexto, automatización de criterio repetible y flujos human-in-the-loop. IA que mejora la ingeniería y reduce trabajo repetitivo, no que reemplaza criterio técnico.',
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
      desc: 'I use AI where it earns its place: context-aware review, repeatable judgment automation and human-in-the-loop flows. AI that improves engineering and reduces repetitive overhead, not technical judgment.',
    },
  ],
}

export function getDev(locale: Locale): Skill[] {
  return devData[locale]
}

export function getFoundations(locale: Locale): Skill[] {
  return foundationsData[locale]
}
