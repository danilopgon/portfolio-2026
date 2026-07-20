import { notFound } from 'next/navigation'
import { getProjects } from '@/lib/projects'
import ProjectDetailContent from '@/components/projects/ProjectDetailContent'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Deep-link fallback for a project's detail view. Reached directly (hard
 * navigation, shared link) rather than through the intercepted modal route.
 * Slug existence is checked against the `es` project list — slugs are
 * identical across locales, only the copy differs.
 */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const exists = getProjects('es').some((project) => project.slug === slug)

  if (!exists) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <ProjectDetailContent slug={slug} />
    </div>
  )
}
