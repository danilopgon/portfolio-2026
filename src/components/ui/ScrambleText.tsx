'use client'
import { useEffect, useRef } from 'react'
import { scramble } from '@/lib/scramble'

type Props = {
  text: string
  duration?: number
  delay?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function ScrambleText({
  text,
  duration = 600,
  delay = 0,
  className,
  as: Tag = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const cleanup = scramble(ref.current, text, duration, delay)
    return cleanup
  }, [text, duration, delay])

  // @ts-expect-error Tag dinámico
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
