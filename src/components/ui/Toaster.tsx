'use client'
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      toastOptions={{
        classNames: {
          toast: 'font-mono text-[10px] bg-dark text-cream border border-border rounded-none',
          description: 'text-[var(--muted)]',
          actionButton: 'bg-[#f55033] text-[#0c0c0b] rounded-none',
        },
      }}
    />
  )
}
