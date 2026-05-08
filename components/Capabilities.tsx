"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Cap = {
  num: string
  title: string
  desc: string
  illustration: ReactNode
}

function WaveguideSVG() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cap-wg-line" x1="0" x2="1">
          <stop offset="0" stopColor="#ffa94d" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffa94d" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffa94d" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="50" x2="200" y2="50" stroke="url(#cap-wg-line)" strokeWidth="1" />
      {/* pinches */}
      {[40, 100, 160].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={50} r="2" fill="#ffa94d" />
          <circle cx={cx} cy={50} r="10" fill="none" stroke="#ffa94d" strokeOpacity="0.5" />
          <circle cx={cx} cy={50} r="20" fill="none" stroke="#ffa94d" strokeOpacity={0.25 - i * 0.05} />
          <line x1={cx} y1={42} x2={cx} y2={32} stroke="#ffa94d" strokeOpacity="0.4" />
        </g>
      ))}
      {/* tick marks */}
      {Array.from({ length: 21 }).map((_, i) => (
        <line
          key={i}
          x1={i * 10}
          y1={48}
          x2={i * 10}
          y2={52}
          stroke="#666"
          strokeOpacity={i % 5 === 0 ? 0.6 : 0.25}
        />
      ))}
    </svg>
  )
}

function AINodeSVG() {
  const nodes: [number, number][] = [
    [40, 30],
    [100, 20],
    [160, 35],
    [55, 70],
    [110, 80],
    [165, 70],
    [100, 50],
  ]
  const edges: [number, number][] = [
    [0, 6],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [0, 1],
    [1, 2],
    [3, 4],
    [4, 5],
  ]
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#ffa94d"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 6 ? 3 : 1.8} fill={i === 6 ? "#ffa94d" : "#f5f5f0"} fillOpacity={i === 6 ? 1 : 0.8} />
          {i === 6 && <circle cx={x} cy={y} r={8} fill="none" stroke="#ffa94d" strokeOpacity="0.4" />}
        </g>
      ))}
    </svg>
  )
}

function GenerativeTopoSVG() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {/* contour rings */}
      {[
        { cx: 70, cy: 50, r: 35 },
        { cx: 70, cy: 50, r: 25 },
        { cx: 70, cy: 50, r: 15 },
        { cx: 130, cy: 50, r: 28 },
        { cx: 130, cy: 50, r: 18 },
        { cx: 130, cy: 50, r: 9 },
      ].map((c, i) => (
        <ellipse
          key={i}
          cx={c.cx}
          cy={c.cy}
          rx={c.r}
          ry={c.r * 0.6}
          fill="none"
          stroke="#ffa94d"
          strokeOpacity={0.18 + (i % 3) * 0.12}
          strokeWidth="0.7"
        />
      ))}
      <line x1="0" y1="50" x2="200" y2="50" stroke="#666" strokeOpacity="0.3" strokeDasharray="2 4" />
      <text
        x="98"
        y="14"
        fontFamily="ui-monospace, monospace"
        fontSize="6"
        fill="#666"
        letterSpacing="2"
      >
        TOPOLOGY.SEARCH
      </text>
    </svg>
  )
}

function ISACSVG() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      <line x1="0" y1="50" x2="200" y2="50" stroke="#ffa94d" strokeOpacity="0.7" />
      {/* up beam */}
      <path
        d="M100,50 L60,5 M100,50 L140,5"
        stroke="#ffa94d"
        strokeOpacity="0.5"
        fill="none"
      />
      <path d="M100,50 L70,5 M100,50 L130,5" stroke="#ffa94d" strokeOpacity="0.25" fill="none" />
      {/* down beam (sense) */}
      <path
        d="M100,50 L60,95 M100,50 L140,95"
        stroke="#5eead4"
        strokeOpacity="0.5"
        fill="none"
      />
      <path d="M100,50 L80,95 M100,50 L120,95" stroke="#5eead4" strokeOpacity="0.25" fill="none" />
      <circle cx="100" cy="50" r="2.5" fill="#ffa94d" />
      <text x="6" y="14" fontFamily="ui-monospace, monospace" fontSize="6" fill="#ffa94d" letterSpacing="2">
        COMMS
      </text>
      <text x="6" y="94" fontFamily="ui-monospace, monospace" fontSize="6" fill="#5eead4" letterSpacing="2">
        SENSE
      </text>
    </svg>
  )
}

const items: Cap[] = [
  {
    num: "01",
    title: "Pinching Antenna Systems",
    desc: "Movable radiation points on low-loss dielectric waveguides. The flagship.",
    illustration: <WaveguideSVG />,
  },
  {
    num: "02",
    title: "AI Control Plane",
    desc: "Real-time activation, beam focusing, and user-aware optimization.",
    illustration: <AINodeSVG />,
  },
  {
    num: "03",
    title: "Generative RF Design",
    desc: "Neural topology search for waveguides, pinches, and metasurfaces.",
    illustration: <GenerativeTopoSVG />,
  },
  {
    num: "04",
    title: "Integrated Sensing & Communication",
    desc: "One aperture, two functions: connect and perceive.",
    illustration: <ISACSVG />,
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Heading */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/70" />
            01 / Capabilities
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight">
            <span className="italic">The stack</span> we own.
          </h2>
        </div>

        {/* List */}
        <ul className="border-t border-border/80">
          {items.map((c, idx) => (
            <motion.li
              key={c.num}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 0.65, 0.3, 1], delay: idx * 0.08 }}
              className="group grid grid-cols-12 gap-x-6 border-b border-border/80 py-10 md:py-14 transition-colors hover:bg-[rgba(255,169,77,0.02)]"
            >
              <div className="col-span-12 md:col-span-1 mb-3 md:mb-0">
                <span className="font-mono text-xs tracking-[0.2em] text-primary">{c.num}.</span>
              </div>

              <div className="col-span-12 md:col-span-6">
                <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
              </div>

              <div className="col-span-12 md:col-span-5 mt-8 md:mt-0 flex items-center md:justify-end">
                <div className="h-28 md:h-32 w-full max-w-md border border-border/60 bg-card/40 px-5 py-4">
                  <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
                    <span>FIG.{c.num}</span>
                    <span>SCHEMATIC</span>
                  </div>
                  <div className="h-[calc(100%-1.25rem)]">{c.illustration}</div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
