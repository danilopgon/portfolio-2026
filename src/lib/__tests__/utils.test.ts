import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('resolves tailwind conflicts (last one wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('handles conditional classes', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', undefined, null, false, '')).toBe('foo')
  })

  it('returns empty string with no valid inputs', () => {
    expect(cn()).toBe('')
  })
})
