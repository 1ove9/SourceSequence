"use client"

import {useEffect, useRef} from "react"

/**
 * Signature visualization (option A) — a slowly interfering wavefield rendered
 * as drifting contour lines. Pure <canvas> + rAF, zero dependencies. Evokes a
 * "physical field" for a Physics-Grounded AI company: cold, low-contrast, quiet.
 *
 * - DPR-aware (capped at 2), resizes with its container (ResizeObserver)
 * - Pauses when scrolled offscreen (IntersectionObserver) or the tab is hidden
 * - prefers-reduced-motion → paints a single static frame, no animation loop
 *
 * Colour is neutral cold ink at very low alpha — no saturated blue.
 */
export default function WavefieldCanvas({className}: {className?: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // A field of horizontal contour lines, each rippled by a few drifting sines
    // plus one slowly orbiting radial interference source.
    const LINES = 26
    const STEP = 10
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const gap = (height + 120) / LINES
      const srcX = (0.5 + 0.3 * Math.sin(t * 0.0001)) * width
      const srcY = 0.5 * height
      for (let i = 0; i < LINES; i++) {
        const baseY = -60 + i * gap
        const ny = i / LINES
        ctx.beginPath()
        for (let x = -20; x <= width + 20; x += STEP) {
          const nx = x / Math.max(width, 1)
          const wave =
            Math.sin(nx * 7 + t * 0.0003 + ny * 3) * 10 +
            Math.sin(nx * 13 - t * 0.0002 + ny * 6) * 6 +
            Math.sin(Math.hypot(x - srcX, baseY - srcY) * 0.02 - t * 0.0006) * 8
          const y = baseY + wave
          if (x === -20) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        // cold ink, very low alpha; slightly stronger through the middle band
        const a = 0.05 + 0.03 * Math.sin(ny * Math.PI)
        ctx.strokeStyle = `rgba(21, 23, 28, ${a})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    resize()

    if (reduced) {
      draw(0)
      const ro = new ResizeObserver(() => {
        resize()
        draw(0)
      })
      ro.observe(canvas)
      return () => ro.disconnect()
    }

    let raf = 0
    let running = false
    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      {threshold: 0},
    )
    io.observe(canvas)

    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVis)

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
