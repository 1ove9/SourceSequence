"use client"

import {motion} from "framer-motion"
import {useTranslations} from "next-intl"
import GlassCard from "./GlassCard"

type FactKey = "founded" | "team" | "focus" | "stage"

const factKeys: FactKey[] = ["founded", "team", "focus", "stage"]

export default function About() {
  const t = useTranslations("about")

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          {/* Left: text */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-80px"}}
            transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
            className="col-span-12 md:col-span-7"
          >
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("label")}
            </div>
            <h2 className="mb-8 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              {t("heading")}
            </h2>
            <div className="max-w-xl space-y-5">
              <p className="text-[15px] leading-[1.72] text-muted-foreground">
                {t("para1")}
              </p>
              <p className="text-[15px] leading-[1.72] text-muted-foreground">
                {t("para2")}
              </p>
            </div>
          </motion.div>

          {/* Right: fact cards */}
          <div className="col-span-12 md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {factKeys.map((key, idx) => (
                <motion.div
                  key={key}
                  initial={{opacity: 0, y: 20, scale: 0.97}}
                  whileInView={{opacity: 1, y: 0, scale: 1}}
                  viewport={{once: true, margin: "-60px"}}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <GlassCard
                    hover
                    className="flex h-full flex-col gap-2.5 p-5"
                    style={{minHeight: 110}}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                      {t(`facts.${key}.label`)}
                    </div>
                    <div className="font-display text-[15px] leading-[1.4] text-foreground">
                      {t(`facts.${key}.value`)}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
