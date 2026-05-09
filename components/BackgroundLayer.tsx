"use client"

import { useEffect, useRef } from "react"

/**
 * Page background system:
 *  - Layer 1: warm light gradient (handled via .bg-canvas on parent)
 *  - Layer 2: large blurred ambient color blobs at fixed positions, with slow scroll parallax
 *  - Layer 3: ultra-fine grain (handled via .bg-grain on parent)
 *
 * The blobs are absolutely positioned, blurred, and translateY-shifted in response to scroll
 * via rAF-throttled scroll listener. They sit behind every section but above the gradient.
 */
export default function BackgroundLayer() {
  const layerRef = useRef<HTMLDivElement | null>(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    const apply = () => {
      const y = window.scrollY
      const el = layerRef.current
      if (!el) return
      const blobs = el.querySelectorAll<HTMLDivElement>("[data-blob]")
      blobs.forEach((b, i) => {
        const speed = parseFloat(b.dataset.speed ?? "0.05")
        // direction alternates so blobs feel independent
        const dir = i % 2 === 0 ? 1 : -1
        b.style.transform = `translate3d(0, ${y * speed * dir}px, 0)`
      })
      tickingRef.current = false
    }

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Warm peach blob — top right */}
      <div
        data-blob
        data-speed="0.06"
        className="absolute -right-40 -top-32 h-[640px] w-[640px] rounded-full"
        style={{
          background: "var(--blob-warm)",
          opacity: 0.55,
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      {/* Cool blue blob — left middle */}
      <div
        data-blob
        data-speed="0.04"
        className="absolute -left-40 top-[40%] h-[720px] w-[720px] rounded-full"
        style={{
          background: "var(--blob-cool)",
          opacity: 0.5,
          filter: "blur(140px)",
          willChange: "transform",
        }}
      />
      {/* Soft pink blob — bottom right */}
      <div
        data-blob
        data-speed="0.05"
        className="absolute right-[10%] top-[120%] h-[560px] w-[560px] rounded-full"
        style={{
          background: "var(--blob-pink)",
          opacity: 0.45,
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      {/* Warm peach blob #2 — far down */}
      <div
        data-blob
        data-speed="0.03"
        className="absolute -left-20 top-[200%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "var(--blob-warm)",
          opacity: 0.4,
          filter: "blur(140px)",
          willChange: "transform",
        }}
      />
    </div>
  )
}
