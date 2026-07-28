"use client"

import type {RefObject} from "react"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {SplitText} from "gsap/SplitText"
import {CustomEase} from "gsap/CustomEase"

// Register once at module scope (client-only: this module is only imported by
// 'use client' components). registerPlugin and CustomEase.create touch no DOM,
// so they are SSR-safe; all DOM work happens inside useGSAP below.
gsap.registerPlugin(useGSAP, SplitText, CustomEase)

// Reuse the site's signature easing curve (the same cubic-bezier Framer Motion
// uses across RevealOnScroll / Hero) so GSAP entrances feel identical.
const APPLE = CustomEase.create("apple", "0.2,0.8,0.2,1")

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)"

/**
 * P1 — first-fold hero reveal (see ANIMATION.md).
 *
 * Drives the pill → h1 → body → cta entrance for the homepage `HomeHero` and the
 * `/antenna` `Hero`, replacing their former Framer Motion line-stagger. The h1 is
 * split into lines and wiped up behind an overflow-clip mask for a precise,
 * typographic reveal; the surrounding lines fade-up on the same rhythm as before.
 *
 * Markup contract — inside `scope`, tag the four pieces:
 *   data-reveal="pill" | "title" | "body" | "cta"
 * The "title" element must be the `<h1>` (plain text, no `text-balance`).
 *
 * SSR-safe (all DOM work in useGSAP), hides pre-paint then splits only after fonts
 * load (no FOUC / wrong line breaks), re-splits on resize via autoSplit, and fully
 * degrades for prefers-reduced-motion (static, fully legible headline).
 */
export function useHeroReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope)
      const title = q('[data-reveal="title"]')[0]
      const pill = q('[data-reveal="pill"]')
      const body = q('[data-reveal="body"]')
      const cta = q('[data-reveal="cta"]')
      if (!title) return

      const all = [title, ...pill, ...body, ...cta]

      // Reduced motion: leave the static, fully legible hero exactly as
      // server-rendered — never hide, never split.
      if (window.matchMedia(REDUCE_QUERY).matches) return

      // Hide synchronously. useGSAP runs in a layout effect (pre-paint), so this
      // prevents a flash of the static hero during the async font wait below.
      gsap.set(all, {autoAlpha: 0})

      let split: SplitText | undefined
      let killed = false

      // Split once fonts are ready so line breaks are correct (no reflow
      // mid-reveal). Resolves immediately when fonts are already cached — but
      // race a ~2s timeout so a slow/hanging font load (document.fonts.ready
      // waits on EVERY font in the doc, incl. heavy CJK) can never trap the
      // hero at autoAlpha:0. On timeout we split with whatever's painted now;
      // display:swap then swaps the real glyphs in when they land.
      const fontsReady = Promise.race([
        document.fonts.ready,
        new Promise<void>((resolve) => {
          setTimeout(resolve, 2000)
        }),
      ])

      fontsReady.then(() => {
        if (killed || !scope.current) return

        // User may have toggled reduced-motion during the wait — honour it.
        if (window.matchMedia(REDUCE_QUERY).matches) {
          gsap.set(all, {autoAlpha: 1})
          return
        }

        split = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true, // revert + re-split on width change, syncing progress
          linesClass: "hero-line",
          onSplit(self) {
            // Built fresh on every (re-)split; returning it lets SplitText sync a
            // completed entrance to its end state on resize (no replay).
            const tl = gsap.timeline({defaults: {ease: APPLE}})
            tl.set(title, {autoAlpha: 1}, 0)
              .fromTo(
                pill,
                {autoAlpha: 0, y: 14},
                {autoAlpha: 1, y: 0, duration: 0.7},
                0,
              )
              // Masked lines wipe up from below their clip. CJK collapses to a
              // single line and wipes as one block (intended — see ANIMATION.md).
              .from(
                self.lines,
                {yPercent: 115, duration: 0.9, stagger: 0.09},
                0.1,
              )
              .fromTo(
                body,
                {autoAlpha: 0, y: 14},
                {autoAlpha: 1, y: 0, duration: 0.8},
                0.34,
              )
              .fromTo(
                cta,
                {autoAlpha: 0, y: 14},
                {autoAlpha: 1, y: 0, duration: 0.8},
                0.46,
              )
            return tl
          },
        })
      })

      // useGSAP reverts its own context on unmount, but the split is created
      // asynchronously (outside that sync context), so revert it explicitly.
      return () => {
        killed = true
        split?.revert()
      }
    },
    {scope},
  )
}
