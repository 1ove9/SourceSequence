"use client"

import Image from "next/image"
import {motion} from "framer-motion"
import {urlFor} from "@/sanity/lib/image"
import type {Locale, Partner} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"

interface Props {
  items: Partner[]
  locale: Locale
  label: string
  heading: string
}

const APPLE_EASE = [0.4, 0, 0.2, 1] as const

export default function TrustedByView({items, label, heading}: Props) {
  return (
    <section
      id="trusted-by"
      aria-label={label}
      className="relative border-t border-white/[0.04] py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <RevealOnScroll className="mb-10 text-center" duration={0.6}>
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/60">
            {label}
          </div>
          <p className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] leading-[1.4] tracking-[-0.01em] text-muted-foreground">
            {heading}
          </p>
        </RevealOnScroll>

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {items.map((p, i) => (
            <motion.li
              key={p._id}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: "-60px"}}
              transition={{
                duration: 0.5,
                delay: 0.04 + i * 0.05,
                ease: APPLE_EASE,
              }}
              className="flex items-center"
            >
              <PartnerLogo partner={p} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function PartnerLogo({partner}: {partner: Partner}) {
  const monochrome = partner.monochrome !== false // default true
  const logoUrl = urlFor(partner.logo).width(320).height(120).fit("max").url()

  const imgClasses = [
    "h-9 w-auto object-contain transition-all duration-300 md:h-10",
    monochrome
      ? "opacity-50 brightness-0 invert hover:opacity-100 hover:brightness-100 hover:invert-0"
      : "opacity-70 hover:opacity-100",
  ].join(" ")

  const img = (
    <Image
      src={logoUrl}
      alt={partner.name}
      width={160}
      height={40}
      className={imgClasses}
    />
  )

  if (partner.website) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noreferrer"
        title={partner.name}
        className="inline-flex"
      >
        {img}
      </a>
    )
  }
  return img
}
