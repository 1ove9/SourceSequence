"use client"

import {ArrowUpRight} from "lucide-react"
import GlassCard from "./GlassCard"
import {Link} from "@/i18n/navigation"
import {resolveIcon} from "./icons"
import {pick} from "@/sanity/lib/locale"
import type {Locale, ResearchTopicCard} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: ResearchTopicCard[]
  locale: Locale
  label: string
  heading: string
  horizonBadge: string
  learnMore: string
}

export default function ResearchView({
  items,
  locale,
  label,
  heading,
  horizonBadge,
  learnMore,
}: Props) {
  const regular = items.filter((d) => !d.isLongHorizon)
  const longHorizon = items.filter((d) => d.isLongHorizon)

  return (
    <section id="research" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {regular.map((d, idx) => (
            <DirectionCard
              key={d._id}
              item={d}
              idx={idx}
              locale={locale}
              learnMore={learnMore}
              horizonBadge={horizonBadge}
            />
          ))}
        </div>

        {longHorizon.map((d, idx) => (
          <div key={d._id} className="mt-5">
            <DirectionCard
              item={d}
              idx={regular.length + idx}
              locale={locale}
              learnMore={learnMore}
              horizonBadge={horizonBadge}
              fullWidth
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function DirectionCard({
  item,
  idx,
  locale,
  learnMore,
  horizonBadge,
  fullWidth = false,
}: {
  item: ResearchTopicCard
  idx: number
  locale: Locale
  learnMore: string
  horizonBadge: string
  fullWidth?: boolean
}) {
  const Icon = resolveIcon(item.cardIcon, item.slug)
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const desc = pick(item.cardDescriptionEn, item.cardDescriptionZh, locale)
  const num = item.order != null ? String(item.order).padStart(2, "0") : ""

  return (
    <RevealOnScroll y={24} scale={0.97} delay={idx * 0.06} viewportMargin="-60px">
      <Link href={`/research/${item.slug}`} className="group block h-full">
        <GlassCard
          hover
          className="flex h-full flex-col gap-6 p-7 transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{minHeight: fullWidth ? 240 : 320, cursor: "pointer"}}
        >
          <div className="flex items-start justify-between gap-4">
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

            {item.isLongHorizon && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent"
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
                {horizonBadge}
              </span>
            )}
          </div>

          {num && (
            <div className="font-mono text-[12px] tracking-[0.18em] text-accent">
              {num}.
            </div>
          )}

          <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.01em] text-foreground">
            {title}
          </h3>

          {desc && (
            <p
              className={[
                "text-[14.5px] leading-relaxed text-muted-foreground",
                fullWidth ? "max-w-3xl" : "",
              ].join(" ")}
            >
              {desc}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-accent">
            {learnMore}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </GlassCard>
      </Link>
    </RevealOnScroll>
  )
}
