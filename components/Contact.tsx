"use client"

import {Suspense} from "react"
import {motion} from "framer-motion"
import {useTranslations} from "next-intl"
import ContactForm from "./ContactForm"

const DIRECT_CONTACTS = [
  {key: "tech", email: "brucez@sourcesequence.cn"},
  {key: "build", email: "Koi@sourcesequence.cn"},
  {key: "feedback", email: "ruiSong@sourcesequence.cn"},
] as const

export default function Contact() {
  const t = useTranslations("contact")

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
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
            <h2 className="mb-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.03em] text-foreground">
              {t("heading")}
            </h2>
            <p className="max-w-sm text-[14px] leading-[1.7] text-muted-foreground/70">
              {t("intro")}
            </p>

            {/* Direct contacts */}
            <div className="mt-10 max-w-sm border-t border-[var(--hairline)] pt-8">
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {t("directLabel")}
              </div>
              <ul className="space-y-4">
                {DIRECT_CONTACTS.map(({key, email}) => (
                  <li key={key} className="group flex flex-col gap-1">
                    <span className="text-[13px] leading-[1.5] text-muted-foreground/70">
                      {t(`direct.${key}`)}
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex w-fit items-center gap-2 font-mono text-[13px] text-foreground/85 transition-colors hover:text-accent"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/60 transition-colors group-hover:bg-accent" />
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-80px"}}
            transition={{duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1]}}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>

            {/* Address footer */}
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/40">
              {t("address")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
