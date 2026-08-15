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
      slug: 'servinet',
      role: 'Full Stack Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'dic 2023 — presente',
      filename: 'servinet.log',
      description: [
        'Desarrollo de aplicaciones web escalables con Angular, React y TypeScript, de Figma a producción, con foco en rendimiento, accesibilidad WCAG, mantenibilidad y experiencia de usuario',
        'Liderazgo y participación en iniciativas de modernización frontend, incluyendo migraciones WPF → Angular, actualizaciones v13 → v19+, refactor de módulos legacy y mejoras de testing y deuda técnica',
        'Arranque y coordinación de nuevos proyectos Angular, alineando arquitectura, librerías compartidas, estrategia de testing, convenciones de desarrollo y prácticas de CI/CD entre equipos',
        'Desarrollo full-stack con .NET 8+ (C#) y Python/FastAPI, creando APIs REST, lógica de negocio, integraciones y tooling interno',
        'Referente interno en IA aplicada y developer tooling, ayudando a otros desarrolladores a evaluar e implementar MCPs, flujos agénticos, RAG y prácticas de desarrollo asistido',
      ],
      current: true,
      stack: [
        'Angular',
        'React',
        'TypeScript',
        '.NET',
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
        'Development of scalable web applications with Angular, React and TypeScript, from Figma to production, with a focus on performance, WCAG accessibility, maintainability and user experience',
        'Led and contributed to frontend modernization initiatives, including WPF → Angular migrations, v13 → v19+ upgrades, legacy module refactoring, and improvements to testing and technical debt',
        'Set up and coordinated new Angular projects, aligning architecture, shared libraries, testing strategy, development conventions and CI/CD practices across teams',
        'Full-stack development with .NET 8+ (C#) and Python/FastAPI, building REST APIs, business logic, integrations and internal tooling',
        'Internal reference point for applied AI and developer tooling, helping other developers evaluate and implement MCPs, agentic workflows, RAG and AI-assisted development practices',
      ],
      current: true,
      stack: [
        'Angular',
        'React',
        'TypeScript',
        '.NET',
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
      ],
      stack: ['React', 'Python/Flask', 'AWS', 'Tailwind'],
    },
  ],
}

export function getExperiences(locale: Locale): Experience[] {
  return experiencesData[locale]
}
