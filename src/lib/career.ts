import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'
import type { Experience } from './experience'
import type { Locale } from './i18n/translations'

const ROOT = path.join(process.cwd(), 'content', 'career')

const localized = z.object({ es: z.string(), en: z.string() })
const localizedLines = z.object({
  es: z.array(z.string()),
  en: z.array(z.string()),
})

const roleSchema = z.object({
  slug: z.string(),
  company: z.string(),
  role: localized,
  period: localized,
  start: z.string().regex(/^\d{4}-\d{2}$/),
  end: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .nullable(),
  location: z.string().optional(),
  stack: z.array(z.string()).default([]),
  public: z.boolean(),
  featured: z.boolean(),
  highlights: localizedLines.optional(),
})

type CareerRole = {
  data: z.infer<typeof roleSchema>
  body: string
}

function readMarkdown(relativePath: string) {
  return matter(readFileSync(path.join(ROOT, relativePath), 'utf8'))
}

function readRoles(): CareerRole[] {
  const directory = path.join(ROOT, 'experience')
  return readdirSync(directory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const { data, content } = readMarkdown(path.join('experience', filename))
      const role = roleSchema.parse(data)

      if (role.slug !== path.basename(filename, '.md')) {
        throw new Error(`Career slug does not match filename: ${filename}`)
      }
      if (role.featured && !role.highlights) {
        throw new Error(`Featured career role needs bilingual highlights: ${role.slug}`)
      }

      return { data: role, body: content.trim() }
    })
    .filter(({ data }) => data.public)
    .sort((a, b) => b.data.start.localeCompare(a.data.start))
}

export function getExperiencesByLocale(): Record<Locale, Experience[]> {
  const featured = readRoles().filter(({ data }) => data.featured)

  function forLocale(locale: Locale): Experience[] {
    return featured.map(({ data }) => ({
      slug: data.slug,
      role: data.role[locale],
      company: data.company,
      period: data.period[locale],
      filename: `${data.slug}.log`,
      description: data.highlights![locale],
      stack: data.stack,
      current: data.end === null,
    }))
  }

  return { es: forLocale('es'), en: forLocale('en') }
}

/** The public Markdown and the homepage read the same career entries. */
export function getPublicCareerMarkdown(): string {
  const profile = readMarkdown('profile.md').content.trim()
  const projects = readMarkdown('projects.md').content.trim()
  const roles = readRoles()

  const history = roles
    .map(({ data, body }) => {
      const heading = `### ${data.company} — ${data.role.es}`
      const dates = `**${data.period.es}${data.location ? ` · ${data.location}` : ''}**`
      const stack = data.stack.length
        ? `\n\n**Áreas y tecnologías:** ${data.stack.join(', ')}.`
        : ''
      return `${heading}\n\n${dates}\n\n${body}${stack}`
    })
    .join('\n\n')

  return (
    [
      profile,
      '## Trayectoria profesional completa',
      'Las etapas pueden solaparse cuando hubo trabajos o proyectos simultáneos.',
      history,
      projects,
      '## Sobre las fuentes',
      'Este perfil lo mantiene Dani López González. Las fechas y puestos se basan en su trayectoria declarada y en su perfil profesional; los enlaces a publicaciones acreditan la autoría o colaboración indicada, no necesariamente todos los detalles de una relación laboral.',
    ].join('\n\n') + '\n'
  )
}
