"use client"

import { motion } from "framer-motion"
import { Antenna, Brain, Sparkles, Radar } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import GlassCard from "./GlassCard"

type Cap = {
  num: string
  title: string
  desc: string
  icon: LucideIcon
  /** Tailwind gradient utility for the icon-tile background */
  tint: string
}

const items: Cap[] = [
  {
    num: "01",
    title: "Pinching Antenna Systems",
    desc: "Movable radiation points on low-loss dielectric waveguides. The flagship.",
    icon: Antenna,
    tint: "from-[#ffe4d0] to-[#ffd0b0]",
  },
  {
    num: "02",
    title: "AI Control Plane",
    desc: "Real-time activation, beam focusing, and user-aware optimization.",
    icon: Brain,
    tint: "from-[#d8e4ff] to-[#bcd0ff]",
  },
  {
    num: "03",
    title: "Generative RF Design",
    desc: "Neural topology search for waveguides, pinches, and metasurfaces.",
    icon: Sparkles,
    tint: "from-[#ffe0e8] to-[#ffd0dc]",
  },
  {
    num: "04",
    title: "Integrated Sensing & Communication",
    desc: "One aperture, two functions: connect and perceive.",
    icon: Radar,
    tint: "from-[#e0f0e4] to-[#cce4d2]",
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            01 / Capabilities
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
            <span className="italic">The stack</span> we own.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, idx) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <GlassCard
                  hover
                  className="flex h-full flex-col gap-6 p-7"
                  style={{ minHeight: 320 }}
                >
                  {/* Icon tile */}
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.tint}`}
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <div
                    className="font-mono text-[12px] tracking-[0.18em]"
                    style={{ color: "var(--primary)" }}
                  >
                    {c.num}.
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.01em] text-foreground">
                    {c.title}
                  </h3>

                  {/* Desc */}
                  <p className="mt-auto text-[14.5px] leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
