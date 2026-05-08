"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Sol = {
  num: string
  title: string
  tag: string
  desc: string
  illustration: ReactNode
}

function FactorySVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {/* floor grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="20"
          y1={40 + i * 14}
          x2="300"
          y2={40 + i * 14}
          stroke="#222"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={20 + i * 16}
          y1="40"
          x2={20 + i * 16}
          y2="194"
          stroke="#222"
          strokeWidth="0.5"
        />
      ))}
      {/* waveguide rails */}
      <line x1="20" y1="60" x2="300" y2="60" stroke="#ffa94d" strokeWidth="1" />
      <line x1="20" y1="180" x2="300" y2="180" stroke="#ffa94d" strokeWidth="1" strokeOpacity="0.6" />
      {/* pinches */}
      {[80, 160, 240].map((x) => (
        <g key={x}>
          <circle cx={x} cy="60" r="2.5" fill="#ffa94d" />
          <circle cx={x} cy="60" r="14" fill="none" stroke="#ffa94d" strokeOpacity="0.4" />
          <circle cx={x} cy="60" r="26" fill="none" stroke="#ffa94d" strokeOpacity="0.18" />
        </g>
      ))}
      {/* AGV / robots */}
      {[
        [70, 130],
        [150, 150],
        [230, 120],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 7} y={y - 5} width="14" height="10" fill="none" stroke="#5eead4" strokeOpacity="0.6" />
          <line x1={x} y1={y - 5} x2={x} y2="60" stroke="#5eead4" strokeOpacity="0.25" strokeDasharray="2 3" />
        </g>
      ))}
      <text x="20" y="30" fontFamily="ui-monospace, monospace" fontSize="7" fill="#666" letterSpacing="2">
        FACTORY-FLOOR.01
      </text>
    </svg>
  )
}

function XRSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {/* concentric audience */}
      {[40, 70, 100, 130].map((r, i) => (
        <ellipse
          key={r}
          cx="160"
          cy="160"
          rx={r * 1.6}
          ry={r * 0.6}
          fill="none"
          stroke="#666"
          strokeOpacity={0.15 + i * 0.05}
        />
      ))}
      {/* stage waveguide ring */}
      <ellipse cx="160" cy="160" rx="220" ry="80" fill="none" stroke="#ffa94d" strokeOpacity="0.6" />
      {/* pinch antennas around ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const x = 160 + Math.cos(a) * 220
        const y = 160 + Math.sin(a) * 80
        return <circle key={i} cx={x} cy={y} r="2" fill="#ffa94d" />
      })}
      {/* center stage */}
      <rect x="140" y="150" width="40" height="20" fill="none" stroke="#5eead4" strokeOpacity="0.6" />
      <text x="20" y="30" fontFamily="ui-monospace, monospace" fontSize="7" fill="#666" letterSpacing="2">
        ARENA.PINCH.RING
      </text>
    </svg>
  )
}

function TunnelSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {/* tunnel perspective */}
      {Array.from({ length: 8 }).map((_, i) => {
        const t = i / 7
        const x = 20 + t * 280
        const inset = t * 60
        return (
          <rect
            key={i}
            x={20 + inset}
            y={40 + inset * 0.5}
            width={280 - inset * 2}
            height={140 - inset}
            fill="none"
            stroke="#222"
            strokeWidth="0.6"
          />
        )
      })}
      {/* waveguide along ceiling */}
      <line x1="20" y1="50" x2="300" y2="50" stroke="#ffa94d" strokeOpacity="0.7" />
      {[60, 110, 160, 210, 260].map((x) => (
        <g key={x}>
          <circle cx={x} cy="50" r="2" fill="#ffa94d" />
          <line x1={x} y1="52" x2={x} y2={70 + Math.abs(x - 160) * 0.1} stroke="#ffa94d" strokeOpacity="0.3" />
        </g>
      ))}
      <text x="20" y="30" fontFamily="ui-monospace, monospace" fontSize="7" fill="#666" letterSpacing="2">
        TUNNEL.PROFILE
      </text>
    </svg>
  )
}

function HangarSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {/* ground */}
      <line x1="20" y1="190" x2="300" y2="190" stroke="#444" />
      {/* hangar arch (waveguide) */}
      <path d="M30 190 Q160 30 290 190" fill="none" stroke="#ffa94d" />
      {/* pinches along arch */}
      {[
        [80, 130],
        [120, 80],
        [160, 60],
        [200, 80],
        [240, 130],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="2.2" fill="#ffa94d" />
          <line x1={x} y1={y} x2={x} y2={y + 12} stroke="#ffa94d" strokeOpacity="0.4" />
        </g>
      ))}
      {/* eVTOL placeholders */}
      <g stroke="#5eead4" strokeOpacity="0.7" fill="none">
        <circle cx="100" cy="170" r="6" />
        <line x1="94" y1="170" x2="106" y2="170" />
      </g>
      <g stroke="#5eead4" strokeOpacity="0.7" fill="none">
        <circle cx="220" cy="172" r="6" />
        <line x1="214" y1="172" x2="226" y2="172" />
      </g>
      <text x="20" y="30" fontFamily="ui-monospace, monospace" fontSize="7" fill="#666" letterSpacing="2">
        HANGAR.LOW-ALT
      </text>
    </svg>
  )
}

function ResearchSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {/* spectrum bars */}
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.8)) * 80 + Math.abs(Math.sin(i * 0.3)) * 40
        return (
          <line
            key={i}
            x1={30 + i * 6.5}
            y1={170 - h / 2}
            x2={30 + i * 6.5}
            y2={170 + h / 2}
            stroke="#ffa94d"
            strokeOpacity={0.3 + (i % 3) * 0.15}
          />
        )
      })}
      <line x1="20" y1="170" x2="300" y2="170" stroke="#666" strokeOpacity="0.5" />
      <line x1="20" y1="50" x2="300" y2="50" stroke="#666" strokeOpacity="0.2" strokeDasharray="2 4" />
      <text x="20" y="30" fontFamily="ui-monospace, monospace" fontSize="7" fill="#666" letterSpacing="2">
        SPECTRUM.SCOPE
      </text>
      <text x="262" y="30" fontFamily="ui-monospace, monospace" fontSize="7" fill="#666" letterSpacing="2">
        24-71 GHz
      </text>
    </svg>
  )
}

const items: Sol[] = [
  {
    num: "01",
    title: "Smart Factory & Industrial IoT",
    tag: "DETERMINISTIC LATENCY",
    desc: "Per-machine line-of-sight, dynamically rerouted around obstructions. Ultra-reliable mmWave for AGVs, robotics, and dense sensor fabrics — without the dead zones.",
    illustration: <FactorySVG />,
  },
  {
    num: "02",
    title: "Immersive Spaces — XR, Stadiums, Exhibitions",
    tag: "MULTI-USER PINCH",
    desc: "Thousands of concurrent high-bandwidth links delivered as if every seat had its own antenna. PASS rings replace dense small-cell deployments with a single waveguide loop.",
    illustration: <XRSVG />,
  },
  {
    num: "03",
    title: "Tunnels & Underground",
    tag: "LEAKY-WAVE REPLACEMENT",
    desc: "A continuous waveguide takes the place of leaky coax. Coverage is uniform end-to-end, and pinches activate on-demand around moving rolling stock and personnel.",
    illustration: <TunnelSVG />,
  },
  {
    num: "04",
    title: "Low-Altitude Hangars & Vertiports",
    tag: "EVTOL / DRONE LINK",
    desc: "Volumetric coverage for the low-altitude economy. Aircraft-aware beam steering inside hangars and across taxi pads — hand-off without infrastructure proliferation.",
    illustration: <HangarSVG />,
  },
  {
    num: "05",
    title: "Next-Generation Wireless Research",
    tag: "OPEN TESTBED",
    desc: "A reconfigurable PASS testbed for academic and industrial partners exploring 6G channel models, ISAC, and AI-native PHY/MAC stacks.",
    illustration: <ResearchSVG />,
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-28 md:py-40 border-t border-border/80">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-20 md:mb-28 max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/70" />
            02 / Solutions
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight">
            <span className="italic">Where</span> it ships.
          </h2>
        </div>

        <div className="space-y-28 md:space-y-40">
          {items.map((s, idx) => {
            const reverse = idx % 2 === 1
            return (
              <motion.article
                key={s.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 0.65, 0.3, 1] }}
                className={[
                  "grid grid-cols-12 gap-y-8 gap-x-6 md:gap-x-10",
                  "items-center",
                ].join(" ")}
              >
                {/* Text block */}
                <div
                  className={[
                    "col-span-12 md:col-span-5",
                    reverse ? "md:order-2 md:col-start-8" : "md:order-1",
                  ].join(" ")}
                >
                  <div className="font-display text-7xl md:text-8xl text-primary/90 leading-none mb-6">
                    {s.num}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                    {s.tag}
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground mb-6 text-balance">
                    {s.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                    {s.desc}
                  </p>
                </div>

                {/* Illustration block */}
                <div
                  className={[
                    "col-span-12 md:col-span-6",
                    reverse ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7",
                  ].join(" ")}
                >
                  <div className="relative aspect-[16/11] w-full border border-border/70 bg-card/30 p-5 md:p-7">
                    {/* corner ticks */}
                    <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-primary/70" />
                    <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-primary/70" />
                    <span className="absolute left-0 bottom-0 h-2 w-2 border-l border-b border-primary/70" />
                    <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-primary/70" />
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70 mb-3">
                      <span>FIG.S{s.num}</span>
                      <span>{s.tag}</span>
                    </div>
                    <div className="h-[calc(100%-1.5rem)]">{s.illustration}</div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
