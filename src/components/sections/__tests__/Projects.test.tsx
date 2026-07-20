import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Projects from '../Projects'

afterEach(() => {
  cleanup()
})

describe('Projects', () => {
  it('renders each project card as a Link into the project detail route, carrying a data-flip-id', () => {
    render(<Projects />)

    const link = screen.getByRole('link', { name: /Holy Seitan/ })
    expect(link).toHaveAttribute('href', '/proyectos/holy-seitan')
    expect(link).toHaveAttribute('data-flip-id', 'project-holy-seitan')
  })
})
