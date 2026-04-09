export type Experience = {
  slug: string
  role: string
  company: string
  period: string
  filename: string
  description: string[]
  stack: string[]
}

export const experiences: Experience[] = [
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
    stack: ['Angular', 'TypeScript', '.NET', 'Azure DevOps', 'Jest'],
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
]
