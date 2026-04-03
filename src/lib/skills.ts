export type Skill = {
  n: string
  name: string
  desc: string
}

export const dev: Skill[] = [
  {
    n: '01',
    name: 'Front-end',
    desc: 'La interfaz es el producto. Construyo componentes que escalan, se comportan bien bajo presión y transmiten intención en cada detalle.',
  },
  {
    n: '02',
    name: 'Back-end',
    desc: 'Suficiente para ir de la base de datos al deploy sin bloquearme. APIs sólidas, infraestructura que no da sorpresas y datos modelados con la vista puesta en el frontend.',
  },
]

export const foundations: Skill[] = [
  {
    n: '03',
    name: 'UX / UI',
    desc: 'El diseño no termina en Figma. Entiendo qué hace que una experiencia funcione — y me encargo de que eso sobreviva a la implementación.',
  },
  {
    n: '04',
    name: 'Narrativa digital',
    desc: 'Antes de programar, producía contenido. Esa mirada periodística es lo que convierte un producto funcional en uno que la gente recuerda.',
  },
  {
    n: '05',
    name: 'IA aplicada',
    desc: 'Spec Driven Development, RAG y pipelines de IA como parte del flujo de desarrollo. Diseño de sistemas donde la inteligencia artificial amplifica la ingeniería, no la sustituye.',
  },
]
