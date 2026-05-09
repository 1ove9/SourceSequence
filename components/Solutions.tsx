"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import GlassCard from "./GlassCard"

type Sol = {
  num: string
  title: string
  tag: string
  desc: string
  illustration: ReactNode
}

/* ---------- Illustrations (dark variant — blue lines on near-invisible grid) ---------- */

function FactorySVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h${i}`} x1="20" y1={40 + i * 14} x2="300" y2={40 + i * 14} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={20 + i * 16} y1="40" x2={20 + i * 16} y2="194" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      <line x1="20" y1="60" x2="300" y2="60" stroke="#4d7cff" strokeWidth="1.2" />
      <line x1="20" y1="180" x2="300" y2="180" stroke="#4d7cff" strokeWidth="1.2" strokeOpacity="0.4" />
      {[80, 160, 240].map((x) => (
        <g key={x}>
          <circle cx={x} cy="60" r="3" fill="#4d7cff" />
          <circle cx={x} cy="60" r="14" fill="none" stroke="#4d7cff" strokeOpacity="0.4" />
          <circle cx={x} cy="60" r="26" fill="none" stroke="#4d7cff" strokeOpacity="0.15" />
        </g>
      ))}
      {[
        [70, 130],
        [150, 150],
        [230, 120],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 7} y={y - 5} width="14" height="10" fill="none" stroke="#a78bfa" strokeWidth="1" />
          <line x1={x} y1={y - 5} x2={x} y2="60" stroke="#a78bfa" strokeOpacity="0.3" strokeDasharray="2 3" />
        </g>
      ))}
    </svg>
  )
}

function XRSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {[40, 70, 100, 130].map((r, i) => (
        <ellipse key={r} cx="160" cy="160" rx={r * 1.6} ry={r * 0.6} fill="none" stroke="rgba(255,255,255,0.06)" strokeOpacity={0.25 + i * 0.08} />
      ))}
      <ellipse cx="160" cy="160" rx="220" ry="80" fill="none" stroke="#4d7cff" strokeWidth="1.3" />
      {[
        [380, 160], [350.5, 200.0], [270.3, 229.3], [160, 240],
        [49.7, 229.3], [-30.5, 200.0], [-60, 160], [-30.5, 120.0],
        [49.7, 90.7], [160, 80], [270.3, 90.7], [350.5, 120.0],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.4" fill="#4d7cff" />
      ))}
      <rect x="140" y="150" width="40" height="20" fill="none" stroke="#a78bfa" strokeWidth="1" />
    </svg>
  )
}

function TunnelSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => {
        const t = i / 7
        const inset = t * 60
        return (
          <rect key={i} x={20 + inset} y={40 + inset * 0.5} width={280 - inset * 2} height={140 - inset} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
        )
      })}
      <line x1="20" y1="50" x2="300" y2="50" stroke="#4d7cff" strokeWidth="1.3" />
      {[60, 110, 160, 210, 260].map((x) => (
        <g key={x}>
          <circle cx={x} cy="50" r="2.4" fill="#4d7cff" />
          <line x1={x} y1="52" x2={x} y2={70 + Math.abs(x - 160) * 0.1} stroke="#4d7cff" strokeOpacity="0.3" />
        </g>
      ))}
    </svg>
  )
}

function HangarSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.12)" />
      <path d="M30 190 Q160 30 290 190" fill="none" stroke="#4d7cff" strokeWidth="1.3" />
      {[
        [80, 130],
        [120, 80],
        [160, 60],
        [200, 80],
        [240, 130],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="2.6" fill="#4d7cff" />
          <line x1={x} y1={y} x2={x} y2={y + 12} stroke="#4d7cff" strokeOpacity="0.35" />
        </g>
      ))}
      <g stroke="#a78bfa" strokeWidth="1" fill="none">
        <circle cx="100" cy="170" r="6" />
        <line x1="94" y1="170" x2="106" y2="170" />
      </g>
      <g stroke="#a78bfa" strokeWidth="1" fill="none">
        <circle cx="220" cy="172" r="6" />
        <line x1="214" y1="172" x2="226" y2="172" />
      </g>
    </svg>
  )
}

function ResearchSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.8)) * 80 + Math.abs(Math.sin(i * 0.3)) * 40
        return (
          <line key={i} x1={30 + i * 6.5} y1={170 - h / 2} x2={30 + i * 6.5} y2={170 + h / 2} stroke="#4d7cff" strokeOpacity={0.3 + (i % 3) * 0.15} />
        )
      })}
      <line x1="20" y1="170" x2="300" y2="170" stroke="rgba(255,255,255,0.1)" />
      <line x1="20" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
    </svg>
  )
}

const items: Sol[] = [
  {
    num: "01",
    title: "Smart Factory & Industrial IoT",
    tag: "Deterministic latency",
    desc: "Per-machine line-of-sight, dynamically rerouted around obstructions. Ultra-reliable mmWave for AGVs, robotics, and dense sensor fabrics — without the dead zones.",
    illustration: <FactorySVG />,
  },
  {
    num: "02",
    title: "Immersive Spaces — XR, Stadiums, Exhibitions",
    tag: "Multi-user pinch",
    desc: "Thousands of concurrent high-bandwidth links delivered as if every seat had its own antenna. PASS rings replace dense small-cell deployments with a single waveguide loop.",
    illustration: <XRSVG />,
  },
  {
    num: "03",
    title: "Tunnels & Underground",
    tag: "Leaky-wave replacement",
    desc: "A continuous waveguide takes the place of leaky coax. Coverage is uniform end-to-end, and pinches activate on-demand around moving rolling stock and personnel.",
    illustration: <TunnelSVG />,
  },
  {
    num: "04",
    title: "Low-Altitude Hangars & Vertiports",
    tag: "eVTOL / drone link",
    desc: "Volumetric coverage for the low-altitude economy. Aircraft-aware beam steering inside hangars and across taxi pads — hand-off without infrastructure proliferation.",
    illustration: <HangarSVG />,
  },
  {
    num: "05",
    title: "Next-Generation Wireless Research",
    tag: "Open testbed",
    desc: "A reconfigurable PASS testbed for academic and industrial partners exploring 6G channel models, ISAC, and AI-native PHY/MAC stacks.",
    illustration: <ResearchSVG />,
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            02 / Solutions
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
            <span className="italic">Where</span> it ships.
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-24">
          {items.map((s, idx) => {
            const reverse = idx % 2 === 1
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              >
                <GlassCard className="overflow-hidden p-6 md:p-10" style={{ minHeight: 400 }}>
                  <div className="grid grid-cols-12 items-center gap-x-8 gap-y-8">
                    <div className={["col-span-12 md:col-span-5", reverse ? "md:order-2" : "md:order-1"].join(" ")}>
                      <div
                        className="glass-thin relative aspect-[4/3] w-full overflow-hidden p-5"
                        style={{ borderRadius: 20 }}
                      >
                        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
                          <span>FIG. S{s.num}</span>
                          <span style={{ color: "#4d7cff" }}>{s.tag}</span>
                        </div>
                        <div className="h-[calc(100%-1.75rem)]">{s.illustration}</div>
                      </div>
                    </div>

                    <div className={["col-span-12 md:col-span-7", reverse ? "md:order-1" : "md:order-2"].join(" ")}>
                      <div className="font-display text-[64px] md:text-[80px] leading-none mb-3" style={{ color: "#4d7cff" }}>
                        {s.num}
                      </div>
                      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                        {s.tag}
                      </div>
                      <h3 className="mb-5 max-w-xl text-balance font-display text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.01em] text-foreground">
                        {s.title}
                      </h3>
                      <p className="max-w-xl text-[15px] md:text-[16px] leading-[1.65] text-muted-foreground">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
