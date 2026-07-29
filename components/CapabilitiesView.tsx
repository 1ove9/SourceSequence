"use client"

import Link from "next/link"
import GlassCard from "./GlassCard"
import {resolveIcon} from "./icons"
import {pick} from "@/sanity/lib/locale"
import type {Capability, Locale} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: Capability[]
  locale: Locale
  label: string
  heading: string
}

function CardInner({item, locale, num}: {item: Capability; locale: Locale; num: string}) {
  const Icon = resolveIcon(item.cardIcon, item.slug)
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const desc = pick(item.descriptionEn, item.descriptionZh, locale)

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(21,23,28,0.04)",
            border: "1px solid rgba(21,23,28,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 24px rgba(224,168,154,0.10)",
          }}
        >
          <Icon className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
        </div>
        {num && (
          <div className="font-mono text-[12px] tracking-[0.18em] text-accent">
            {num}.
          </div>
        )}
      </div>

      {item.tagline && (
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70">
          {item.tagline}
        </div>
      )}

      <h3 className="font-display text-[24px] leading-[1.15] tracking-[-0.01em] text-foreground">
        {title}
      </h3>

      {desc && (
        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          {desc}
        </p>
      )}
    </>
  )
}

export default function CapabilitiesView({items, locale, label, heading}: Props) {
  return (
    <section id="capabilities" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, idx) => {
            const num = item.order != null ? String(item.order).padStart(2, "0") : ""

            return (
              <RevealOnScroll
                key={item._id}
                y={24}
                scale={0.97}
                delay={idx * 0.06}
                viewportMargin="-60px"
              >
                {item.href ? (
                  <Link href={item.href} className="block h-full">
                    <GlassCard
                      hover
                      className="flex h-full flex-col gap-6 p-7"
                      style={{minHeight: 320}}
                    >
                      <CardInner item={item} locale={locale} num={num} />
                    </GlassCard>
                  </Link>
                ) : (
                  <GlassCard
                    hover
                    className="flex h-full flex-col gap-6 p-7"
                    style={{minHeight: 320}}
                  >
                    <CardInner item={item} locale={locale} num={num} />
                  </GlassCard>
                )}
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
