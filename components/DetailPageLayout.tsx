"use client"

import {motion} from "framer-motion"
import {ArrowLeft, ArrowUpRight} from "lucide-react"
import GlassCard from "./GlassCard"
import {Link} from "@/i18n/navigation"

export interface DetailSection {
  heading: string
  body: string
}

export interface DetailConcept {
  term: string
  def: string
}

export interface DetailPageLayoutProps {
  label: string
  title: string
  subtitle: string
  abstract: string
  sections: DetailSection[]
  concepts: DetailConcept[]
  references: string[]
  backHref: string
  backLabel: string
  keyConcepts: string
  referencesLabel: string
  ctaLabel: string
}

export default function DetailPageLayout({
  label,
  title,
  subtitle,
  abstract,
  sections,
  concepts,
  references,
  backHref,
  backLabel,
  keyConcepts,
  referencesLabel,
  ctaLabel,
}: DetailPageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-32 pt-32 md:px-8">
      {/* Back link */}
      <motion.div
        initial={{opacity: 0, x: -12}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.5, ease: [0.4, 0, 0.2, 1]}}
        className="mb-12"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.05, ease: [0.4, 0, 0.2, 1]}}
        className="mb-16"
      >
        <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {label}
        </div>
        <h1 className="mb-6 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
          {title}
        </h1>
        <p className="max-w-2xl text-[17px] leading-[1.6] text-muted-foreground">
          {subtitle}
        </p>
      </motion.div>

      {/* Divider */}
      <div className="hairline mb-16" />

      {/* Abstract */}
      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-60px"}}
        transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
        className="mb-20"
      >
        <div className="border-l-2 pl-6" style={{borderColor: "#4d7cff"}}>
          <p className="text-[16px] leading-[1.8] text-foreground/80">{abstract}</p>
        </div>
      </motion.div>

      {/* Body sections */}
      <div className="mb-24 space-y-14">
        {sections.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-60px"}}
            transition={{
              duration: 0.6,
              delay: idx * 0.04,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8"
          >
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
                0{idx + 1}
              </span>
              <h2 className="mt-2 font-display text-[20px] leading-[1.2] tracking-[-0.01em] text-foreground">
                {s.heading}
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-[14.5px] leading-[1.75] text-muted-foreground">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="hairline mb-16" />

      {/* Key Concepts */}
      <motion.section
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-60px"}}
        transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
        className="mb-24"
      >
        <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {keyConcepts}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {concepts.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <GlassCard className="flex h-full flex-col gap-2.5 p-5">
                <span className="font-mono text-[12px] font-medium tracking-tight text-foreground">
                  {c.term}
                </span>
                <span className="text-[13px] leading-[1.65] text-muted-foreground">
                  {c.def}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Divider */}
      <div className="hairline mb-16" />

      {/* References */}
      <motion.section
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-60px"}}
        transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
        className="mb-24"
      >
        <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {referencesLabel}
        </div>
        <ol className="space-y-4">
          {references.map((ref, idx) => (
            <li key={idx} className="flex gap-4">
              <span
                className="shrink-0 font-mono text-[11px] tabular-nums"
                style={{color: "#4d7cff", minWidth: "1.75rem"}}
              >
                [{idx + 1}]
              </span>
              <span className="font-mono text-[12px] leading-[1.7] text-muted-foreground/70">
                {ref}
              </span>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.6, ease: [0.4, 0, 0.2, 1]}}
        className="text-center"
      >
        <Link
          href="/#contact"
          className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-[#4d7cff]"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  )
}
