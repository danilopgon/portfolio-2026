import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dani López González — Frontend Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#0c0c0b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '72px 80px',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Coral radial glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          background:
            'radial-gradient(ellipse 70% 60% at 75% 35%, rgba(245,80,51,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '24px',
        }}
      >
        <div style={{ width: '32px', height: '1px', background: '#f55033' }} />
        <span
          style={{
            fontSize: '13px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#8e8e8c',
          }}
        >
          Frontend Developer
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 0.88,
          marginBottom: '40px',
        }}
      >
        <span style={{ fontSize: '160px', color: '#f0ede8', letterSpacing: '0.01em' }}>DANI</span>
        <span style={{ fontSize: '160px', color: '#f55033', letterSpacing: '0.01em' }}>LÓPEZ</span>
      </div>

      {/* Domain */}
      <span
        style={{
          fontSize: '14px',
          letterSpacing: '0.2em',
          color: '#8e8e8c',
          textTransform: 'uppercase',
        }}
      >
        danilopgon.com
      </span>
    </div>,
    { ...size }
  )
}
