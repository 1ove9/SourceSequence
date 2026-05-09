"use client"

import { useEffect, useRef } from "react"

/**
 * Deep-space background system:
 *  - Layer 2: three large blurred glow orbs (blue / purple / cyan)
 *    at fixed positions with slow scroll parallax
 *  - Layer 1 (base #0a0e1a) and Layer 3 (grain) handled via CSS classes
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
      {/* Blue glow — top left */}
      <div
        data-blob
        data-speed="0.06"
        className="absolute -left-60 -top-40 h-[800px] w-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          opacity: 0.25,
          filter: "blur(150px)",
          willChange: "transform",
        }}
      />
      {/* Purple glow — right middle */}
      <div
        data-blob
        data-speed="0.04"
        className="absolute -right-40 top-[35%] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          opacity: 0.2,
          filter: "blur(150px)",
          willChange: "transform",
        }}
      />
      {/* Cyan glow — bottom left */}
      <div
        data-blob
        data-speed="0.05"
        className="absolute -left-32 top-[130%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          opacity: 0.15,
          filter: "blur(150px)",
          willChange: "transform",
        }}
      />
    </div>
  )
}
