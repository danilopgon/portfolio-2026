import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const back = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back }),
}))

import ProjectModal from '../ProjectModal'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  document.body.style.overflow = ''
})

describe('ProjectModal — structural a11y contract', () => {
  it('renders as a dialog with aria-labelledby pointing at the project title', () => {
    render(<ProjectModal slug="holy-seitan" />)

    const dialog = screen.getByRole('dialog', { hidden: true })
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()

    const titleEl = document.getElementById(labelledBy as string)
    expect(titleEl?.textContent).toContain('Holy Seitan')
  })
})

describe('ProjectModal — close behavior', () => {
  it('triggers router.back() on Escape', () => {
    render(<ProjectModal slug="holy-seitan" />)
    const dialog = screen.getByRole('dialog', { hidden: true })

    fireEvent.keyDown(dialog, { key: 'Escape' })

    expect(back).toHaveBeenCalledTimes(1)
  })

  it('does not double-invoke router.back() when both the keydown handler and the native cancel event fire', () => {
    render(<ProjectModal slug="holy-seitan" />)
    const dialog = screen.getByRole('dialog', { hidden: true })

    fireEvent.keyDown(dialog, { key: 'Escape' })
    fireEvent(dialog, new Event('cancel', { cancelable: true }))

    expect(back).toHaveBeenCalledTimes(1)
  })
})

describe('ProjectModal — focus trap and restore', () => {
  beforeEach(() => {
    const trigger = document.createElement('button')
    trigger.textContent = 'Open project'
    document.body.appendChild(trigger)
    trigger.focus()
  })

  it('never lets focus leave the dialog while Tab cycles', () => {
    render(<ProjectModal slug="holy-seitan" />)
    const dialog = screen.getByRole('dialog', { hidden: true })
    const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    last.focus()
    fireEvent.keyDown(dialog, { key: 'Tab' })
    expect(document.activeElement).toBe(first)

    first.focus()
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(last)
  })

  it('restores focus to the originating trigger on unmount', () => {
    const trigger = document.activeElement as HTMLElement
    const { unmount } = render(<ProjectModal slug="holy-seitan" />)

    unmount()

    expect(document.activeElement).toBe(trigger)
  })
})

describe('ProjectModal — Flip open effect', () => {
  it('does not throw and does not attempt Flip when no source card is present (deep-link entry)', () => {
    expect(() => render(<ProjectModal slug="holy-seitan" />)).not.toThrow()
  })

  it('sets the source card opacity to 0 on open and restores it on unmount', () => {
    const card = document.createElement('a')
    card.setAttribute('data-flip-id', 'project-holy-seitan')
    document.body.appendChild(card)

    const { unmount } = render(<ProjectModal slug="holy-seitan" />)

    expect(card.style.opacity).toBe('0')

    unmount()

    expect(card.style.opacity).not.toBe('0')

    card.remove()
  })

  it('restores the source card opacity even on an early/interrupted unmount', () => {
    const card = document.createElement('a')
    card.setAttribute('data-flip-id', 'project-holy-seitan')
    document.body.appendChild(card)

    const { unmount } = render(<ProjectModal slug="holy-seitan" />)
    expect(card.style.opacity).toBe('0')

    act(() => {
      unmount()
    })

    expect(card.style.opacity).not.toBe('0')
    card.remove()
  })
})

describe('ProjectModal — body scroll lock', () => {
  it('locks body scroll while open and restores it on unmount', () => {
    const { unmount } = render(<ProjectModal slug="holy-seitan" />)

    expect(document.body.style.overflow).toBe('hidden')

    unmount()

    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
