const CHARS = '▓▒░█▄▀@#$%&!?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function scramble(
  el: HTMLElement,
  finalText: string,
  duration: number,
  delay = 0
): () => void {
  let interval: ReturnType<typeof setInterval>

  const start = () => {
    el.style.opacity = '1'
    const len = finalText.length
    const steps = Math.ceil(duration / 16)
    let step = 0

    interval = setInterval(() => {
      const progress = Math.pow(step / steps, 2.5)
      const resolved = Math.floor(progress * len)
      el.textContent = finalText
        .split('')
        .map((c, i) =>
          i < resolved ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join('')
      if (++step > steps) {
        clearInterval(interval)
        el.textContent = finalText
      }
    }, 16)
  }

  const timeout = setTimeout(start, delay)

  // Devuelve cleanup para useEffect
  return () => {
    clearTimeout(timeout)
    clearInterval(interval)
  }
}
