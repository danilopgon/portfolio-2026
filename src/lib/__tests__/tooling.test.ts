import { describe, expect, it } from 'vitest'
import { getFeaturedTool, getToolingAreas } from '@/lib/tooling'

describe('AI engineering section', () => {
  it('keeps one flagship and the same three capability areas in both locales', () => {
    for (const locale of ['es', 'en'] as const) {
      expect(getFeaturedTool(locale).slug).toBe('apereview')
      expect(getToolingAreas(locale).map(({ slug }) => slug)).toEqual([
        'delivery', 'quality', 'operations',
      ])
      expect(getToolingAreas(locale).every(({ description }) => description.length > 0)).toBe(true)
    }
  })
})
