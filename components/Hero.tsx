"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import PinchingAntennaModel from "./PinchingAntennaModel"

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
}

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-8 gap-y-16 px-5 md:px-8">
        {/* LEFT — text */}
        <div className="col-span-12 lg:col-span-7">
          <motion.div initial="hidden" animate="show">
            {/* Pill — research preview */}
            <motion.div custom={0} variants={lineVariants}>
              <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
                <span
                  aria-hidden
                  className="text-[14px] leading-none"
                  style={{ color: "var(--primary)" }}
                >
                  ⊹
                </span>
                Now in research preview
              </span>
            </motion.div>

            {/* Hero headline */}
            <h1 className="mt-7 font-display text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-[-0.02em] text-foreground">
              <motion.span custom={1} variants={lineVariants} className="block italic">
                AI-Native
              </motion.span>
              <motion.span custom={2} variants={lineVariants} className="block">
                Pinching Antenna
              </motion.span>
              <motion.span custom={3} variants={lineVariants} className="block">
                Systems<span style={{ color: "var(--primary)" }}>.</span>
              </motion.span>
            </h1>

            {/* Engineering metadata pills */}
            <motion.div
              custom={4}
              variants={lineVariants}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              {[
                "FREQUENCY \u00b7 28 GHz mmWave",
                "LATENCY \u00b7 Sub-millisecond",
                "COVERAGE \u00b7 Reconfigurable in real time",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[11.5px] tracking-[0.04em] text-muted-foreground"
                  style={{
                    background: "rgba(255,255,255,0.4)",
                    backdropFilter: "blur(12px) saturate(140%)",
                    WebkitBackdropFilter: "blur(12px) saturate(140%)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(0,0,0,0.03)",
                  }}
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Body copy */}
            <motion.p
              custom={5}
              variants={lineVariants}
              className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[1.6]"
            >
              We build movable radiation points along low-loss dielectric waveguides,
              controlled in real time by AI. On-demand line-of-sight, in any space, at the
              speed of an agent.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={6}
              variants={lineVariants}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#whitepaper"
                className="btn-amber group inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-[14px] font-semibold"
              >
                Read the Whitepaper
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="glass-pill inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-[14px] font-semibold text-foreground transition-all duration-300 hover:[background:rgba(255,255,255,0.85)]"
              >
                Request a Demo
              </a>
            </motion.div>

            {/* Mono metadata */}
            <motion.p
              custom={7}
              variants={lineVariants}
              className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80"
            >
              v0.1 <span className="mx-2 text-border">·</span> Research Preview
              <span className="mx-2 text-border">·</span> Shanghai
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT — 3D showcase */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.4, 0, 0.2, 1] as const,
            }}
            className="glass showcase-inner relative aspect-square w-full overflow-hidden"
            style={{ borderRadius: 32 }}
          >
            {/* Top corner instrument label */}
            <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              <span
                className="block h-1.5 w-1.5 rounded-full pulse-dot"
                style={{ background: "var(--primary)" }}
              />
              PASS-001 <span className="text-border">/</span> LIVE
            </div>
            <div className="pointer-events-none absolute right-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              28.0 GHz
            </div>

            <PinchingAntennaModel />

            {/* Bottom mono spec line */}
            <div className="pointer-events-none absolute inset-x-5 bottom-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              <span>Dielectric waveguide · 3 pinches</span>
              <span>Drag to inspect</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
