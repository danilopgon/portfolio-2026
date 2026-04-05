import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas/contact'
import ContactEmail from '@/emails/ContactEmail'
import { checkRateLimit } from '@/lib/rate-limit'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const apiKey = requireEnv('RESEND_API_KEY')
const fromEmail = requireEnv('FROM_EMAIL')
const contactEmail = requireEnv('CONTACT_EMAIL')

const resend = new Resend(apiKey)

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danilopgon.com',
  'http://localhost:3000',
]

export async function POST(req: NextRequest) {
  // CSRF: validate Origin header
  const origin = req.headers.get('origin')
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }

  // Rate limiting by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }

  const body = await req.json()
  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { name, email, message } = result.data

  const { error } = await resend.emails.send({
    from: `Portfolio <${fromEmail}>`,
    to: contactEmail,
    replyTo: `${name} <${email}>`,
    subject: `Contacto de ${name}`,
    react: ContactEmail({ name, email, message }),
  })

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
