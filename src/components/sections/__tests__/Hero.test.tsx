import { cleanup, render } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it } from 'vitest'
import { mockMatchMedia } from '../../../test/motion'
import Hero from '../Hero'

afterEach(() => {
  cleanup()
})

describe('Hero entrance', () => {
  it('SSR markup contains data-motion="pending" while content is rendered', () => {
    // renderToStaticMarkup never runs effects, so this reflects exactly what
    // ships before any JS executes (no-JS / pre-hydration state).
    const html = renderToStaticMarkup(<Hero />)

    expect(html).toContain('data-motion="pending"')
    expect(html).toContain('DANI')
  })

  it('removes the data-motion="pending" attribute after mount', () => {
    mockMatchMedia(false)

    const { container } = render(<Hero />)

    const root = container.querySelector('#hero')
    expect(root?.hasAttribute('data-motion')).toBe(false)
  })

  it('removes the data-motion="pending" attribute after mount even with reduced motion', () => {
    mockMatchMedia(true)

    const { container } = render(<Hero />)

    const root = container.querySelector('#hero')
    expect(root?.hasAttribute('data-motion')).toBe(false)
  })
})
