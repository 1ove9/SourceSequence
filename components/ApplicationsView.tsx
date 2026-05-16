"use client"

import type {ReactNode} from "react"
import {ArrowUpRight} from "lucide-react"
import GlassCard from "./GlassCard"
import {Link} from "@/i18n/navigation"
import {pick} from "@/sanity/lib/locale"
import type {ApplicationCard, Locale} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"
import SectionHeader from "./SectionHeader"

interface Props {
  items: ApplicationCard[]
  locale: Locale
  label: string
  heading: string
  learnMore: string
}

function FactorySVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {Array.from({length: 12}).map((_, i) => (
        <line key={`h${i}`} x1="20" y1={40 + i * 14} x2="300" y2={40 + i * 14} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      {Array.from({length: 18}).map((_, i) => (
        <line key={`v${i}`} x1={20 + i * 16} y1="40" x2={20 + i * 16} y2="194" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      ))}
      <line x1="20" y1="60" x2="300" y2="60" stroke="#4d7cff" strokeWidth="1.2" />
      <line x1="20" y1="180" x2="300" y2="180" stroke="#4d7cff" strokeWidth="1.2" strokeOpacity="0.4" />
      {[80, 160, 240].map((x) => (
        <g key={x}>
          <circle cx={x} cy="60" r="3" fill="#4d7cff" />
          <circle cx={x} cy="60" r="14" fill="none" stroke="#4d7cff" strokeOpacity="0.4" />
          <circle cx={x} cy="60" r="26" fill="none" stroke="#4d7cff" strokeOpacity="0.15" />
        </g>
      ))}
      {[[70, 130], [150, 150], [230, 120]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 7} y={y - 5} width="14" height="10" fill="none" stroke="#a78bfa" strokeWidth="1" />
          <line x1={x} y1={y - 5} x2={x} y2="60" stroke="#a78bfa" strokeOpacity="0.3" strokeDasharray="2 3" />
        </g>
      ))}
    </svg>
  )
}

function ImmersiveSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {[40, 70, 100, 130].map((r, i) => (
        <ellipse key={r} cx="160" cy="160" rx={r * 1.6} ry={r * 0.6} fill="none" stroke="rgba(255,255,255,0.06)" strokeOpacity={0.25 + i * 0.08} />
      ))}
      <ellipse cx="160" cy="160" rx="220" ry="80" fill="none" stroke="#4d7cff" strokeWidth="1.3" />
      {[
        [380, 160], [350.5, 200.0], [270.3, 229.3], [160, 240],
        [49.7, 229.3], [-30.5, 200.0], [-60, 160], [-30.5, 120.0],
        [49.7, 90.7], [160, 80], [270.3, 90.7], [350.5, 120.0],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.4" fill="#4d7cff" />
      ))}
      <rect x="140" y="150" width="40" height="20" fill="none" stroke="#a78bfa" strokeWidth="1" />
    </svg>
  )
}

function HangarSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.12)" />
      <path d="M30 190 Q160 30 290 190" fill="none" stroke="#4d7cff" strokeWidth="1.3" />
      {[[80, 130], [120, 80], [160, 60], [200, 80], [240, 130]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="2.6" fill="#4d7cff" />
          <line x1={x} y1={y} x2={x} y2={y + 12} stroke="#4d7cff" strokeOpacity="0.35" />
        </g>
      ))}
      <g stroke="#a78bfa" strokeWidth="1" fill="none">
        <circle cx="100" cy="170" r="6" />
        <line x1="94" y1="170" x2="106" y2="170" />
      </g>
      <g stroke="#a78bfa" strokeWidth="1" fill="none">
        <circle cx="220" cy="172" r="6" />
        <line x1="214" y1="172" x2="226" y2="172" />
      </g>
    </svg>
  )
}

function GenericSVG() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      {[40, 70, 100, 130].map((r, i) => (
        <circle key={r} cx="160" cy="110" r={r} fill="none" stroke="#4d7cff" strokeOpacity={0.1 + i * 0.05} />
      ))}
      <circle cx="160" cy="110" r="4" fill="#4d7cff" />
    </svg>
  )
}

const SVG_BY_SLUG: Record<string, () => ReactNode> = {
  "smart-factory": FactorySVG,
  "immersive-spaces": ImmersiveSVG,
  "low-altitude-vertiports": HangarSVG,
}

export default function ApplicationsView({
  items,
  locale,
  label,
  heading,
  learnMore,
}: Props) {
  return (
    <section id="applications" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader label={label} heading={heading} />

        <div className="space-y-8">
          {items.map((item, idx) => (
            <ScenarioCard
              key={item._id}
              item={item}
              idx={idx}
              locale={locale}
              learnMore={learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ScenarioCard({
  item,
  idx,
  locale,
  learnMore,
}: {
  item: ApplicationCard
  idx: number
  locale: Locale
  learnMore: string
}) {
  const reverse = idx % 2 === 1
  const SvgComponent = SVG_BY_SLUG[item.slug] || GenericSVG
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const desc = pick(item.cardDescriptionEn, item.cardDescriptionZh, locale)
  const figLabel = pick(item.figureLabelEn, item.figureLabelZh, locale)
  const num = item.order != null ? String(item.order).padStart(2, "0") : ""
  const figNum = item.figureNumber || (num ? `FIG. ${num}` : "")

  return (
    <RevealOnScroll y={24} scale={0.97} delay={idx * 0.05} duration={0.75}>
      <Link href={`/applications/${item.slug}`} className="group block">
        <GlassCard
          hover
          className="overflow-hidden p-6 transition-transform duration-300 group-hover:-translate-y-0.5 md:p-10"
          style={{minHeight: 320, cursor: "pointer"}}
        >
          <div className="grid grid-cols-12 items-center gap-x-8 gap-y-8">
            <div
              className={[
                "col-span-12 md:col-span-5",
                reverse ? "md:order-2" : "md:order-1",
              ].join(" ")}
            >
              <div
                className="glass-thin relative aspect-[4/3] w-full overflow-hidden p-5"
                style={{borderRadius: 20}}
              >
                <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
                  {figNum && <span>{figNum}</span>}
                  {figLabel && <span className="text-accent">{figLabel}</span>}
                </div>
                <div className="h-[calc(100%-1.75rem)]">
                  <SvgComponent />
                </div>
              </div>
            </div>

            <div
              className={[
                "col-span-12 md:col-span-7",
                reverse ? "md:order-1" : "md:order-2",
              ].join(" ")}
            >
              {num && (
                <div className="mb-3 font-display text-[64px] leading-none text-accent md:text-[80px]">
                  {num}
                </div>
              )}
              <h3 className="mb-5 max-w-xl font-display text-[26px] leading-[1.1] tracking-[-0.01em] text-foreground md:text-[36px]">
                {title}
              </h3>
              {desc && (
                <p className="max-w-xl text-[15px] leading-[1.65] text-muted-foreground md:text-[16px]">
                  {desc}
                </p>
              )}

              <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/50 transition-colors duration-300 group-hover:text-accent">
                {learnMore}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
    </RevealOnScroll>
  )
}
