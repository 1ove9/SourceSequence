"use client"

import {motion} from "framer-motion"
import {useTranslations} from "next-intl"

export default function Vision() {
  const t = useTranslations("vision")

  return (
    <section id="vision" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Section label */}
        <motion.div
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-80px"}}
          transition={{duration: 0.6, ease: [0.4, 0, 0.2, 1]}}
          className="mb-12 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          {t("label")}
        </motion.div>

        {/* Main thesis paragraph */}
        <motion.p
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-80px"}}
          transition={{duration: 0.85, ease: [0.4, 0, 0.2, 1]}}
          className="max-w-4xl text-pretty font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.3] tracking-[-0.01em] text-foreground/90"
        >
          {t("body")}
        </motion.p>

        {/* Emphasis quote — italic, larger */}
        <motion.blockquote
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-80px"}}
          transition={{duration: 0.85, delay: 0.15, ease: [0.4, 0, 0.2, 1]}}
          className="mt-16 max-w-5xl text-balance font-display italic text-[clamp(2rem,5vw,3.75rem)] leading-[1.15] tracking-[-0.015em] text-foreground"
        >
          {t("quote")}
        </motion.blockquote>
      </div>
    </section>
  )
}
