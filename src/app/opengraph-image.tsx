import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Dani López González, Full-Stack Product Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Satori can't read CSS custom properties; mirrors the :root tokens in globals.css.
const color = {
  black: '#0c0c0b',
  coral: '#f55033',
  dim: '#a0a0a0',
  cream: '#f0ede8',
}

// The hero as a share card: the coral rule, the name as a cover line crossing
// into the black-and-white portrait, the role in the reading serif.
export default async function OgImage() {
  const [bebas, serif, portrait] = await Promise.all([
    readFile(join(process.cwd(), 'src/fonts/BebasNeue-Regular.ttf')),
    readFile(join(process.cwd(), 'src/fonts/SourceSerif4-Regular-latin.woff')),
    readFile(join(process.cwd(), 'src/assets/og-portrait.png')),
  ])
  const portraitSrc = `data:image/png;base64,${portrait.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        background: color.black,
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
      }}
    >
      <img
        src={portraitSrc}
        alt=""
        width={620}
        height={630}
        style={{ position: 'absolute', right: 0, top: 0 }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 72px',
          width: '100%',
        }}
      >
        <div
          style={{ width: '88px', height: '5px', background: color.coral, marginBottom: '22px' }}
        />
        <span
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '196px',
            lineHeight: 0.86,
            color: color.cream,
            letterSpacing: '0.005em',
          }}
        >
          DANI LÓPEZ
        </span>
        <span
          style={{
            fontFamily: 'Source Serif 4',
            fontSize: '30px',
            color: color.dim,
            marginTop: '30px',
          }}
        >
          Full-Stack Product Engineer | AI Engineering
        </span>
        <span
          style={{
            fontFamily: 'Source Serif 4',
            fontSize: '26px',
            color: color.cream,
            marginTop: '72px',
          }}
        >
          danilopgon.com
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Bebas Neue', data: bebas, style: 'normal', weight: 400 },
        { name: 'Source Serif 4', data: serif, style: 'normal', weight: 400 },
      ],
    }
  )
}
