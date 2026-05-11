"use client"

import {motion} from "framer-motion"
import {Atom, CircuitBoard, Handshake, Boxes} from "lucide-react"
import type {LucideIcon} from "lucide-react"
import {useTranslations} from "next-intl"
import GlassCard from "./GlassCard"

type PracticeKey = "simulation" | "hardware" | "partners" | "aiStack"

type Practice = {
  num: string
  key: PracticeKey
  icon: LucideIcon
}

const practices: Practice[] = [
  {num: "01", key: "simulation", icon: Atom},
  {num: "02", key: "hardware", icon: CircuitBoard},
  {num: "03", key: "partners", icon: Handshake},
  {num: "04", key: "aiStack", icon: Boxes},
]

export default function Lab() {
  const t = useTranslations("lab")

  return (
    <section id="lab" className="relative py-24 md:py-32">
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
          <h2 className="mb-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
            {t("heading")}
          </h2>
          <p className="max-w-xl text-[15px] leading-[1.65] text-muted-foreground">
            {t("intro")}
          </p>
        </motion.div>

        {/* 4 practices in 2x2 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {practices.map((p, idx) => (
            <PracticeCard key={p.key} p={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PracticeCard({p, idx}: {p: Practice; idx: number}) {
  const t = useTranslations("lab")
  const Icon = p.icon

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
        className="flex h-full flex-col gap-5 p-7"
        style={{minHeight: 240}}
      >
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

        <div
          className="font-mono text-[12px] tracking-[0.18em]"
          style={{color: "#4d7cff"}}
        >
          {p.num}.
        </div>

        <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.01em] text-foreground">
          {t(`practices.${p.key}.title`)}
        </h3>

        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          {t(`practices.${p.key}.desc`)}
        </p>

        {/* Footer badge — bottom-right */}
        <div className="mt-auto flex items-center justify-end pt-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
            <span
              className="block h-1 w-1 rounded-full"
              style={{backgroundColor: "#4d7cff"}}
            />
            {t("cardBadge")}
          </span>
        </div>
      </GlassCard>
    </motion.div>
  )
}
