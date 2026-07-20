import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Projects from '../Projects'

afterEach(() => {
  cleanup()
})

describe('Projects', () => {
  it('renders each project card as a direct external link to project.url', () => {
    render(<Projects />)

    const link = screen.getByRole('link', { name: /Holy Seitan/ })
    expect(link).toHaveAttribute('href', 'https://holy-seitan.danilopgon.com/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
