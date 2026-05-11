"use client"

import {motion} from "framer-motion"
import {
  Antenna,
  Brain,
  Sparkles,
  Radar,
  Network,
  ArrowUpRight,
} from "lucide-react"
import type {LucideIcon} from "lucide-react"
import {useTranslations} from "next-intl"
import GlassCard from "./GlassCard"

type DirectionKey = "pass" | "control" | "generative" | "isac" | "aircomp"

type Direction = {
  num: string
  key: DirectionKey
  icon: LucideIcon
  horizon?: boolean
}

const directions: Direction[] = [
  {num: "01", key: "pass", icon: Antenna},
  {num: "02", key: "control", icon: Brain},
  {num: "03", key: "generative", icon: Sparkles},
  {num: "04", key: "isac", icon: Radar},
  {num: "05", key: "aircomp", icon: Network, horizon: true},
]

export default function Research() {
  const t = useTranslations("research")

  return (
    <section id="research" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-80px"}}
          transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {t("label")}
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
            {t("heading")}
          </h2>
        </motion.div>

        {/* 2x2 grid for current research lines */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {directions.slice(0, 4).map((d, idx) => (
            <DirectionCard key={d.key} d={d} idx={idx} />
          ))}
        </div>

        {/* Full-width long-horizon card */}
        <div className="mt-5">
          <DirectionCard d={directions[4]} idx={4} fullWidth />
        </div>
      </div>
    </section>
  )
}

function DirectionCard({
  d,
  idx,
  fullWidth = false,
}: {
  d: Direction
  idx: number
  fullWidth?: boolean
}) {
  const t = useTranslations("research")
  const Icon = d.icon

  return (
    <motion.div
      initial={{opacity: 0, y: 24, scale: 0.97}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, margin: "-60px"}}
      transition={{
        duration: 0.7,
        delay: idx * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <GlassCard
        hover
        className="flex h-full flex-col gap-6 p-7"
        style={{minHeight: fullWidth ? 240 : 320}}
      >
        {/* Top row: icon tile + optional horizon badge */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 24px rgba(77,124,255,0.13)",
            }}
          >
            <Icon className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
          </div>

          {d.horizon && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{
                background: "rgba(77,124,255,0.08)",
                border: "1px solid rgba(77,124,255,0.2)",
                color: "#4d7cff",
              }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{backgroundColor: "#4d7cff"}}
              />
              {t("horizonBadge")}
            </span>
          )}
        </div>

        {/* Number */}
        <div
          className="font-mono text-[12px] tracking-[0.18em]"
          style={{color: "#4d7cff"}}
        >
          {d.num}.
        </div>

        {/* Title */}
        <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.01em] text-foreground">
          {t(`directions.${d.key}.title`)}
        </h3>

        {/* Description */}
        <p
          className={[
            "text-[14.5px] leading-relaxed text-muted-foreground",
            fullWidth ? "max-w-3xl" : "",
          ].join(" ")}
        >
          {t(`directions.${d.key}.desc`)}
        </p>

        {/* Footer thread link */}
        <a
          href="#"
          className="group/link mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-[#4d7cff]"
        >
          {t("thread")}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </GlassCard>
    </motion.div>
  )
}
