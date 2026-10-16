import type { Locale } from './i18n/translations'

export type Experience = {
  slug: string
  role: string
  company: string
  period: string
  filename: string
  description: string[]
  stack: string[]
  /** Marks the role still in progress, so the timeline can point at "now". */
  current?: boolean
}

const experiencesData: Record<Locale, Experience[]> = {
  es: [
    {
      slug: 'tecnologia-y-personas',
      role: 'Full-Stack Product Engineer',
      company: 'Tecnología y Personas',
      period: 'octubre 2026 — presente',
      filename: 'tecnologia-y-personas.log',
      description: ['Nueva etapa de desarrollo de producto full-stack con Angular y .NET/C#'],
      stack: ['Angular', '.NET / C#'],
      current: true,
    },
    {
      slug: 'servinet',
      role: 'Full Stack Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'diciembre 2023 — octubre 2026',
      filename: 'servinet.log',
      description: [
        'Desarrollé y modernicé aplicaciones empresariales con Angular, React y TypeScript, mi especialidad principal. También contribuí a servicios, APIs REST, lógica de negocio e integraciones con .NET/C# y Python/FastAPI',
        'Coordiné la arquitectura y el arranque de nuevos proyectos Angular, definiendo convenciones, librerías reutilizables, estrategia de testing y estándares de calidad. Fui referencia para decisiones técnicas entre equipos',
        'Contribuí a migraciones WPF → Angular y Angular v13 → v19+, refactorizando código legacy, mejorando la mantenibilidad y la accesibilidad, y reduciendo deuda técnica',
        'Evalué la madurez de testing, reequilibré cobertura E2E e integración y evité regresiones en migraciones críticas con checks deterministas y revisión contextual asistida por IA',
        'Diseñé workflows reutilizables con MCPs, Figma, Chrome DevTools, análisis estático, RAG y control humano. También construí ApeReview, un servidor MCP en Python/FastAPI con SQLite + FTS5 para recuperar conocimiento de ingeniería',
      ],
      stack: [
        'Angular',
        'React',
        'TypeScript',
        '.NET / C#',
        'Python',
        'FastAPI',
        'Azure DevOps',
        'Jenkins',
      ],
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
        'Despliegue y gestión de la infraestructura en AWS: backend Flask en EC2, PostgreSQL en RDS y estáticos en S3 distribuidos con CloudFront',
      ],
      stack: ['React', 'Python/Flask', 'AWS', 'Tailwind'],
    },
  ],
  en: [
    {
      slug: 'tecnologia-y-personas',
      role: 'Full-Stack Product Engineer',
      company: 'Tecnología y Personas',
      period: 'October 2026 — present',
      filename: 'tecnologia-y-personas.log',
      description: ['A new full-stack product engineering role working with Angular and .NET/C#'],
      stack: ['Angular', '.NET / C#'],
      current: true,
    },
    {
      slug: 'servinet',
      role: 'Full Stack Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'December 2023 — October 2026',
      filename: 'servinet.log',
      description: [
        'Developed and modernized enterprise applications with Angular, React and TypeScript, my primary specialty. I also contributed to services, REST APIs, business logic and integrations with .NET/C# and Python/FastAPI',
        'Coordinated the architecture and setup of new Angular projects, defining conventions, reusable libraries, testing strategy and quality standards. I served as a technical decision-making reference across teams',
        'Contributed to WPF → Angular migrations and Angular v13 → v19+ upgrades, refactoring legacy code, improving maintainability and accessibility, and reducing technical debt',
        'Assessed testing maturity, rebalanced E2E and integration coverage, and prevented regressions in critical migrations through deterministic checks and contextual AI-assisted review',
        'Designed reusable workflows with MCPs, Figma, Chrome DevTools, static analysis, RAG and human oversight. I also built ApeReview, a Python/FastAPI MCP server with SQLite + FTS5 that makes engineering knowledge retrievable',
      ],
      stack: [
        'Angular',
        'React',
        'TypeScript',
        '.NET / C#',
        'Python',
        'FastAPI',
        'Azure DevOps',
        'Jenkins',
      ],
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
        'Deployment and management of the AWS infrastructure: Flask backend on EC2, PostgreSQL on RDS and static assets on S3 distributed via CloudFront',
      ],
      stack: ['React', 'Python/Flask', 'AWS', 'Tailwind'],
    },
  ],
}

export function getExperiences(locale: Locale): Experience[] {
  return experiencesData[locale]
}
