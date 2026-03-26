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
            <Text style={headerLabel}>{'// danilopgon.com'}</Text>
            <Heading style={heading}>Nuevo mensaje</Heading>
          </Section>

          <Hr style={divider} />

          {/* Sender info */}
          <Section style={section}>
            <Text style={label}>REMITENTE</Text>
            <Text style={value}>{name}</Text>
            <Text style={labelSmall}>{email}</Text>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={section}>
            <Text style={label}>MENSAJE</Text>
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

// Styles
const body: React.CSSProperties = {
  backgroundColor: '#0c0c0b',
  fontFamily: '"DM Mono", "Courier New", monospace',
  margin: 0,
  padding: '40px 0',
}

const container: React.CSSProperties = {
  backgroundColor: '#111110',
  border: '1px solid #2a2a28',
  maxWidth: '520px',
  margin: '0 auto',
}

const header: React.CSSProperties = {
  padding: '28px 32px 24px',
}

const headerLabel: React.CSSProperties = {
  color: '#f55033',
  fontSize: '10px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  margin: '0 0 12px',
}

const heading: React.CSSProperties = {
  color: '#f0ede8',
  fontSize: '28px',
  fontWeight: 400,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  margin: 0,
}

const divider: React.CSSProperties = {
  borderColor: '#2a2a28',
  borderTopWidth: 1,
  margin: 0,
}

const section: React.CSSProperties = {
  padding: '20px 32px',
}

const label: React.CSSProperties = {
  color: '#f55033',
  fontSize: '10px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  margin: '0 0 8px',
}

const value: React.CSSProperties = {
  color: '#f0ede8',
  fontSize: '14px',
  letterSpacing: '0.02em',
  margin: '0 0 4px',
}

const labelSmall: React.CSSProperties = {
  color: '#7e7e7c',
  fontSize: '12px',
  letterSpacing: '0.05em',
  margin: 0,
}

const messageText: React.CSSProperties = {
  color: '#a0a0a0',
  fontSize: '13px',
  lineHeight: '1.8',
  letterSpacing: '0.02em',
  margin: 0,
  whiteSpace: 'pre-wrap',
}

const footer: React.CSSProperties = {
  padding: '16px 32px',
}

const footerText: React.CSSProperties = {
  color: '#2a2a28',
  fontSize: '11px',
  letterSpacing: '0.05em',
  margin: 0,
}
