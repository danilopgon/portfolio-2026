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
      name: 'Delivery',
      description: 'Conecto requisitos, criterios de aceptación, diseño y código para detectar discrepancias y orientar la implementación.',
    },
    {
      slug: 'quality',
      name: 'Quality',
      description: 'Combino revisión contextual, análisis estático y comprobaciones de interfaz y APIs para verificar cambios y documentar evidencias.',
    },
    {
      slug: 'operations',
      name: 'Operations',
      description: 'Investigo incidencias y consumo de recursos, documento opciones de mitigación y automatizo operaciones con confirmación humana cuando procede.',
    },
  ],
  en: [
    {
      slug: 'delivery',
      name: 'Delivery',
      description: 'I connect requirements, acceptance criteria, design and code to identify discrepancies and guide implementation.',
    },
    {
      slug: 'quality',
      name: 'Quality',
      description: 'I combine context-aware review, static analysis and UI and API checks to verify changes and document evidence.',
    },
    {
      slug: 'operations',
      name: 'Operations',
      description: 'I investigate incidents and resource usage, document mitigation options and automate operations with human confirmation where appropriate.',
    },
  ],
}

export function getFeaturedTool(locale: Locale): Tool {
  return featuredData[locale]
}

export function getToolingAreas(locale: Locale): ToolingArea[] {
  return areasData[locale]
}
