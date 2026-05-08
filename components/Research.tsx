"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

type Paper = {
  date: string
  title: string
  venue: string
  href: string
}

const papers: Paper[] = [
  {
    date: "2026.01.15",
    title: "Pinching Antenna Systems for Indoor mmWave",
    venue: "PREPRINT",
    href: "#",
  },
  {
    date: "2025.11.02",
    title: "AI-Native Beam Activation on Dielectric Waveguides",
    venue: "IEEE TWC",
    href: "#",
  },
  {
    date: "2025.09.20",
    title: "Generative Topology Search for Reconfigurable RF Surfaces",
    venue: "NEURIPS WORKSHOP",
    href: "#",
  },
  {
    date: "2025.06.11",
    title: "Joint Sensing & Communication on Pinching Apertures",
    venue: "IEEE JSAC",
    href: "#",
  },
  {
    date: "2025.03.04",
    title: "On the Capacity of On-Demand Line-of-Sight Channels",
    venue: "ARXIV",
    href: "#",
  },
]

export default function Research() {
  return (
    <section id="research" className="relative py-28 md:py-40 border-t border-border/80">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12 gap-y-12">
          {/* Left: header */}
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/70" />
              03 / Research
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-tight">
              We <span className="italic">publish</span>
              <br />
              what we build.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Every product claim sits on a peer-reviewable foundation. Selected work from the YuanXu Lab,
              with collaborators across academia and industry.
            </p>

            <a
              href="#"
              className="underline-sweep mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/85 hover:text-foreground"
            >
              All publications
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Right: list */}
          <div className="col-span-12 md:col-span-7">
            <ul className="border-t border-border/80">
              {papers.map((p, i) => (
                <motion.li
                  key={p.date}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 0.65, 0.3, 1] }}
                  className="border-b border-border/80"
                >
                  <a
                    href={p.href}
                    className="group flex items-center gap-4 px-1 py-5 font-mono text-[12px] md:text-[13px] tracking-[0.04em] text-foreground/90 transition-colors hover:bg-[rgba(255,169,77,0.05)]"
                  >
                    <span className="shrink-0 w-24 text-muted-foreground tabular-nums">{p.date}</span>
                    <span className="hidden md:inline shrink-0 text-border">→</span>
                    <span className="flex-1 truncate text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </span>
                    <span className="hidden md:inline shrink-0 text-[10px] tracking-[0.22em] text-muted-foreground">
                      {p.venue}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
