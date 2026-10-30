'use client'
import { useLayoutEffect, useRef, type ReactNode } from 'react'

type BalancedChipsProps = {
  as?: 'ul' | 'div'
  className?: string
  'aria-label'?: string
  children: ReactNode
}

function countRows(el: HTMLElement) {
  return new Set(Array.from(el.children, (c) => (c as HTMLElement).offsetTop)).size
}

/**
 * A wrapping row of chips that never strands one chip on its own line.
 * `text-wrap: balance` for flex items: keep the row count the browser picked
 * and shrink the list to the narrowest width that still fits in that many
 * rows, so every row carries a similar share. Without script the list simply
 * wraps as usual.
 */
export default function BalancedChips({
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}: BalancedChipsProps) {
  const ref = useRef<HTMLUListElement & HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const balance = () => {
      el.style.maxWidth = ''
      const rows = countRows(el)
      if (rows < 2) return
      let lo = Math.max(...Array.from(el.children, (c) => (c as HTMLElement).offsetWidth))
      let hi = el.clientWidth
      while (hi - lo > 2) {
        const mid = Math.floor((lo + hi) / 2)
        el.style.maxWidth = `${mid}px`
        if (countRows(el) > rows) lo = mid
        else hi = mid
      }
      el.style.maxWidth = `${hi}px`
    }

    balance()
    document.fonts?.ready.then(balance)
    if (typeof ResizeObserver === 'undefined') return
    // Rebalance only when the space available changes, never on our own resize.
    let lastWidth = parent.clientWidth
    const ro = new ResizeObserver(() => {
      if (parent.clientWidth === lastWidth) return
      lastWidth = parent.clientWidth
      balance()
    })
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
