import { describe, it, expect } from 'vitest'
import { contactSchema, makeContactSchema } from '@/lib/schemas/contact'

const valid = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, this is a test message.',
}

describe('contactSchema', () => {
  it('accepts valid data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects name shorter than 2 characters', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects name longer than 100 characters', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'A'.repeat(101) })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects email longer than 254 characters', () => {
    const result = contactSchema.safeParse({ ...valid, email: `${'a'.repeat(250)}@b.com` })
    expect(result.success).toBe(false)
  })

  it('rejects message shorter than 10 characters', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'Short' })
    expect(result.success).toBe(false)
  })

  it('rejects message longer than 2000 characters', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'a'.repeat(2001) })
    expect(result.success).toBe(false)
  })
})

describe('makeContactSchema', () => {
  it('uses the provided error messages', () => {
    const schema = makeContactSchema({
      nameMin: 'nombre muy corto',
      nameMax: 'nombre muy largo',
      emailInvalid: 'email inválido',
      emailMax: 'email muy largo',
      messageMin: 'mensaje muy corto',
      messageMax: 'mensaje muy largo',
    })

    const result = schema.safeParse({ ...valid, name: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('nombre muy corto')
    }
  })
})
