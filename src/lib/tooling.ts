import type { Locale } from './i18n/translations'

export type Tool = {
  slug: string
  name: string
  kind: string
  summary: string
  detail: string
  stack: string[]
}

export type ToolingArea = {
  slug: string
  name: string
  description: string
}

// Keep the flagship concrete and the supporting areas capability-based.
const featuredData: Record<Locale, Tool> = {
  es: {
    slug: 'apereview',
    name: 'ApeReview',
    kind: 'Servidor MCP',
    summary:
      'Convierte el conocimiento disperso de un proyecto (convenciones, criterios técnicos y aprendizajes de revisiones anteriores) en una base que los agentes pueden consultar antes de responder.',
    detail:
      'Backend en Python/FastAPI con SQLite + FTS5 para búsqueda full-text, expuesto como servidor MCP y preparado para ingesta dinámica. Así, convenciones, criterios y aprendizajes quedan disponibles como contexto recuperable para nuevas revisiones.',
    stack: ['Python', 'FastAPI', 'MCP', 'SQLite + FTS5', 'Retrieval'],
  },
  en: {
    slug: 'apereview',
    name: 'ApeReview',
    kind: 'MCP server',
    summary:
      "Turns a project's scattered knowledge (conventions, technical criteria and lessons from earlier reviews) into a base agents can query before they answer.",
    detail:
      'Python/FastAPI backend with SQLite + FTS5 for full-text search, exposed as an MCP server and built for dynamic ingestion. This keeps conventions, criteria and lessons available as retrievable context for future reviews.',
    stack: ['Python', 'FastAPI', 'MCP', 'SQLite + FTS5', 'Retrieval'],
  },
}

const areasData: Record<Locale, ToolingArea[]> = {
  es: [
    {
      slug: 'delivery',
      name: 'Requisitos y diseño',
      description:
        'Diseño flujos que conectan la intención de producto con la implementación, desde contrastar requisitos y criterios de aceptación con el código hasta auditar interfaces frente al diseño.',
    },
    {
      slug: 'quality',
      name: 'Calidad de software',
      description:
        'Construyo herramientas para verificar cambios con criterios reproducibles y evidencias contrastables, combinando, por ejemplo, análisis estático, revisión contextual y comprobaciones de interfaz y APIs.',
    },
    {
      slug: 'operations',
      name: 'Fiabilidad y operaciones',
      description:
        'Aplico IA al diagnóstico de incidencias en producción y a la mejora de la fiabilidad de sistemas, convirtiendo hallazgos en mitigaciones accionables y validando las mejoras mediante pruebas y evidencias técnicas.',
    },
  ],
  en: [
    {
      slug: 'delivery',
      name: 'Requirements & design',
      description:
        'I design workflows that connect product intent with implementation, from checking requirements and acceptance criteria against code to auditing interfaces against their designs.',
    },
    {
      slug: 'quality',
      name: 'Software quality',
      description:
        'I build tools to verify changes against repeatable criteria and verifiable evidence, combining approaches such as static analysis, context-aware reviews and UI and API checks.',
    },
    {
      slug: 'operations',
      name: 'Reliability & operations',
      description:
        'I apply AI to production incident diagnosis and system reliability, turning findings into actionable mitigations and validating improvements through tests and technical evidence.',
    },
  ],
}

export function getFeaturedTool(locale: Locale): Tool {
  return featuredData[locale]
}

export function getToolingAreas(locale: Locale): ToolingArea[] {
  return areasData[locale]
}
