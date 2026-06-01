export type Locale = 'es' | 'en'

export const translations = {
  es: {
    skipLink: 'Saltar al contenido',
    nav: {
      about: 'Sobre mí',
      skills: 'Cómo trabajo',
      projects: 'Trabajo',
      experience: 'Experiencia',
      contact: 'Contacto',
      available: 'Disponible',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      mainNav: 'Navegación principal',
      mobileMenu: 'Menú de navegación',
      lang: 'English',
      langLabel: 'Switch to English',
    },
    hero: {
      label: 'Desarrollador Full-Stack',
      taglineBefore: 'Construyo sistemas donde ',
      taglineHighlight: 'la arquitectura y la experiencia',
      taglineAfter:
        ' se diseñan juntas. Del contrato de API al detalle de interacción: todo con un proposito.',
      cta1: 'Ver trabajo',
      cta2: 'Hablemos',
    },
    about: {
      title: 'Sobre mí',
      p1Before: 'Estudié periodismo y trabajé en ',
      p1Highlight: 'medios digitales',
      p1After:
        '. El máster en documental transmedia fue donde aprendí a pensar en estructura, flujo y propósito. Eso, sin buscarlo demasiado, fue lo que me llevó más tarde a la programación.',
      p2Before:
        'Trabajo en el stack completo: React, Next.js y Angular en frontend, NestJS y FastAPI en backend. ',
      p2Highlight: 'El frontend es mi fuerte',
      p2After:
        ', pero los productos reales necesitan a alguien que pueda moverse entre capas sin perder el hilo. Me encargo de que lo que se diseña realmente se construya, y de que lo que se construye tenga sentido en todo momento.',
      p3Before: 'En ',
      p3Highlight: 'Servinet',
      p3After:
        ' trabajo en productos que abarcan arquitectura frontend, mantenimiento de librerías Angular, arquitecturas complejas en backend y pipelines de CI/CD. También uso la IA como herramienta práctica, no como atajo, sino como forma de resolver problemas más difíciles de manera eficiente.',
      stack: 'Stack técnico',
      directContact: 'Contacto directo',
      newTab: 'abre en nueva pestaña',
    },
    skills: {
      title: 'Cómo trabajo',
    },
    projects: {
      title: 'Trabajo seleccionado',
      ticker: 'PROYECTOS',
    },
    experience: {
      title: 'Experiencia',
      period: 'Periodo',
      highlights: 'highlights',
      technologies: 'tecnologías',
    },
    contact: {
      title: 'Contacto',
      heading: 'Hablemos.',
      description:
        'Proyectos, colaboraciones, ideas a medio terminar. Si tiene sentido, lo construimos.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: 'Cuéntame...',
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      successTitle: 'Mensaje enviado.',
      successDesc: 'Te escribo pronto.',
      errorTitle: 'Error al enviar.',
      errorDesc: 'Prueba por email directamente.',
      errorNetwork: 'Error de red.',
      location: 'Cuenca, España',
    },
    footer: {
      newTab: 'abre en nueva pestaña',
    },
    validation: {
      nameMin: 'El nombre debe tener al menos 2 caracteres',
      nameMax: 'El nombre es demasiado largo',
      emailInvalid: 'Introduce un email válido',
      emailMax: 'El email es demasiado largo',
      messageMin: 'El mensaje debe tener al menos 10 caracteres',
      messageMax: 'El mensaje no puede superar los 2000 caracteres',
    },
  },
  en: {
    skipLink: 'Skip to content',
    nav: {
      about: 'About',
      skills: 'How I work',
      projects: 'Work',
      experience: 'Experience',
      contact: 'Contact',
      available: 'Available',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      mainNav: 'Main navigation',
      mobileMenu: 'Navigation menu',
      lang: 'Español',
      langLabel: 'Cambiar a Español',
    },
    hero: {
      label: 'Full-Stack Developer',
      taglineBefore: 'I build systems where ',
      taglineHighlight: 'architecture and experience',
      taglineAfter: ' are designed together. From the API contract to the interaction detail, code with purpose.',
      cta1: 'See work',
      cta2: "Let's talk",
    },
    about: {
      title: 'About me',
      p1Before: 'I studied journalism and worked in ',
      p1Highlight: 'digital media',
      p1After:
        ". My master's in transmedia storytelling is where I learned to think about structure, flow, and purpose. That, without looking too hard for it, is what later led me to programming.",
      p2Before:
        'I work across the full stack: React, Next.js and Angular on the frontend, NestJS and FastAPI on the backend. ',
      p2Highlight: "Frontend is where I'm sharpest",
      p2After:
        ', but real products need someone who can move between layers without losing context. I make sure what gets designed actually gets built, and what gets built actually makes sense to use.',
      p3Before: 'At ',
      p3Highlight: 'Servinet',
      p3After:
        ' I work on products that span frontend architecture, Angular library maintenance, complex backend architectures and CI/CD pipelines. I also use AI as a practical tool, not as a shortcut, but as a way to solve harder problems with less overhead.',
      stack: 'Tech stack',
      directContact: 'Direct contact',
      newTab: 'opens in new tab',
    },
    skills: {
      title: 'How I work',
    },
    projects: {
      title: 'Selected work',
      ticker: 'PROJECTS',
    },
    experience: {
      title: 'Experience',
      period: 'Period',
      highlights: 'highlights',
      technologies: 'technologies',
    },
    contact: {
      title: 'Contact',
      heading: "Let's talk.",
      description: 'Projects, collaborations, half-finished ideas. If it makes sense, we build it.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@email.com',
      messagePlaceholder: 'Tell me...',
      submit: 'Send message',
      submitting: 'Sending...',
      successTitle: 'Message sent.',
      successDesc: "I'll write back soon.",
      errorTitle: 'Error sending.',
      errorDesc: 'Try by email directly.',
      errorNetwork: 'Network error.',
      location: 'Cuenca, Spain',
    },
    footer: {
      newTab: 'opens in new tab',
    },
    validation: {
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name is too long',
      emailInvalid: 'Enter a valid email',
      emailMax: 'Email is too long',
      messageMin: 'Message must be at least 10 characters',
      messageMax: 'Message cannot exceed 2000 characters',
    },
  },
} as const

export type Translations = typeof translations
