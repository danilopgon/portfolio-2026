import { describe, expect, it } from 'vitest'
import { dur, ease } from '../motion'

describe('motion tokens', () => {
  it('exports duration tokens with s/ms shape', () => {
    expect(dur.snap).toEqual({ s: 0.9, ms: 900 })
    expect(dur.base).toEqual({ s: 1.2, ms: 1200 })
    expect(dur.slow).toEqual({ s: 1.8, ms: 1800 })
  })

  it('exports ease tokens with gsap/css shape', () => {
    expect(ease.snap.gsap).toBe('expo.out')
    expect(ease.linear.gsap).toBe('none')
    expect(typeof ease.snap.css).toBe('string')
    expect(typeof ease.linear.css).toBe('string')
  })
})
