import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockMatchMedia } from '../../../test/motion'
import RevealOnScroll from '../RevealOnScroll'

describe('RevealOnScroll', () => {
  it('shows the final state instantly and clears clipPath when reduced motion is preferred', () => {
    mockMatchMedia(true)

    const { getByText, container } = render(
      <RevealOnScroll>
        <p>Content</p>
      </RevealOnScroll>
    )

    expect(getByText('Content')).toBeInTheDocument()
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.clipPath === 'none' || wrapper.style.clipPath === '').toBe(true)
  })

  it('uses a clipPath wipe (not an opacity fade) when motion is not reduced', () => {
    mockMatchMedia(false)

    const { container } = render(
      <RevealOnScroll>
        <p>Content</p>
      </RevealOnScroll>
    )

    const wrapper = container.firstChild as HTMLElement
    // `gsap.fromTo`'s default `immediateRender: true` applies the "from"
    // clipPath synchronously on mount, before the ScrollTrigger fires.
    expect(wrapper.style.clipPath).toBe('inset(0% 100% 0% 0%)')
    expect(wrapper.style.opacity).toBe('')
  })
})
