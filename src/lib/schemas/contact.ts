import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.email('Introduce un email válido').max(254, 'El email es demasiado largo'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>
