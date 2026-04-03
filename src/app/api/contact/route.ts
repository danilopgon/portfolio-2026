import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas/contact'
import ContactEmail from '@/emails/ContactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { ok: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, email, message } = result.data

  const { error } = await resend.emails.send({
    from: `Portfolio <${process.env.FROM_EMAIL}>`,
    to: process.env.CONTACT_EMAIL!,
    reply_to: `${name} <${email}>`,
    subject: `Contacto de ${name}`,
    react: ContactEmail({ name, email, message }),
  })

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
