"use client"

import {ArrowUpRight, Sparkles} from "lucide-react"
import GlassCard from "@/components/GlassCard"
import {Link} from "@/i18n/navigation"
import {pick} from "@/sanity/lib/locale"
import type {Locale, ModelShowcaseCard} from "@/sanity/lib/types"
import RevealOnScroll from "@/components/RevealOnScroll"
import SectionHeader from "@/components/SectionHeader"

interface Props {
  items: ModelShowcaseCard[]
  locale: Locale
  label: string
  heading: string
  intro: string
  emptyMessage: string
  viewLabel: string
}

export default function ModelsView({
  items,
  locale,
  label,
  heading,
  intro,
  emptyMessage,
  viewLabel,
}: Props) {
  return (
    <section className="relative pt-32 pb-24 md:pt-36 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} intro={intro} />

        {items.length === 0 ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/40">
            {emptyMessage}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {items.map((item, idx) => (
              <ModelCard
                key={item._id}
                item={item}
                idx={idx}
                locale={locale}
                viewLabel={viewLabel}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ModelCard({
  item,
  idx,
  locale,
  viewLabel,
}: {
  item: ModelShowcaseCard
  idx: number
  locale: Locale
  viewLabel: string
}) {
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const desc = pick(item.cardDescriptionEn, item.cardDescriptionZh, locale)
  const tags = pick(item.tagsEn, item.tagsZh, locale) ?? []
  const num = item.order != null ? String(item.order).padStart(2, "0") : ""

  return (
    <RevealOnScroll y={24} scale={0.97} delay={idx * 0.06} viewportMargin="-60px">
      <Link href={`/models/${item.slug}`} className="group block h-full">
        <GlassCard
          hover
          className="flex h-full flex-col gap-5 p-7 transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{minHeight: 320, cursor: "pointer"}}
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
              <Sparkles className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
            </div>

            {item.isFeatured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
                Featured
              </span>
            )}
          </div>

          {num && (
            <div className="font-mono text-[12px] tracking-[0.18em] text-accent">
              {num}.
            </div>
          )}

          <h3 className="font-display text-[24px] leading-[1.15] tracking-[-0.01em] text-foreground">
            {title}
          </h3>

          {desc && (
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">{desc}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-accent">
            {viewLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </GlassCard>
      </Link>
    </RevealOnScroll>
  )
}
