"use client"

import {useEffect} from "react"
import Lenis from "lenis"

/**
 * Global smooth scroll (Lenis) — the main source of the "premium" scroll feel.
 *
 * - Driven by requestAnimationFrame. Framer Motion's whileInView
 *   (IntersectionObserver) works independently.
 * - Fully disabled under prefers-reduced-motion → native scroll.
 * - Same-page hash links scroll smoothly via lenis.scrollTo (offset clears the
 *   fixed nav); cross-page links are untouched.
 *
 * Renders nothing — Lenis operates on window.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis()
    let animationFrame = 0
    const onFrame = (time: number) => {
      lenis.raf(time)
      animationFrame = window.requestAnimationFrame(onFrame)
    }
    animationFrame = window.requestAnimationFrame(onFrame)

    // Smooth same-page anchor jumps (Nav → #vision / #contact, etc.).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href*="#"]',
      )
      if (!anchor) return
      const url = new URL(anchor.href, window.location.href)
      if (url.pathname !== window.location.pathname || !url.hash) return
      const target = document.querySelector(url.hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, {offset: -80})
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      window.cancelAnimationFrame(animationFrame)
      lenis.destroy()
    }
  }, [])

  return null
}
