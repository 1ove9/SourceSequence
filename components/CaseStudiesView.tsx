"use client"

import {ArrowUpRight, Github} from "lucide-react"
import {Link} from "@/i18n/navigation"
import GlassCard from "./GlassCard"
import {resolveIcon} from "./icons"
import {pick} from "@/sanity/lib/locale"
import type {CaseStudy, Locale} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: CaseStudy[]
  locale: Locale
  label: string
  heading: string
  learnMore: string
  githubLabel: string
}

export default function CaseStudiesView({
  items,
  locale,
  label,
  heading,
  learnMore,
  githubLabel,
}: Props) {
  const flagship = items.filter((c) => c.isFlagship)
  const rest = items.filter((c) => !c.isFlagship)

  return (
    <section id="cases" className="section-dark relative isolate py-24 md:py-32">
      {/* Top-edge fade — bridges the light canvas above into the dark band so
          there's no hard L210→L14 cut. var(--bg-base) is NOT flipped by
          .section-dark, so it's the light page colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{background: "linear-gradient(to bottom, var(--bg-base), transparent)"}}
      />
      {/* Ambient light pool behind the heading — lifts the slab from flat black
          (L~13) to a soft L~26 falloff so the band breathes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 8%, rgba(130, 150, 190, 0.14) 0%, rgba(130, 150, 190, 0) 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} />

        <div className="space-y-5">
          {flagship.map((item, idx) => (
            <CaseCard
              key={item._id}
              item={item}
              idx={idx}
              locale={locale}
              learnMore={learnMore}
              githubLabel={githubLabel}
              fullWidth
            />
          ))}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {rest.map((item, idx) => (
                <CaseCard
                  key={item._id}
                  item={item}
                  idx={flagship.length + idx}
                  locale={locale}
                  learnMore={learnMore}
                  githubLabel={githubLabel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CaseCard({
  item,
  idx,
  locale,
  learnMore,
  githubLabel,
  fullWidth = false,
}: {
  item: CaseStudy
  idx: number
  locale: Locale
  learnMore: string
  githubLabel: string
  fullWidth?: boolean
}) {
  const Icon = resolveIcon(item.cardIcon, item.slug)
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const tag = pick(item.tagEn, item.tagZh, locale)
  const desc = pick(item.descriptionEn, item.descriptionZh, locale)

  return (
    <RevealOnScroll y={24} scale={0.98} delay={idx * 0.06} viewportMargin="-60px">
      <GlassCard
        hover
        className={[
          "flex h-full flex-col gap-5 p-7",
          fullWidth ? "md:flex-row md:items-center md:gap-10 md:p-9" : "",
        ].join(" ")}
        style={{minHeight: fullWidth ? 200 : 260}}
      >
        <div className={fullWidth ? "flex items-start gap-5 md:max-w-md" : ""}>
          <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 24px rgba(224,168,154,0.10)",
            }}
          >
            <Icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
          </div>
          {fullWidth && (
            <div className="flex flex-col gap-1.5">
              {tag && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {tag}
                </span>
              )}
              <h3 className="font-display text-[26px] leading-[1.1] tracking-display text-foreground">
                {title}
              </h3>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {!fullWidth && (
            <div className="flex flex-col gap-1.5">
              {tag && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {tag}
                </span>
              )}
              <h3 className="font-display text-[22px] leading-[1.15] tracking-display text-foreground">
                {title}
              </h3>
            </div>
          )}

          {desc && (
            <p className="text-[14.5px] leading-relaxed text-muted-foreground">{desc}</p>
          )}

          {(item.href || item.externalUrl) && (
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              {item.href && (
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-accent"
                >
                  {learnMore}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
              {item.externalUrl && (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-accent"
                >
                  <Github className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {githubLabel}
                </a>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    </RevealOnScroll>
  )
}
