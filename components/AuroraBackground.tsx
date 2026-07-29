"use client"

import {useEffect, useRef} from "react"

/**
 * Global ambient background — a cold blue-grey misty base with oversized,
 * extremely soft radial halos arranged as a cold↔warm diagonal (Noomo-style).
 * Pure CSS, zero deps.
 *
 * Almost all of the page's "color" comes from here, not from controls. The poles
 * are deliberately on a diagonal so the field reads as "light from upper-right"
 * volume rather than a flat cool wash:
 *   - Top-left:       cold blue-violet halo (cool pole)
 *   - Right / lower:  warm peach halo (warm pole — strong enough to push r−b > 0)
 *   - Bottom-left:    deeper cool-grey pool — darkens one corner to widen the
 *                     luminance range so the haze isn't all one mid-grey
 *   - Bottom-centre:  faint cold-white lift under the central stage
 *
 * The halos drift with an almost-imperceptible scroll parallax; disabled under
 * prefers-reduced-motion. Sits at -z-10 so all content stays crisp above it.
 */
export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // Extremely small parallax — barely perceptible on purpose.
        el.style.setProperty("--py", `${window.scrollY * 0.02}px`)
      })
    }
    window.addEventListener("scroll", onScroll, {passive: true})
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(58% 48% at 18% calc(14% + var(--py, 0px)), rgba(193, 200, 240, 0.62) 0%, rgba(193, 200, 240, 0) 60%),
            radial-gradient(52% 50% at 88% calc(58% - var(--py, 0px)), rgba(233, 178, 156, 0.58) 0%, rgba(233, 178, 156, 0) 60%),
            radial-gradient(46% 44% at 8% calc(96% + var(--py, 0px)), rgba(150, 162, 192, 0.42) 0%, rgba(150, 162, 192, 0) 62%),
            radial-gradient(70% 52% at 50% calc(102% + var(--py, 0px)), rgba(228, 234, 245, 0.40) 0%, rgba(228, 234, 245, 0) 70%),
            var(--bg-base)
          `,
        }}
      />
    </div>
  )
}
