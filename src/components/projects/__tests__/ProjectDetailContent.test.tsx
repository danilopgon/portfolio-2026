import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ProjectDetailContent from '../ProjectDetailContent'

afterEach(() => {
  cleanup()
})

describe('ProjectDetailContent', () => {
  it('renders name, description, year, tags, image and CTA for a known slug', () => {
    render(<ProjectDetailContent slug="holy-seitan" />)

    expect(screen.getByRole('heading', { name: 'Holy Seitan' })).toBeInTheDocument()
    expect(screen.getByText(/Markdown/)).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
    expect(screen.getByText('Drizzle ORM')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Holy Seitan' })).toBeInTheDocument()
  })

  it('renders the CTA as a safe external link when project.url is present', () => {
    render(<ProjectDetailContent slug="holy-seitan" />)

    const cta = screen.getByRole('link')
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
    expect(cta).toHaveAttribute('href', 'https://holy-seitan.danilopgon.com/')
  })

  it('renders no process section, heading, or empty gap when project.process is undefined', () => {
    const { container } = render(<ProjectDetailContent slug="holy-seitan" />)

    expect(container.querySelector('[data-testid="project-process"]')).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Proceso' })).toBeNull()
  })

  it('renders a distinct process section, positioned after description and before the CTA, when project.process is present', () => {
    const { container } = render(<ProjectDetailContent slug="lazy-lands" />)

    const processSection = container.querySelector('[data-testid="project-process"]')
    expect(processSection).not.toBeNull()
    expect(processSection?.textContent).toContain('La IA nunca fija el canon')

    const description = screen.getByTestId('project-description')
    const cta = screen.getByRole('link')

    const position = description.compareDocumentPosition(processSection as Node)
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    const ctaPosition = (processSection as Node).compareDocumentPosition(cta)
    expect(ctaPosition & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('returns nothing renderable for an unknown slug', () => {
    const { container } = render(<ProjectDetailContent slug="does-not-exist" />)
    expect(container).toBeEmptyDOMElement()
  })
})
