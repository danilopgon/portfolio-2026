'use client'
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            'font-mono text-[10px] tracking-[0.05em] bg-[#111110] text-[#f0ede8] border border-[#2a2a28] rounded-none',
          description: 'text-[#4a4a47]',
          actionButton: 'bg-[#f55033] text-[#0c0c0b] rounded-none',
        },
      }}
    />
  )
}
