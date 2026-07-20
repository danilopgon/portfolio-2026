import { describe, expect, it } from 'vitest'
import { dur, ease } from '../motion'

describe('motion tokens', () => {
  it('exports duration tokens with s/ms shape', () => {
    expect(dur.snap).toEqual({ s: 0.25, ms: 250 })
    expect(dur.base).toEqual({ s: 0.4, ms: 400 })
    expect(dur.slow).toEqual({ s: 0.6, ms: 600 })
  })

  it('exports ease tokens with gsap/css shape', () => {
    expect(ease.snap.gsap).toBe('power4.out')
    expect(ease.punch.gsap).toBe('back.out(1.4)')
    expect(ease.linear.gsap).toBe('none')
    expect(typeof ease.snap.css).toBe('string')
    expect(typeof ease.punch.css).toBe('string')
    expect(typeof ease.linear.css).toBe('string')
  })
})
