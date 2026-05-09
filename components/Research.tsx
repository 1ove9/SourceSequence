"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import GlassCard from "./GlassCard"

type Paper = {
  date: string
  title: string
  venue: string
  href: string
}

const papers: Paper[] = [
  { date: "2026.01.15", title: "Pinching Antenna Systems for Indoor mmWave", venue: "PREPRINT", href: "#" },
  { date: "2025.11.02", title: "AI-Native Beam Activation on Dielectric Waveguides", venue: "IEEE TWC", href: "#" },
  { date: "2025.09.20", title: "Generative Topology Search for Reconfigurable RF Surfaces", venue: "NEURIPS WORKSHOP", href: "#" },
  { date: "2025.06.11", title: "Joint Sensing & Communication on Pinching Apertures", venue: "IEEE JSAC", href: "#" },
  { date: "2025.03.04", title: "On the Capacity of On-Demand Line-of-Sight Channels", venue: "ARXIV", href: "#" },
]

export default function Research() {
  return (
    <section id="research" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                03 / Research
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
                We <span className="italic">publish</span>
                <br />
                what we build.
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-[1.65] text-muted-foreground">
                Every product claim sits on a peer-reviewable foundation. Selected work
                from the Source Sequence Lab, with collaborators across academia and industry.
              </p>

              <a
                href="#"
                className="underline-sweep mt-8 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground"
              >
                All publications
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <ul className="flex flex-col gap-3">
              {papers.map((p, i) => (
                <motion.li
                  key={p.date}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <GlassCard hover thin className="overflow-hidden">
                    <a href={p.href} className="group flex items-center gap-4 px-5 py-4">
                      <span className="shrink-0 font-mono text-[12px] tabular-nums tracking-[0.04em] text-muted-foreground">
                        {p.date}
                      </span>
                      <span className="flex-1 truncate text-[14.5px] font-medium text-foreground transition-colors group-hover:text-[#4d7cff]">
                        {p.title}
                      </span>
                      <span className="hidden shrink-0 font-mono text-[10px] tracking-[0.22em] text-muted-foreground md:inline">
                        {p.venue}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4d7cff]" />
                    </a>
                  </GlassCard>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
