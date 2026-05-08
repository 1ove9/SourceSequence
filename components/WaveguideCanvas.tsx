"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  size: number
  life: number
}

type DriftParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

type Pinch = {
  x: number
  y: number
  age: number // ms since born
  duration: number // total ms
  intensity: number
}

const AMBER = "255, 169, 77"
const AMBER_DIM = "255, 169, 77"

export default function WaveguideCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const stateRef = useRef<{
    width: number
    height: number
    dpr: number
    waveguideY: number
    particles: Particle[]
    drift: DriftParticle[]
    pinches: Pinch[]
    lastSpawn: number
    lastPinch: number
    lastFrame: number
    isMobile: boolean
    visible: boolean
  }>({
    width: 0,
    height: 0,
    dpr: 1,
    waveguideY: 0,
    particles: [],
    drift: [],
    pinches: [],
    lastSpawn: 0,
    lastPinch: 0,
    lastFrame: 0,
    isMobile: false,
    visible: true,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const s = stateRef.current

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      s.dpr = Math.min(window.devicePixelRatio || 1, 2)
      s.width = rect.width
      s.height = rect.height
      s.isMobile = rect.width < 768
      s.waveguideY = rect.height * 0.58
      canvas.width = Math.floor(rect.width * s.dpr)
      canvas.height = Math.floor(rect.height * s.dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)

      // Seed drifting background particles based on size
      const targetDrift = s.isMobile ? 24 : 60
      s.drift = Array.from({ length: targetDrift }, () => spawnDrift(s.width, s.height))
    }

    const spawnDrift = (w: number, h: number): DriftParticle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
      size: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.35 + 0.05,
    })

    const spawnParticle = (now: number) => {
      const baseRate = s.isMobile ? 90 : 45 // ms between spawns
      if (now - s.lastSpawn < baseRate) return
      s.lastSpawn = now
      s.particles.push({
        x: -10,
        y: s.waveguideY + (Math.random() - 0.5) * 1.4,
        vx: 0.9 + Math.random() * 0.6, // px per frame baseline (scaled by dt)
        size: Math.random() * 1.4 + 0.6,
        life: 0,
      })
    }

    const spawnPinch = (now: number) => {
      const cooldown = 2000 + Math.random() * 2000 // 2-4s
      if (now - s.lastPinch < cooldown) return
      if (s.pinches.length >= 3) return
      s.lastPinch = now
      const margin = s.width * 0.1
      s.pinches.push({
        x: margin + Math.random() * (s.width - margin * 2),
        y: s.waveguideY,
        age: 0,
        duration: 2600,
        intensity: 0.85 + Math.random() * 0.15,
      })
    }

    const draw = (now: number) => {
      const dt = Math.min(40, now - (s.lastFrame || now))
      s.lastFrame = now
      const dtScale = dt / 16.6667 // normalized to 60fps

      // Clear
      ctx.clearRect(0, 0, s.width, s.height)

      // ---------- Background drift particles ----------
      for (const d of s.drift) {
        d.x += d.vx * dtScale
        d.y += d.vy * dtScale
        if (d.x < -5) d.x = s.width + 5
        if (d.x > s.width + 5) d.x = -5
        if (d.y < -5) d.y = s.height + 5
        if (d.y > s.height + 5) d.y = -5

        ctx.beginPath()
        ctx.fillStyle = `rgba(245, 245, 240, ${d.alpha})`
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // ---------- Waveguide line ----------
      const wgY = s.waveguideY
      // Soft outer glow
      const glow = ctx.createLinearGradient(0, wgY - 30, 0, wgY + 30)
      glow.addColorStop(0, `rgba(${AMBER}, 0)`)
      glow.addColorStop(0.5, `rgba(${AMBER}, 0.06)`)
      glow.addColorStop(1, `rgba(${AMBER}, 0)`)
      ctx.fillStyle = glow
      ctx.fillRect(0, wgY - 30, s.width, 60)

      // The waveguide itself
      const lineGrad = ctx.createLinearGradient(0, 0, s.width, 0)
      lineGrad.addColorStop(0, `rgba(${AMBER}, 0)`)
      lineGrad.addColorStop(0.08, `rgba(${AMBER}, 0.55)`)
      lineGrad.addColorStop(0.5, `rgba(${AMBER}, 0.85)`)
      lineGrad.addColorStop(0.92, `rgba(${AMBER}, 0.55)`)
      lineGrad.addColorStop(1, `rgba(${AMBER}, 0)`)
      ctx.strokeStyle = lineGrad
      ctx.lineWidth = 1
      ctx.shadowColor = `rgba(${AMBER}, 0.6)`
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.moveTo(0, wgY)
      ctx.lineTo(s.width, wgY)
      ctx.stroke()
      ctx.shadowBlur = 0

      // ---------- Signal particles ----------
      spawnParticle(now)
      const speed = s.width / 6 / 60 // cross full width in ~6s @60fps
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i]
        p.x += p.vx * speed * dtScale * 4
        p.life += dt
        // gentle vertical jitter
        p.y = wgY + Math.sin((p.life + p.x) * 0.02) * 0.6

        const alpha = Math.min(1, p.life / 200) * Math.min(1, (s.width - p.x) / 80)

        ctx.beginPath()
        ctx.fillStyle = `rgba(${AMBER}, ${alpha * 0.95})`
        ctx.shadowColor = `rgba(${AMBER}, 0.8)`
        ctx.shadowBlur = 6
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        if (p.x > s.width + 20) s.particles.splice(i, 1)
      }

      // ---------- Pinch points + radial waves ----------
      spawnPinch(now)
      for (let i = s.pinches.length - 1; i >= 0; i--) {
        const pinch = s.pinches[i]
        pinch.age += dt
        const t = pinch.age / pinch.duration

        if (t >= 1) {
          s.pinches.splice(i, 1)
          continue
        }

        // Pinch core dot — bright at start, settles
        const coreAlpha = t < 0.15 ? t / 0.15 : Math.max(0, 1 - (t - 0.15) / 0.85)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${AMBER}, ${coreAlpha * pinch.intensity})`
        ctx.shadowColor = `rgba(${AMBER}, 1)`
        ctx.shadowBlur = 14
        ctx.arc(pinch.x, pinch.y, 2.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Radial rings (3 staggered)
        for (let r = 0; r < 3; r++) {
          const ringT = t - r * 0.18
          if (ringT < 0 || ringT > 1) continue
          const radius = ringT * (s.isMobile ? 110 : 180)
          const ringAlpha = (1 - ringT) * 0.45 * pinch.intensity
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${AMBER_DIM}, ${ringAlpha})`
          ctx.lineWidth = 1
          // ellipse (slightly squashed vertically — radio lobe feel)
          ctx.ellipse(pinch.x, pinch.y, radius, radius * 0.78, 0, 0, Math.PI * 2)
          ctx.stroke()
        }

        // small vertical "antenna" tick mark
        if (t < 0.4) {
          const tickAlpha = (1 - t / 0.4) * 0.5
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${AMBER}, ${tickAlpha})`
          ctx.lineWidth = 1
          ctx.moveTo(pinch.x, pinch.y - 8)
          ctx.lineTo(pinch.x, pinch.y - 18)
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const start = () => {
      if (rafRef.current != null) return
      s.lastFrame = performance.now()
      rafRef.current = requestAnimationFrame(draw)
    }

    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    resize()
    start()

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const io = new IntersectionObserver(
      ([entry]) => {
        s.visible = entry.isIntersecting
        if (entry.isIntersecting && document.visibilityState === "visible") {
          start()
        } else {
          stop()
        }
      },
      { threshold: 0.01 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.visibilityState === "visible" && s.visible) start()
      else stop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  )
}
