import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

import ProjectPage from '../page'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('ProjectPage (deep-link)', () => {
  it('renders project data for a valid slug', async () => {
    const jsx = await ProjectPage({ params: Promise.resolve({ slug: 'holy-seitan' }) })
    render(jsx)

    expect(screen.getByRole('heading', { name: 'Holy Seitan' })).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
    expect(screen.getByText('Drizzle ORM')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Holy Seitan' })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://holy-seitan.danilopgon.com/')
  })

  it('invokes notFound() for an unknown slug instead of crashing', async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: 'does-not-exist' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })
})
