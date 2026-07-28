"use client"

import {useEffect} from "react"
import Lenis from "lenis"
import {gsap, ScrollTrigger} from "@/lib/gsap"

/**
 * Global smooth scroll (Lenis) — the main source of the "premium" scroll feel.
 *
 * - Driven by GSAP's ticker and synced to ScrollTrigger so pinned/scrub reveals
 *   stay in lockstep. Framer Motion's whileInView (IntersectionObserver) keeps
 *   working unchanged.
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

    lenis.on("scroll", ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

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
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return null
}
