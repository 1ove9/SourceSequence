"use client"

import {motion} from "framer-motion"
import {ArrowLeft} from "lucide-react"
import {Link} from "@/i18n/navigation"
import {pick} from "@/sanity/lib/locale"
import type {Locale, ModelShowcaseDetail} from "@/sanity/lib/types"
import RevealOnScroll from "@/components/RevealOnScroll"
import ShowcaseCanvas from "./ShowcaseCanvas"

const APPLE_EASE = [0.4, 0, 0.2, 1] as const

interface Props {
  data: ModelShowcaseDetail
  locale: Locale
  labels: {
    back: string
    interactionHint: string
  }
}

export default function ModelDetailView({data, locale, labels}: Props) {
  const title = pick(data.titleEn, data.titleZh, locale) ?? ""
  const subtitle = pick(data.subtitleEn, data.subtitleZh, locale)
  const description = pick(data.descriptionEn, data.descriptionZh, locale)
  const tags = pick(data.tagsEn, data.tagsZh, locale) ?? []

  return (
    <div className="mx-auto max-w-6xl px-5 pb-32 pt-32 md:px-8">
      {/* Back link */}
      <motion.div
        initial={{opacity: 0, x: -12}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5, ease: APPLE_EASE}}
        className="mb-12"
      >
        <Link
          href="/models"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {labels.back}
        </Link>
      </motion.div>

      {/* Hero text */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.05, ease: APPLE_EASE}}
        className="mb-12"
      >
        {data.code && (
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {data.code}
          </div>
        )}
        <h1 className="mb-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-[17px] leading-[1.6] text-muted-foreground">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Showcase canvas */}
      <motion.div
        initial={{opacity: 0, y: 16}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, delay: 0.12, ease: APPLE_EASE}}
        className="mb-12"
      >
        <ShowcaseCanvas sceneKey={data.sceneKey} />
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/40">
          {labels.interactionHint}
        </p>
      </motion.div>

      {/* Tags */}
      {tags.length > 0 && (
        <RevealOnScroll className="mb-10" viewportMargin="-60px">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      )}

      <div className="hairline mb-12" />

      {/* Description */}
      {description && (
        <RevealOnScroll className="max-w-3xl" viewportMargin="-60px">
          <p className="whitespace-pre-line text-[16px] leading-[1.8] text-foreground/80">
            {description}
          </p>
        </RevealOnScroll>
      )}
    </div>
  )
}
