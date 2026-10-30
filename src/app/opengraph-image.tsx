import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Dani López González — Product Engineer · Frontend & AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Satori can't read CSS custom properties; mirrors the :root tokens in globals.css.
const color = {
  black: '#0c0c0b',
  coral: '#f55033',
  muted: '#8e8e8c',
  cream: '#f0ede8',
}

export default async function OgImage() {
  const fontData = await readFile(join(process.cwd(), 'src/fonts/BebasNeue-Regular.ttf'))

  return new ImageResponse(
    <div
      style={{
        background: color.black,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '72px 80px',
        position: 'relative',
      }}
    >
      {/* Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px',
        }}
      >
        <div style={{ width: '32px', height: '1px', background: color.coral }} />
        <span
          style={{
            fontSize: '14px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: color.muted,
            fontFamily: 'sans-serif',
          }}
        >
          Product Engineer · Frontend & AI
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '44px',
        }}
      >
        <span
          style={{
            fontSize: '172px',
            color: color.cream,
            letterSpacing: '0.01em',
            fontFamily: 'Bebas Neue',
            lineHeight: 1,
          }}
        >
          DANI
        </span>
        <span
          style={{
            fontSize: '172px',
            color: color.coral,
            letterSpacing: '0.01em',
            fontFamily: 'Bebas Neue',
            lineHeight: 1,
          }}
        >
          LÓPEZ
        </span>
      </div>

      {/* Domain */}
      <span
        style={{
          fontSize: '13px',
          letterSpacing: '0.22em',
          color: color.muted,
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
        }}
      >
        danilopgon.com
      </span>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Bebas Neue',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
