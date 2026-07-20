'use client'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { dur, ease } from '@/lib/motion'
import { useLanguage } from '@/lib/i18n/context'
import ProjectDetailContent from './ProjectDetailContent'

gsap.registerPlugin(Flip)

type Props = {
  slug: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Morphs the source project card (identified by `[data-flip-id]`) into the
 * modal panel. Returns a restore function that un-hides the source card, or
 * `null` when no source card is mounted — the deep-link entry point, since
 * the intercepted route's underlying page never rendered.
 */
export function flipOpen(panel: HTMLElement, flipId: string): (() => void) | null {
  const cardEl = document.querySelector<HTMLElement>(`[data-flip-id="${flipId}"]`)
  if (!cardEl) return null

  const state = Flip.getState(panel)
  gsap.set(cardEl, { opacity: 0 })
  Flip.fit(panel, cardEl, { duration: 0 })
  Flip.to(state, { duration: dur.base.s, ease: ease.snap.gsap })

  return () => {
    gsap.set(cardEl, { opacity: '' })
  }
}

/**
 * jsdom (and older browsers) don't implement `HTMLDialogElement.showModal`.
 * Falling back to the `open` attribute keeps the component's behavior
 * identical under test and in unsupported runtimes, instead of throwing.
 */
function openDialogEl(dialog: HTMLDialogElement) {
  if (typeof dialog.showModal === 'function') dialog.showModal()
  else dialog.setAttribute('open', '')
}

export default function ProjectModal({ slug }: Props) {
  const router = useRouter()
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const closingRef = useRef(false)
  const titleId = `project-title-${slug}`
  const flipId = `project-${slug}`

  const handleClose = useCallback(() => {
    // Close button, Escape, and backdrop click all funnel through here so
    // unmount stays the single teardown point. Guarded against being fired
    // twice (e.g. our own Escape keydown handler plus the browser's native
    // `cancel` event) to avoid double `router.back()` navigation.
    if (closingRef.current) return
    closingRef.current = true
    router.back()
  }, [router])

  // Dialog lifecycle: open, save/restore focus, lock body scroll.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    triggerRef.current = document.activeElement
    openDialogEl(dialog)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()

    return () => {
      document.body.style.overflow = previousOverflow

      const trigger = triggerRef.current
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus()
      } else {
        const main = document.getElementById('main-content')
        if (main) {
          main.setAttribute('tabindex', '-1')
          main.focus()
          main.removeAttribute('tabindex')
        }
      }
    }
  }, [])

  // Shared-element morph: card -> panel on open; teardown restores the card
  // regardless of how the modal unmounts (close, deep-link, interrupted nav).
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const restore = flipOpen(panel, flipId)
    return () => {
      restore?.()
    }
  }, [flipId])

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      handleClose()
      return
    }

    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-0 m-auto max-h-[90vh] max-w-2xl w-[92vw] bg-dark border border-border p-0 backdrop:bg-black/70"
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === dialogRef.current) handleClose()
      }}
    >
      <div ref={panelRef} data-flip-id={flipId} className="relative flex flex-col overflow-y-auto">
        <button
          type="button"
          onClick={handleClose}
          aria-label={t.projectModal.close}
          className="absolute top-4 right-4 z-10 text-cream text-[20px] leading-none hover:text-coral transition-colors"
        >
          ×
        </button>
        <ProjectDetailContent slug={slug} />
      </div>
    </dialog>
  )
}
