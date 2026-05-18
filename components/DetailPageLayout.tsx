"use client"

import type {ReactNode} from "react"
import Image from "next/image"
import {motion} from "framer-motion"
import {ArrowLeft, ArrowUpRight} from "lucide-react"
import GlassCard from "./GlassCard"
import RevealOnScroll from "./RevealOnScroll"
import {Link} from "@/i18n/navigation"
import {urlFor} from "@/sanity/lib/image"
import {pick} from "@/sanity/lib/locale"
import {cn} from "@/lib/utils"
import type {
  DetailConcept,
  DetailSection,
  Locale,
  SanityImageRef,
} from "@/sanity/lib/types"

export interface DetailPageData {
  code?: string
  titleEn: string
  titleZh: string
  subtitleEn?: string
  subtitleZh?: string
  abstractEn?: string
  abstractZh?: string
  heroImage?: SanityImageRef
  sections?: DetailSection[]
  keyConcepts?: DetailConcept[]
  references?: string[]
}

export interface DetailPageLayoutProps {
  data: DetailPageData
  locale: Locale
  backHref: string
  labels: {
    back: string
    keyConcepts: string
    references: string
    cta: string
  }
  /**
   * Optional 3D scene / illustration. When provided, the hero is rendered as
   * a 2-column grid (text left, slot right) and the gradient hero image area
   * below is skipped — the aside slot is the visual lead.
   */
  heroAsideSlot?: ReactNode
  /**
   * Override the bottom CTA destination. Defaults to "/#contact". Pass a
   * deep-link with query string (e.g. "/?service=generative-rf#contact") to
   * pre-fill the inquiry form's service field on arrival.
   */
  ctaHref?: string
}

const APPLE_EASE = [0.4, 0, 0.2, 1] as const

/**
 * Render plain text with inline **bold** markdown. Used inside section
 * bodies so editors can highlight phase names, terms etc. without needing
 * full portable-text.
 */
function renderInlineBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

export default function DetailPageLayout({
  data,
  locale,
  backHref,
  labels,
  heroAsideSlot,
  ctaHref = "/#contact",
}: DetailPageLayoutProps) {
  const title = pick(data.titleEn, data.titleZh, locale) ?? ""
  const subtitle = pick(data.subtitleEn, data.subtitleZh, locale)
  const abstract = pick(data.abstractEn, data.abstractZh, locale)
  const hasAside = Boolean(heroAsideSlot)

  return (
    <div className={cn("mx-auto px-5 pb-32 pt-32 md:px-8", hasAside ? "max-w-6xl" : "max-w-4xl")}>
      {/* Back link — uses initial-animate (not scroll-triggered) */}
      <motion.div
        initial={{opacity: 0, x: -12}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5, ease: APPLE_EASE}}
        className="mb-12"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {labels.back}
        </Link>
      </motion.div>

      {/* Hero — initial-animate. Two-column when an aside slot is provided. */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.05, ease: APPLE_EASE}}
        className="mb-16"
      >
        {hasAside ? (
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              {data.code && (
                <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  {data.code}
                </div>
              )}
              <h1 className="mb-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[16px] leading-[1.65] text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            <div>{heroAsideSlot}</div>
          </div>
        ) : (
          <>
            {data.code && (
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {data.code}
              </div>
            )}
            <h1 className="mb-6 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="max-w-2xl text-[17px] leading-[1.6] text-muted-foreground">
                {subtitle}
              </p>
            )}
          </>
        )}
      </motion.div>

      {/* Hero image — skipped when an aside slot is provided (the slot is the visual lead). */}
      {!hasAside && (
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.12, ease: APPLE_EASE}}
          className="mb-16"
        >
          {data.heroImage?.asset ? (
            <div
              className="relative aspect-[16/9] w-full overflow-hidden"
              style={{borderRadius: 24}}
            >
              <Image
                src={urlFor(data.heroImage).width(1920).height(1080).url()}
                alt={title}
                width={1920}
                height={1080}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="relative aspect-[16/9] w-full overflow-hidden border border-white/[0.06]"
              style={{
                borderRadius: 24,
                background:
                  "linear-gradient(135deg, rgba(77,124,255,0.14), rgba(167,139,250,0.08) 60%, rgba(255,255,255,0.02))",
              }}
              aria-hidden
            />
          )}
        </motion.div>
      )}

      <div className="hairline mb-16" />

      {abstract && (
        <RevealOnScroll className="mb-20" viewportMargin="-60px">
          <div className="border-l-2 border-accent pl-6">
            <p className="text-[16px] leading-[1.8] text-foreground/80">{abstract}</p>
          </div>
        </RevealOnScroll>
      )}

      {data.sections && data.sections.length > 0 && (
        <div className="mb-24 space-y-14">
          {data.sections.map((s, idx) => {
            const heading = pick(s.titleEn, s.titleZh, locale)
            const body = pick(s.contentEn, s.contentZh, locale)
            if (!heading && !body) return null
            return (
              <RevealOnScroll
                key={idx}
                delay={idx * 0.04}
                duration={0.6}
                viewportMargin="-60px"
                className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
                    0{idx + 1}
                  </span>
                  {heading && (
                    <h2 className="mt-2 font-display text-[20px] leading-[1.2] tracking-[-0.01em] text-foreground">
                      {heading}
                    </h2>
                  )}
                </div>
                <div className="md:col-span-8">
                  {body && (
                    <p className="whitespace-pre-line text-[14.5px] leading-[1.75] text-muted-foreground">
                      {renderInlineBold(body)}
                    </p>
                  )}
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      )}

      <div className="hairline mb-16" />

      {data.keyConcepts && data.keyConcepts.length > 0 && (
        <RevealOnScroll as="section" className="mb-24" viewportMargin="-60px">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {labels.keyConcepts}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.keyConcepts.map((c, idx) => {
              const term = pick(c.termEn, c.termZh, locale)
              const def = pick(c.definitionEn, c.definitionZh, locale)
              if (!term && !def) return null
              return (
                <RevealOnScroll
                  key={idx}
                  y={12}
                  delay={idx * 0.06}
                  duration={0.5}
                  viewportMargin="0px"
                >
                  <GlassCard className="flex h-full flex-col gap-2.5 p-5">
                    {term && (
                      <span className="font-mono text-[12px] font-medium tracking-tight text-foreground">
                        {term}
                      </span>
                    )}
                    {def && (
                      <span className="text-[13px] leading-[1.65] text-muted-foreground">
                        {def}
                      </span>
                    )}
                  </GlassCard>
                </RevealOnScroll>
              )
            })}
          </div>
        </RevealOnScroll>
      )}

      <div className="hairline mb-16" />

      {data.references && data.references.length > 0 && (
        <RevealOnScroll as="section" className="mb-24" viewportMargin="-60px">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {labels.references}
          </div>
          <ol className="space-y-4">
            {data.references.map((ref, idx) => (
              <li key={idx} className="flex gap-4">
                <span
                  className="shrink-0 font-mono text-[11px] tabular-nums text-accent"
                  style={{minWidth: "1.75rem"}}
                >
                  [{idx + 1}]
                </span>
                <span className="font-mono text-[12px] leading-[1.7] text-muted-foreground/70">
                  {ref}
                </span>
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      )}

      <RevealOnScroll className="text-center" duration={0.6} viewportMargin="0px">
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
        >
          {labels.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </RevealOnScroll>
    </div>
  )
}
