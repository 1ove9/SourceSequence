"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import PinchingAntennaModel from "./PinchingAntennaModel"
import SignalFlux from "./SignalFlux"

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

            {/* Hero headline — two-tier hierarchy */}
            <motion.p
              custom={1}
              variants={lineVariants}
              className="mt-7 font-display text-[clamp(1.3rem,3vw,2.2rem)] italic leading-[1.2] tracking-[-0.01em] text-muted-foreground"
            >
              {"AI\u2014Native"}
            </motion.p>
            <h1 className="mt-2 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.025em] text-foreground">
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

            {/* Trusted by */}
            <motion.div
              custom={7}
              variants={lineVariants}
              className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                Trusted by research teams at
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {["IMT-2030", "SOUTHEAST UNIV.", "CICT", "ZTE"].map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center rounded-full px-3 py-[5px] font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground/60"
                    style={{
                      background: "rgba(255,255,255,0.35)",
                      backdropFilter: "blur(8px) saturate(130%)",
                      WebkitBackdropFilter: "blur(8px) saturate(130%)",
                      border: "1px solid rgba(255,255,255,0.45)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.02)",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Mono metadata */}
            <motion.p
              custom={8}
              variants={lineVariants}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80"
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
            {/* Top instrument bar — three-segment layout */}
            <div className="pointer-events-none absolute inset-x-5 top-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
              {/* Left — model ID */}
              <span className="text-foreground">PASS-001</span>
              {/* Center — live indicator */}
              <span className="flex items-center gap-1.5 text-muted-foreground/80">
                <span
                  className="block h-[6px] w-[6px] animate-pulse rounded-full"
                  style={{ backgroundColor: "#34d399" }}
                />
                LIVE
              </span>
              {/* Right — frequency + channel */}
              <span className="text-muted-foreground/80">
                28.0 GHz <span className="text-border">/</span> Ch.2
              </span>
            </div>

            <PinchingAntennaModel />

            {/* Signal flux visualizer — bottom-left */}
            <div className="pointer-events-none absolute bottom-12 left-5 z-10">
              <SignalFlux />
            </div>

            {/* Bottom mono spec line — left-aligned, subdued */}
            <div className="pointer-events-none absolute inset-x-5 bottom-4 z-10 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#9a9a9a" }}>
              Dielectric waveguide · 3 pinches · Drag to inspect
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
