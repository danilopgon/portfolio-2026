import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { dur, ease } from '../motion'

describe('motion token / CSS parity', () => {
  it('every dur/ease literal exported by motion.ts appears verbatim in globals.css', () => {
    const css = readFileSync(
      resolve(__dirname, '../../app/globals.css'),
      'utf-8'
    )

    for (const token of Object.values(dur)) {
      expect(css).toContain(`${token.ms}ms`)
    }

    for (const token of Object.values(ease)) {
      expect(css).toContain(token.css)
    }
  })
})
