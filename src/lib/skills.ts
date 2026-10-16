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
      desc: 'Construyo frontends con Angular, React/Next.js y TypeScript que escalan, se mantienen accesibles y respetan la intención del diseño hasta producción.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'Diseño APIs y arquitectura de aplicación alrededor de límites de servicio claros, lógica de negocio mantenible, modelos de datos e integraciones. Decido con criterios de producto qué separar, qué simplificar y cómo llevarlo a producción.',
    },
  ],
  en: [
    {
      n: '01',
      name: 'Front-end',
      desc: 'I build frontends with Angular, React/Next.js and TypeScript that scale, stay accessible and carry design intent into production.',
    },
    {
      n: '02',
      name: 'Back-end',
      desc: 'I design APIs and application architecture around clear service boundaries, maintainable business logic, data models and integrations. Product needs guide what to separate, what to simplify and how to take it to production.',
    },
  ],
}

const foundationsData: Record<Locale, Skill[]> = {
  es: [
    {
      n: '03',
      name: 'UX / UI',
      desc: 'Traduzco las decisiones de diseño a código sin perder jerarquía, interacción ni accesibilidad durante la implementación.',
    },
    {
      n: '04',
      name: 'Pensamiento de producto',
      desc: 'Antes de programar, era periodista. Esa etapa marca cómo trabajo: identifico quién usa el producto, qué intenta hacer y dónde encuentra fricción antes de decidir qué construir.',
    },
    {
      n: '05',
      name: 'IA aplicada',
      desc: 'Uso IA para revisión con contexto, automatización de criterios repetibles y flujos human-in-the-loop. Los checks deterministas y la revisión humana conservan el control sobre las decisiones técnicas.',
    },
  ],
  en: [
    {
      n: '03',
      name: 'UX / UI',
      desc: 'I translate design decisions into code without losing hierarchy, interaction or accessibility during implementation.',
    },
    {
      n: '04',
      name: 'Product thinking',
      desc: "Before programming, I was a journalist. That background shapes how I work: I identify who uses the product, what they're trying to do and where they encounter friction before deciding what to build.",
    },
    {
      n: '05',
      name: 'Applied AI',
      desc: 'I use AI for context-aware review, repeatable criteria and human-in-the-loop workflows. Deterministic checks and human review keep technical decisions under control.',
    },
  ],
}

export function getDev(locale: Locale): Skill[] {
  return devData[locale]
}

export function getFoundations(locale: Locale): Skill[] {
  return foundationsData[locale]
}
