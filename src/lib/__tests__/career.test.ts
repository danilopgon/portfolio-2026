import { describe, expect, it } from 'vitest'
import { getExperiencesByLocale, getPublicCareerMarkdown } from '@/lib/career'

describe('career source of truth', () => {
  it('drives both homepage locales from the featured Markdown entries', () => {
    const { es, en } = getExperiencesByLocale()

    expect(es.map(({ slug }) => slug)).toEqual(['tecnologia-y-personas', 'servinet', 'dewedd'])
    expect(en.map(({ slug }) => slug)).toEqual(es.map(({ slug }) => slug))
    expect(es[0].current).toBe(true)
    expect(es[0].role).toBe('Full Stack Developer')
    expect(en[0].description.join(' ')).toContain('legaltech')
  })

  it('exposes ten roles, communication history, training and external bylines', () => {
    const markdown = getPublicCareerMarkdown()

    const history = markdown.split('## Proyectos propios y herramientas seleccionadas')[0]
    expect(history.match(/^### .+ — .+$/gm)).toHaveLength(10)
    expect(markdown).toContain('Castilla-La Mancha Media')
    expect(markdown).toContain('Máster Universitario en Documental')
    expect(markdown).toContain('www.rtve.es/play/noticias/')
    expect(markdown).toContain('eldiario.es/castilla-la-mancha/')
    expect(markdown).toContain('proyecto del sector legaltech')
    expect(markdown).toContain('Pirineos sin bus')
    expect(markdown).toContain('El Rincón del Trabajador')
    expect(markdown).toContain('DTFetris')
    expect(markdown).not.toContain('Jaibu')
    expect(markdown).not.toContain('PENDIENTE DE DANI')
    expect(markdown).not.toContain('borrador público propuesto')
  })
})
