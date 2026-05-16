"use client"

import {motion} from "framer-motion"
import {ArrowUpRight} from "lucide-react"
import {pick} from "@/sanity/lib/locale"
import type {Locale, Publication} from "@/sanity/lib/types"
import RevealOnScroll from "./RevealOnScroll"

interface Props {
  items: Publication[]
  locale: Locale
  label: string
  cta: string
  comingSoon: string
}

export default function PublicationsView({
  items,
  locale,
  label,
  cta,
  comingSoon,
}: Props) {
  const featured = items.find((p) => p.isFeatured)
  const others = items.filter((p) => !p.isFeatured)

  return (
    <section id="publications" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <RevealOnScroll className="mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {label}
          </div>
        </RevealOnScroll>

        {featured && <Spotlight item={featured} locale={locale} cta={cta} />}

        {others.length > 0 && (
          <div className="mt-12 space-y-2">
            {others.map((p, idx) => (
              <PublicationRow key={p._id} item={p} idx={idx} locale={locale} />
            ))}
          </div>
        )}

        {!featured && others.length === 0 && (
          <motion.p
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 0.3}}
            className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/40"
          >
            {comingSoon}
          </motion.p>
        )}
      </div>
    </section>
  )
}

function Spotlight({
  item,
  locale,
  cta,
}: {
  item: Publication
  locale: Locale
  cta: string
}) {
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const summary = pick(item.summaryEn, item.summaryZh, locale)
  const meta = [item.date, item.type].filter(Boolean).join(" · ")
  const linkProps = item.externalUrl
    ? {href: item.externalUrl, target: "_blank", rel: "noreferrer"}
    : {href: "#"}

  return (
    <RevealOnScroll y={28} scale={0.97} duration={0.85}>
      <div
        className="relative overflow-hidden rounded-[24px] border border-accent/40 bg-white/[0.04] p-8 md:p-14"
        style={{
          boxShadow:
            "0 0 60px rgba(77,124,255,0.1), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {meta && (
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {meta}
          </div>
        )}

        <h3 className="mb-6 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-foreground">
          {title}
        </h3>

        {summary && (
          <p className="mb-10 max-w-2xl text-[15px] leading-[1.72] text-muted-foreground md:text-[16px]">
            {summary}
          </p>
        )}

        <a
          {...linkProps}
          className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(77,124,255,0.18) 0%, transparent 70%)",
            transform: "translate(35%, -35%)",
          }}
        />
      </div>
    </RevealOnScroll>
  )
}

function PublicationRow({
  item,
  idx,
  locale,
}: {
  item: Publication
  idx: number
  locale: Locale
}) {
  const title = pick(item.titleEn, item.titleZh, locale) ?? ""
  const meta = [item.date, item.type].filter(Boolean).join(" · ")
  const content = (
    <>
      <div className="flex min-w-0 flex-col gap-1">
        {meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            {meta}
          </span>
        )}
        <span className="truncate text-[15px] text-foreground/85">{title}</span>
      </div>
      {item.externalUrl && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
      )}
    </>
  )

  return (
    <RevealOnScroll y={8} delay={idx * 0.04} duration={0.5} viewportMargin="0px">
      {item.externalUrl ? (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-6 border-b border-white/[0.06] py-5 transition-colors hover:border-white/20"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center justify-between gap-6 border-b border-white/[0.06] py-5">
          {content}
        </div>
      )}
    </RevealOnScroll>
  )
}
