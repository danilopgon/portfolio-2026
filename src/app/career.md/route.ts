import { getPublicCareerMarkdown } from '@/lib/career'

export const dynamic = 'force-static'

export function GET() {
  return new Response(getPublicCareerMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
