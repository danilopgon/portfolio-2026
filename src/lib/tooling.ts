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
        'Contrasto escenarios Gherkin y tareas de desarrollo con el código, y comparo interfaces implementadas con diseños de Figma para detectar desviaciones y orientar correcciones.',
    },
    {
      slug: 'quality',
      name: 'Calidad de software',
      description:
        'Integro los hallazgos de análisis estático en la revisión de código y orquesto la recopilación de evidencias de interfaz y APIs con Playwright y Swagger.',
    },
    {
      slug: 'operations',
      name: 'Fiabilidad y operaciones',
      description:
        'He investigado reinicios de réplicas por consumo de memoria en Azure y documentado opciones de mitigación. También automatizo la publicación de imágenes Docker con confirmación humana.',
    },
  ],
  en: [
    {
      slug: 'delivery',
      name: 'Requirements & design',
      description:
        'I check Gherkin scenarios and development tasks against code, and compare implemented interfaces with Figma designs to spot discrepancies and guide corrections.',
    },
    {
      slug: 'quality',
      name: 'Software quality',
      description:
        'I bring static analysis findings into code reviews and orchestrate UI and API evidence collection using Playwright and Swagger.',
    },
    {
      slug: 'operations',
      name: 'Reliability & operations',
      description:
        'I have investigated replica restarts caused by memory usage in Azure and documented mitigation options. I also automate Docker image publishing with human confirmation.',
    },
  ],
}

export function getFeaturedTool(locale: Locale): Tool {
  return featuredData[locale]
}

export function getToolingAreas(locale: Locale): ToolingArea[] {
  return areasData[locale]
}
