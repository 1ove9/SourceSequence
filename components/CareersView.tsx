"use client"

import {ArrowRight} from "lucide-react"
import GlassCard from "./GlassCard"
import {pick} from "@/sanity/lib/locale"
import {BRAND} from "@/lib/brand"
import type {JobPosting, Locale} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: JobPosting[]
  locale: Locale
  label: string
  quote: string
  intro: string
  apply: string
}

export default function CareersView({
  items,
  locale,
  label,
  quote,
  intro,
  apply,
}: Props) {
  return (
    <section id="careers" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label={label}
          heading={quote}
          intro={intro}
          headingClassName="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-foreground"
          marginBottomClassName="mb-16"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, idx) => (
            <RoleCard
              key={item._id}
              item={item}
              idx={idx}
              locale={locale}
              apply={apply}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoleCard({
  item,
  idx,
  locale,
  apply,
}: {
  item: JobPosting
  idx: number
  locale: Locale
  apply: string
}) {
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const location = pick(item.locationEn, item.locationZh, locale)
  const desc = pick(item.descriptionEn, item.descriptionZh, locale)
  const email = item.applyEmail || BRAND.emails.careers

  return (
    <RevealOnScroll y={24} scale={0.97} delay={idx * 0.08} viewportMargin="-60px">
      <GlassCard hover className="flex h-full flex-col gap-5 p-7" style={{minHeight: 280}}>
        {location && (
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            {location}
          </div>
        )}

        <h3 className="font-display text-[20px] leading-[1.2] tracking-[-0.01em] text-foreground">
          {title}
        </h3>

        {desc && (
          <p className="flex-1 text-[14px] leading-relaxed text-muted-foreground">
            {desc}
          </p>
        )}

        <a
          href={`mailto:${email}`}
          className="group mt-auto inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          {apply}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </GlassCard>
    </RevealOnScroll>
  )
}
