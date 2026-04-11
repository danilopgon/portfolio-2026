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
      role: 'Frontend Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'dic 2023 — presente',
      filename: 'servinet.log',
      description: [
        'Diseño y desarrollo de interfaces accesibles (WCAG) y mobile-first, reduciendo fricción en UX',
        'Lideré migraciones Angular v13 → v19+, eliminando deuda técnica y mejorando rendimiento',
        'Implementación y mantenimiento de pipelines CI/CD en Azure DevOps con entregas estables y sin regresiones',
        'Optimización de arquitectura frontend y mantenimiento de librerías internas en Angular',
      ],
      stack: ['Angular', 'React', 'TypeScript', '.NET', 'Azure DevOps', 'Jest'],
    },
    {
      slug: 'dewedd',
      role: 'Full Stack Developer',
      company: 'Dewedd',
      period: 'ago 2023 — dic 2023',
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
      role: 'Frontend Developer',
      company: 'Servinet Sistemas y Comunicación',
      period: 'Dec 2023 — present',
      filename: 'servinet.log',
      description: [
        'Design and development of accessible (WCAG) and mobile-first interfaces, reducing UX friction',
        'Led Angular v13 → v19+ migrations, eliminating technical debt and improving performance',
        'Implementation and maintenance of CI/CD pipelines in Azure DevOps with stable, regression-free deliveries',
        'Frontend architecture optimization and maintenance of internal Angular libraries',
      ],
      stack: ['Angular', 'React', 'TypeScript', '.NET', 'Azure DevOps', 'Jest'],
    },
    {
      slug: 'dewedd',
      role: 'Full Stack Developer',
      company: 'Dewedd',
      period: 'Aug 2023 — Dec 2023',
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
