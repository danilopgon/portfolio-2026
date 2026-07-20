import { notFound } from 'next/navigation'
import { getProjects } from '@/lib/projects'
import ProjectModal from '@/components/projects/ProjectModal'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Intercepted route: opens the project detail as a modal when navigated to
 * from within the app (e.g. clicking a project card on `/`). A hard
 * reload/direct visit to `/proyectos/[slug]` skips this and renders the
 * full deep-link page instead, per Next.js intercepting route semantics.
 */
export default async function InterceptedProjectModal({ params }: Props) {
  const { slug } = await params
  const exists = getProjects('es').some((project) => project.slug === slug)

  if (!exists) notFound()

  return <ProjectModal slug={slug} />
}
