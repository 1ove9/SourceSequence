"use client"

import {motion} from "framer-motion"
import {ArrowUpRight} from "lucide-react"
import {useTranslations} from "next-intl"

export default function Publications() {
  const t = useTranslations("publications")

  return (
    <section id="publications" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Header label */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: "-80px"}}
          transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
          className="mb-12"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {t("label")}
          </div>
        </motion.div>

        {/* Spotlight card */}
        <motion.div
          initial={{opacity: 0, y: 28, scale: 0.97}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, margin: "-80px"}}
          transition={{duration: 0.85, ease: [0.4, 0, 0.2, 1]}}
        >
          <div
            className="relative overflow-hidden rounded-[24px] p-8 md:p-14"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(77,124,255,0.4)",
              boxShadow:
                "0 0 60px rgba(77,124,255,0.1), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Top meta */}
            <div
              className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{color: "#4d7cff"}}
            >
              {t("paper.meta")}
            </div>

            {/* Title */}
            <h3 className="mb-6 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-foreground">
              {t("paper.title")}
            </h3>

            {/* Abstract */}
            <p className="mb-10 max-w-2xl text-[15px] leading-[1.72] text-muted-foreground md:text-[16px]">
              {t("paper.abstract")}
            </p>

            {/* CTA link */}
            <a
              href="#"
              className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
              style={{color: "#4d7cff"}}
            >
              {t("paper.cta")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Decorative corner glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(77,124,255,0.18) 0%, transparent 70%)",
                transform: "translate(35%, -35%)",
              }}
            />
          </div>
        </motion.div>

        {/* Coming-soon footnote */}
        <motion.p
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.6, delay: 0.3}}
          className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/40"
        >
          {t("comingSoon")}
        </motion.p>
      </div>
    </section>
  )
}
