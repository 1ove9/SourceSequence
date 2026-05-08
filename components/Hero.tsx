"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import WaveguideCanvas from "./WaveguideCanvas"

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.7,
      ease: [0.22, 0.65, 0.3, 1] as const,
    },
  }),
}

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Canvas background */}
      <div className="absolute inset-0 z-0">
        <WaveguideCanvas />
      </div>

      {/* Slow scan line */}
      <div className="scanline" aria-hidden />

      {/* Faint grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f5f0 1px, transparent 1px), linear-gradient(to bottom, #f5f5f0 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 30%, transparent 75%)",
        }}
      />

      {/* Corner instrument metadata */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-5 top-20 md:left-10 md:top-24 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
          YUANXU
          <span className="mx-2 text-border">//</span>
          02.01.2026
        </div>

        <div className="absolute right-5 top-20 md:right-10 md:top-24 font-mono text-[10px] tracking-[0.2em] text-muted-foreground text-right">
          v0.1
          <span className="mx-2 text-border">—</span>
          RESEARCH PREVIEW
        </div>

        <div className="absolute left-5 bottom-6 md:left-10 md:bottom-10 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
          N 31.2304°
          <span className="mx-2 text-border">/</span>
          E 121.4737°
        </div>

        <div className="absolute right-5 bottom-6 md:right-10 md:bottom-10 font-mono text-[10px] tracking-[0.2em] text-muted-foreground flex items-center gap-2 justify-end">
          <span className="block h-1.5 w-1.5 rounded-full bg-primary pulse-dot shadow-[0_0_10px_rgba(255,169,77,0.8)]" />
          SIGNAL <span className="text-border">//</span> ACTIVE
        </div>
      </div>

      {/* Hero content — left aligned */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 md:px-10">
        <motion.div initial="hidden" animate="show" className="max-w-4xl">
          <motion.div
            custom={0}
            variants={lineVariants}
            className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
          >
            <span className="h-px w-8 bg-primary/70" />
            00 / Index
          </motion.div>

          <h1 className="font-display leading-[0.95] tracking-tight text-foreground text-[clamp(3rem,9vw,9rem)]">
            <motion.span custom={1} variants={lineVariants} className="block italic">
              AI-Native
            </motion.span>
            <motion.span custom={2} variants={lineVariants} className="block">
              Pinching Antenna
            </motion.span>
            <motion.span custom={3} variants={lineVariants} className="block">
              Systems<span className="text-primary">.</span>
            </motion.span>
          </h1>

          <motion.p
            custom={4}
            variants={lineVariants}
            className="mt-8 font-mono text-[11px] md:text-xs uppercase tracking-[0.32em] text-muted-foreground"
          >
            Commercializing the 6G Physical-Layer Frontier
          </motion.p>

          <motion.p
            custom={5}
            variants={lineVariants}
            className="mt-6 max-w-2xl text-pretty text-base md:text-lg leading-relaxed text-foreground/80"
          >
            We build movable radiation points along low-loss dielectric waveguides, controlled in real time by
            AI. On-demand line-of-sight, in any space, at the speed of an agent.
          </motion.p>

          <motion.div
            custom={6}
            variants={lineVariants}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <a
              href="#whitepaper"
              className="group inline-flex items-center gap-3 border border-primary/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              Read the Whitepaper
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="underline-sweep font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/85 hover:text-foreground"
            >
              Request a Demo
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom edge fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background z-[5]" />
    </section>
  )
}
