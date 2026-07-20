import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mockMatchMedia } from '../../../test/motion'
import RevealOnScroll from '../RevealOnScroll'

describe('RevealOnScroll', () => {
  it('shows the final state instantly (full opacity, no offset, no blur) when reduced motion is preferred', () => {
    mockMatchMedia(true)

    const { getByText, container } = render(
      <RevealOnScroll>
        <p>Content</p>
      </RevealOnScroll>
    )

    expect(getByText('Content')).toBeInTheDocument()
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.opacity).toBe('1')
    expect(wrapper.style.filter).toBe('blur(0px)')
  })

  it('reveals via an editorial opacity + y + blur fade, never a clip-path cut, when motion is not reduced', () => {
    mockMatchMedia(false)

    const { container } = render(
      <RevealOnScroll>
        <p>Content</p>
      </RevealOnScroll>
    )

    const wrapper = container.firstChild as HTMLElement
    // `gsap.fromTo`'s default `immediateRender: true` applies the "from"
    // opacity/y/blur synchronously on mount, before the ScrollTrigger fires.
    expect(wrapper.style.clipPath).toBe('')
    expect(wrapper.style.opacity).toBe('0')
    expect(wrapper.style.filter).toBe('blur(6px)')
    expect(wrapper.style.transform).toContain('30px')
  })
})
