"use client"

import {motion} from "framer-motion"
import {useLocale, useTranslations} from "next-intl"
import {cn} from "@/lib/utils"
import {BRAND, type BrandEmailKey} from "@/lib/brand"

const contacts: {key: BrandEmailKey; email: string}[] = (
  Object.keys(BRAND.emails) as BrandEmailKey[]
).map((key) => ({key, email: BRAND.emails[key]}))

export default function Contact() {
  const t = useTranslations("contact")
  const locale = useLocale()
  const isZh = locale === "zh"

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          {/* Left: heading */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-80px"}}
            transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
            className="col-span-12 md:col-span-5"
          >
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("label")}
            </div>
            <h2 className={cn(
              "font-display leading-[0.98] tracking-[-0.03em] text-foreground",
              isZh
                ? "text-5xl md:text-6xl lg:text-7xl"
                : "text-[clamp(3rem,7vw,6rem)]"
            )}>
              {t("heading")}
            </h2>
          </motion.div>

          {/* Right: email list */}
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {contacts.map((c, idx) => (
              <motion.div
                key={c.key}
                initial={{opacity: 0, x: 16}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true, margin: "-40px"}}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.07,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {idx > 0 && <div className="hairline" />}
                <div className="flex items-center justify-between py-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t(`entries.${c.key}`)}
                  </span>
                  <a
                    href={`mailto:${c.email}`}
                    className="font-mono text-[13px] text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {c.email}
                  </a>
                </div>
              </motion.div>
            ))}
            <div className="hairline" />

            {/* Address */}
            <motion.p
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.35}}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/40"
            >
              {t("address")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
