"use client"

import {motion} from "framer-motion"
import {ArrowRight} from "lucide-react"
import {useTranslations} from "next-intl"
import GlassCard from "./GlassCard"

type RoleKey = "rfEngineer" | "aiResearcher" | "frontendEngineer"

const roleKeys: RoleKey[] = ["rfEngineer", "aiResearcher", "frontendEngineer"]

export default function Careers() {
  const t = useTranslations("careers")

  return (
    <section id="careers" className="relative py-24 md:py-32">
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
          <h2 className="mb-7 font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
            {t("quote")}
          </h2>
          <p className="max-w-xl text-[15px] leading-[1.72] text-muted-foreground">
            {t("intro")}
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {roleKeys.map((key, idx) => (
            <RoleCard key={key} roleKey={key} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoleCard({roleKey, idx}: {roleKey: RoleKey; idx: number}) {
  const t = useTranslations("careers")

  return (
    <motion.div
      initial={{opacity: 0, y: 24, scale: 0.97}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, margin: "-60px"}}
      transition={{duration: 0.7, delay: idx * 0.08, ease: [0.4, 0, 0.2, 1]}}
    >
      <GlassCard hover className="flex h-full flex-col gap-5 p-7" style={{minHeight: 280}}>
        {/* Location badge */}
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
          {t(`roles.${roleKey}.location`)}
        </div>

        {/* Title */}
        <h3 className="font-display text-[20px] leading-[1.2] tracking-[-0.01em] text-foreground">
          {t(`roles.${roleKey}.title`)}
        </h3>

        {/* Description */}
        <p className="flex-1 text-[14px] leading-relaxed text-muted-foreground">
          {t(`roles.${roleKey}.desc`)}
        </p>

        {/* Apply */}
        <a
          href="mailto:careers@yuanxu.tech"
          className="group mt-auto inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
          style={{color: "#4d7cff"}}
        >
          {t("apply")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </GlassCard>
    </motion.div>
  )
}
