import type { Locale } from './i18n/translations'

export type Experience = {
  slug: string
  role: string
  company: string
  period: string
  filename: string
  description: string[]
  stack: string[]
}

const experiencesData: Record<Locale, Experience[]> = {
  es: [
    {
      slug: 'servinet',
      role: 'Full Stack Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'dic 2023 — presente',
      filename: 'servinet.log',
      description: [
        'Desarrollo y mantenimiento de aplicaciones escalables con Angular, React y TypeScript, cuidando rendimiento, accesibilidad y UX',
        'Lideré migraciones full-stack WPF → Angular y actualizaciones v13 → v19+, reduciendo deuda técnica y mejorando cobertura de pruebas',
        'Desarrollo backend con .NET 8+ (C#) y Python/FastAPI: endpoints REST, lógica de negocio y tooling interno integrado con frontend y microservicios',
        'Creé ApeReview, un servidor MCP con Python/FastAPI y SQLite + FTS5 que convierte criterios, convenciones y aprendizajes de PRs en contexto útil para agentes de IA',
        'Automatización de pipelines en Azure DevOps y Jenkins, revisiones de PR, onboarding y adopción de IA generativa con buenas prácticas de equipo',
      ],
      stack: ['Angular', 'React', 'TypeScript', '.NET', 'Python', 'FastAPI', 'Azure DevOps', 'Jenkins'],
    },
    {
      slug: 'dewedd',
      role: 'Full Stack Developer',
      company: 'Dewedd',
      period: 'junio 2023 — dic 2023',
      filename: 'dewedd.log',
      description: [
        'Desarrollo end-to-end de una aplicación de planificación de bodas, desde concepto hasta producción',
        'Construcción de interfaces responsivas con React y Tailwind enfocadas en conversión',
        'Diseño e implementación de backend con Flask (usuarios, proveedores, eventos y lógica de negocio)',
        'Definición de modelo de datos y arquitectura inicial del sistema',
      ],
      stack: ['React', 'Python/Flask', 'AWS', 'Tailwind'],
    },
  ],
  en: [
    {
      slug: 'servinet',
      role: 'Full Stack Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'Dec 2023 — present',
      filename: 'servinet.log',
      description: [
        'Development and maintenance of scalable applications with Angular, React and TypeScript, with focus on performance, accessibility and UX',
        'Led full-stack WPF → Angular migrations and v13 → v19+ upgrades, reducing technical debt and improving test coverage',
        'Backend development with .NET 8+ (C#) and Python/FastAPI: REST endpoints, business logic and internal tooling integrated with frontend and microservices',
        'Created ApeReview, an MCP server with Python/FastAPI and SQLite + FTS5 that turns review criteria, conventions and PR learnings into useful context for AI agents',
        'Automated pipelines in Azure DevOps and Jenkins, active PR reviews, onboarding and generative AI adoption through team best practices',
      ],
      stack: ['Angular', 'React', 'TypeScript', '.NET', 'Python', 'FastAPI', 'Azure DevOps', 'Jenkins'],
    },
    {
      slug: 'dewedd',
      role: 'Full Stack Developer',
      company: 'Dewedd',
      period: 'June 2023 — Dec 2023',
      filename: 'dewedd.log',
      description: [
        'End-to-end development of a wedding planning app, from concept to production',
        'Building responsive interfaces with React and Tailwind focused on conversion',
        'Design and implementation of backend with Flask (users, vendors, events and business logic)',
        'Data model definition and initial system architecture',
      ],
      stack: ['React', 'Python/Flask', 'AWS', 'Tailwind'],
    },
  ],
}

export function getExperiences(locale: Locale): Experience[] {
  return experiencesData[locale]
}
