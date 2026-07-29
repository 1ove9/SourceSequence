import {ArrowUpRight} from "lucide-react"
import {Link} from "@/i18n/navigation"
import GlassCard from "./GlassCard"
import {resolveIcon} from "./icons"
import {pick} from "@/sanity/lib/locale"
import type {Locale, Solution, SolutionGroup} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: Solution[]
  groups: SolutionGroup[]
  locale: Locale
  variant: "full" | "teaser"
  label: string
  heading: string
  /** teaser only — "查看全部解决方案" link text */
  viewAll?: string
}

export default function SolutionsView({
  items,
  groups,
  locale,
  variant,
  label,
  heading,
  viewAll,
}: Props) {
  if (variant === "teaser") {
    const featured = items.filter((s) => s.isFeatured)
    const shown = featured.length > 0 ? featured : items.slice(0, 6)

    return (
      <section id="solutions" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader label={label} heading={heading} />

          <div className="mobile-card-rail md:grid md:grid-cols-2 lg:grid-cols-3">
            {shown.map((item, idx) => (
              <SolutionCard key={item._id} item={item} idx={idx} locale={locale} />
            ))}
          </div>

          {viewAll && (
            <RevealOnScroll className="mt-10">
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-accent"
              >
                {viewAll}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </RevealOnScroll>
          )}
        </div>
      </section>
    )
  }

  // variant === "full" — grouped layout for the /solutions page
  return (
    <section id="solutions" className="relative pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="space-y-20">
          {groups.map((group) => {
            const groupItems = items.filter((s) => s.group === group.key)
            if (groupItems.length === 0) return null
            const groupTitle = pick(group.titleEn, group.titleZh, locale) ?? ""
            const groupIntro = pick(group.introEn, group.introZh, locale)

            return (
              <div key={group._id}>
                <RevealOnScroll className="mb-10 max-w-3xl">
                  {group.tagline && (
                    <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                      {group.tagline}
                    </div>
                  )}
                  <h2 className="mb-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-foreground">
                    {groupTitle}
                  </h2>
                  {groupIntro && (
                    <p className="text-[15px] leading-[1.65] text-muted-foreground">
                      {groupIntro}
                    </p>
                  )}
                </RevealOnScroll>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {groupItems.map((item, idx) => (
                    <SolutionCard key={item._id} item={item} idx={idx} locale={locale} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SolutionCard({
  item,
  idx,
  locale,
}: {
  item: Solution
  idx: number
  locale: Locale
}) {
  const Icon = resolveIcon(item.cardIcon, item.slug)
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const desc = pick(item.descriptionEn, item.descriptionZh, locale)
  const highlight = pick(item.highlightEn, item.highlightZh, locale)

  return (
    <RevealOnScroll y={24} scale={0.97} delay={idx * 0.05} viewportMargin="-60px">
      <GlassCard
        hover
        className="flex h-full flex-col gap-5 p-7"
        style={{minHeight: 280}}
      >
        <div
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(21,23,28,0.04)",
            border: "1px solid rgba(21,23,28,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 24px rgba(224,168,154,0.10)",
          }}
        >
          <Icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-[21px] leading-[1.2] tracking-[-0.01em] text-foreground">
            {title}
          </h3>
          {item.tagline && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {item.tagline}
            </span>
          )}
        </div>

        {desc && (
          <p className="text-[14px] leading-relaxed text-muted-foreground">{desc}</p>
        )}

        {highlight && (
          <p className="mt-auto flex gap-2 border-t border-[var(--hairline)] pt-4 text-[13px] leading-relaxed text-foreground/70">
            <span
              aria-hidden
              className="mt-[7px] block h-1 w-1 shrink-0 rounded-full bg-accent/70"
            />
            {highlight}
          </p>
        )}
      </GlassCard>
    </RevealOnScroll>
  )
}
