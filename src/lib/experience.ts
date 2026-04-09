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
    company: 'Servinet Sistemas',
    period: 'dic 2023 — presente',
    filename: 'servinet.log',
    description: [
      'Interfaces accesibles y mobile-first, Figma → producción',
      'Migración Angular v13 → v19+, reduciendo deuda técnica',
      'Backend .NET 8: endpoints REST en microservicios',
      'CI/CD en Azure DevOps con regresión cero',
    ],
    stack: ['Angular', 'TypeScript', '.NET 8', 'Azure DevOps', 'Jest'],
  },
  {
    slug: 'dewedd',
    role: 'Full Stack Developer',
    company: 'Dewedd',
    period: 'ago 2023 — dic 2023',
    filename: 'dewedd.log',
    description: [
      'App de planificación de bodas, de diseño a deploy',
      'Interfaces responsivas con React y Tailwind',
      'Backend con Python/Flask: usuarios, proveedores y eventos',
      'Despliegues en AWS (S3, CloudFront)',
    ],
    stack: ['React', 'Python/Flask', 'AWS', 'Tailwind'],
  },
]
