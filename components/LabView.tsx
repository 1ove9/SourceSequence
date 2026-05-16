"use client"

import {ArrowUpRight} from "lucide-react"
import GlassCard from "./GlassCard"
import {Link} from "@/i18n/navigation"
import {resolveIcon} from "./icons"
import {pick} from "@/sanity/lib/locale"
import type {LabCapabilityCard, Locale} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: LabCapabilityCard[]
  locale: Locale
  label: string
  heading: string
  intro: string
  cardBadge: string
  learnMore: string
}

export default function LabView({
  items,
  locale,
  label,
  heading,
  intro,
  cardBadge,
  learnMore,
}: Props) {
  return (
    <section id="lab" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} intro={intro} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((p, idx) => (
            <PracticeCard
              key={p._id}
              item={p}
              idx={idx}
              locale={locale}
              cardBadge={cardBadge}
              learnMore={learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PracticeCard({
  item,
  idx,
  locale,
  cardBadge,
  learnMore,
}: {
  item: LabCapabilityCard
  idx: number
  locale: Locale
  cardBadge: string
  learnMore: string
}) {
  const Icon = resolveIcon(item.cardIcon, item.slug)
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const desc = pick(item.cardDescriptionEn, item.cardDescriptionZh, locale)
  const num = item.order != null ? String(item.order).padStart(2, "0") : ""
  const badge = item.locationTag || cardBadge

  return (
    <RevealOnScroll y={24} scale={0.97} delay={idx * 0.06} viewportMargin="-60px">
      <Link href={`/lab/${item.slug}`} className="group block h-full">
        <GlassCard
          hover
          className="flex h-full flex-col gap-5 p-7 transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{minHeight: 240, cursor: "pointer"}}
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

          {num && (
            <div className="font-mono text-[12px] tracking-[0.18em] text-accent">
              {num}.
            </div>
          )}

          <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.01em] text-foreground">
            {title}
          </h3>

          {desc && (
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">{desc}</p>
          )}

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              <span className="block h-1 w-1 rounded-full bg-accent" />
              {badge}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 transition-colors duration-300 group-hover:text-accent">
              {learnMore}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </GlassCard>
      </Link>
    </RevealOnScroll>
  )
}
