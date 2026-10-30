import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactEmailProps {
  name: string
  email: string
  message: string
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo mensaje de contacto de {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={rule} />
            <Heading style={heading}>Nuevo mensaje</Heading>
            <Text style={headerLabel}>danilopgon.com</Text>
          </Section>

          <Hr style={divider} />

          {/* Sender info */}
          <Section style={section}>
            <Text style={label}>Remitente</Text>
            <Text style={value}>{name}</Text>
            <Text style={labelSmall}>{email}</Text>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={section}>
            <Text style={label}>Mensaje</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Responde directamente a este email para contactar con {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ContactEmail.PreviewProps = {
  name: 'María García',
  email: 'maria@ejemplo.com',
  message:
    'Hola Dani, me gustaría hablar contigo sobre un proyecto de diseño y desarrollo web. ¿Tienes disponibilidad para una llamada esta semana?',
} satisfies ContactEmailProps

// Styles: the site's dark editorial look. Email clients do not load web
// fonts, so the faces fall back to the closest system ones.
const color = {
  black: '#0c0c0b',
  dark: '#111110',
  border: '#2a2a28',
  coral: '#f55033',
  cream: '#f0ede8',
  dim: '#a0a0a0',
  muted: '#8e8e8c',
}
const serif = '"Source Serif 4", Georgia, "Times New Roman", serif'
const display = '"Bebas Neue", "Arial Narrow", Impact, sans-serif'

const body: React.CSSProperties = {
  backgroundColor: color.black,
  fontFamily: serif,
  margin: 0,
  padding: '40px 0',
}

const container: React.CSSProperties = {
  backgroundColor: color.dark,
  border: `1px solid ${color.border}`,
  maxWidth: '520px',
  margin: '0 auto',
}

const header: React.CSSProperties = {
  padding: '32px 32px 24px',
}

const rule: React.CSSProperties = {
  width: '64px',
  height: '4px',
  backgroundColor: color.coral,
  marginBottom: '16px',
}

const heading: React.CSSProperties = {
  color: color.cream,
  fontFamily: display,
  fontSize: '44px',
  fontWeight: 400,
  lineHeight: '1',
  // Bebas is caps-only; uppercase keeps the fallback faces looking the same.
  textTransform: 'uppercase',
  margin: 0,
}

const headerLabel: React.CSSProperties = {
  color: color.muted,
  fontSize: '15px',
  margin: '10px 0 0',
}

const divider: React.CSSProperties = {
  borderColor: color.border,
  borderTopWidth: 1,
  margin: 0,
}

const section: React.CSSProperties = {
  padding: '20px 32px',
}

const label: React.CSSProperties = {
  color: color.muted,
  fontSize: '14px',
  margin: '0 0 6px',
}

const value: React.CSSProperties = {
  color: color.cream,
  fontSize: '18px',
  margin: '0 0 4px',
}

const labelSmall: React.CSSProperties = {
  color: color.dim,
  fontSize: '15px',
  margin: 0,
}

const messageText: React.CSSProperties = {
  color: color.cream,
  fontSize: '17px',
  lineHeight: '1.6',
  margin: 0,
  whiteSpace: 'pre-wrap',
}

const footer: React.CSSProperties = {
  padding: '16px 32px 24px',
}

const footerText: React.CSSProperties = {
  color: color.muted,
  fontSize: '14px',
  margin: 0,
}
