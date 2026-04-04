import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Dani López González — Frontend Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const fontData = await readFile(join(process.cwd(), 'src/fonts/BebasNeue-Regular.ttf'))

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
        <div style={{ width: '32px', height: '1px', background: '#f55033' }} />
        <span
          style={{
            fontSize: '14px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#8e8e8c',
            fontFamily: 'sans-serif',
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
          marginBottom: '44px',
        }}
      >
        <span
          style={{
            fontSize: '172px',
            color: '#f0ede8',
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
            color: '#f55033',
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
          color: '#8e8e8c',
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
