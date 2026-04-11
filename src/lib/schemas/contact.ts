import { z } from 'zod'

type ValidationMessages = {
  nameMin: string
  nameMax: string
  emailInvalid: string
  emailMax: string
  messageMin: string
  messageMax: string
}

export function makeContactSchema(msgs: ValidationMessages) {
  return z.object({
    name: z.string().min(2, msgs.nameMin).max(100, msgs.nameMax),
    email: z.string().email(msgs.emailInvalid).max(254, msgs.emailMax),
    message: z.string().min(10, msgs.messageMin).max(2000, msgs.messageMax),
  })
}

export type ContactFormData = {
  name: string
  email: string
  message: string
}

// Server-side schema (no locale-specific messages needed)
export const contactSchema = makeContactSchema({
  nameMin: 'Name too short',
  nameMax: 'Name too long',
  emailInvalid: 'Invalid email',
  emailMax: 'Email too long',
  messageMin: 'Message too short',
  messageMax: 'Message too long',
})
