'use client'
import { useEffect, useRef, type RefObject } from 'react'

/**
 * A dither loupe over an image: under the pointer the picture prints as an
 * ordered (Bayer 8×8) dither in the brand's near-black, coral and cream, with
 * a dithered rim, drawn in WebGL over the real <img>. Everywhere else the
 * canvas is transparent, so the image stays exactly as it is. Only on fine
 * pointers; without WebGL the canvas never appears.
 */

type DitherImageProps = {
  src: string
  /** The element that drives the loupe; or name one with `hostSelector`. */
  target?: RefObject<HTMLElement | null>
  /** Closest ancestor of the canvas to use as the target. */
  hostSelector?: string
  /** CSS object-position of the <img> underneath, as fractions (0..1). */
  positionX?: number
  positionY?: number
  /** Dither cell size in CSS pixels. */
  cell?: number
  /** Loupe radius in CSS pixels. */
  radius?: number
  /** Match the CSS filter on the <img> underneath. */
  contrast?: number
  brightness?: number
  className?: string
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uPos;
uniform float uCell;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uContrast;
uniform float uBright;
uniform vec3 uDark;
uniform vec3 uMid;
uniform vec3 uLight;

float b2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
float b8(vec2 a) { return b4(0.5 * a) * 0.25 + b2(a); }

vec4 sampleCover(vec2 p) {
  float s = max(uRes.x / uImg.x, uRes.y / uImg.y);
  vec2 drawn = uImg * s;
  vec2 offset = (uRes - drawn) * uPos;
  vec2 uv = (p - offset) / drawn;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return vec4(0.0);
  return texture2D(uTex, uv);
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 cellId = floor(frag / uCell);
  vec2 center = (cellId + 0.5) * uCell;
  float t = b8(cellId);

  // Full inside the loupe, a dithered falloff at the rim.
  float m = 1.0 - smoothstep(uRadius * 0.55, uRadius, distance(center, uMouse));
  float visible = step(t, m) * step(0.001, m);

  vec4 src = sampleCover(center);
  float lum = dot(src.rgb, vec3(0.299, 0.587, 0.114));
  lum = clamp(((lum - 0.5) * uContrast + 0.5) * uBright, 0.0, 1.0);
  float level = clamp(floor(lum * 2.0 + t), 0.0, 2.0);
  vec3 col = level < 0.5 ? uDark : (level < 1.5 ? uMid : uLight);

  float a = visible * step(0.5, src.a);
  gl_FragColor = vec4(col * a, a);
}
`

function readColor(name: string): [number, number, number] {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function DitherImage({
  src,
  target,
  hostSelector,
  positionX = 0.5,
  positionY = 0.5,
  cell = 3,
  radius = 150,
  contrast = 1,
  brightness = 1,
  className = '',
}: DitherImageProps) {
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const host = target?.current ?? (hostSelector ? wrap.closest<HTMLElement>(hostSelector) : null)
    if (!host || !window.matchMedia('(pointer: fine)').matches) return

    // A fresh canvas per mount: a context lost on unmount (StrictMode mounts
    // effects twice) must never be handed back to the next mount.
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    canvas.className = 'absolute inset-0 w-full h-full'
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false })
    if (!gl) return

    const compile = (type: number, source: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, source)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(prog, name)
    gl.uniform3fv(u('uDark'), readColor('--black'))
    gl.uniform3fv(u('uMid'), readColor('--coral'))
    gl.uniform3fv(u('uLight'), readColor('--cream'))
    gl.uniform2f(u('uPos'), positionX, positionY)
    gl.uniform1f(u('uContrast'), contrast)
    gl.uniform1f(u('uBright'), brightness)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // The loupe follows the pointer with a little lag and opens and closes its
    // radius; the loop only runs while something is still moving.
    const state = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0 }
    let raf = 0
    let ready = false

    const draw = () => {
      raf = 0
      const k = reduced ? 1 : 0.18
      state.x += (state.tx - state.x) * k
      state.y += (state.ty - state.y) * k
      state.r += (state.tr - state.r) * (reduced ? 1 : 0.14)

      gl.uniform1f(u('uCell'), cell * dpr)
      gl.uniform2f(u('uMouse'), state.x * dpr, state.y * dpr)
      gl.uniform1f(u('uRadius'), state.r * dpr)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      const moving =
        Math.abs(state.tx - state.x) > 0.3 ||
        Math.abs(state.ty - state.y) > 0.3 ||
        Math.abs(state.tr - state.r) > 0.3
      if (moving) raf = requestAnimationFrame(draw)
    }
    const kick = () => {
      if (ready && !raf) raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(u('uRes'), canvas.width, canvas.height)
      kick()
    }

    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.uniform2f(u('uImg'), img.naturalWidth, img.naturalHeight)
      ready = true
      wrap.appendChild(canvas)
      resize()
    }
    img.src = src

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      if (state.tr === 0 && inside) {
        state.x = x
        state.y = y
      }
      state.tx = x
      state.ty = y
      state.tr = inside ? radius : 0
      kick()
    }
    const onLeave = () => {
      state.tr = 0
      kick()
    }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      img.onload = null
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    }
  }, [src, target, hostSelector, positionX, positionY, cell, radius, contrast, brightness])

  return <span ref={wrapRef} className={`absolute inset-0 pointer-events-none ${className}`} />
}
