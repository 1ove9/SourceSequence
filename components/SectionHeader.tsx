"use client"

import {cn} from "@/lib/utils"
import RevealOnScroll from "./RevealOnScroll"

export interface SectionHeaderProps {
  label: string
  heading?: string
  intro?: string
  /** Pass a custom heading size/weight class to override the default display style. */
  headingClassName?: string
  /** Width constraint on the whole block. Default max-w-3xl. */
  containerClassName?: string
  /** Override bottom margin. Default mb-16. */
  marginBottomClassName?: string
}

const DEFAULT_HEADING =
  "font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-foreground"

/**
 * Eyebrow label + big serif heading + optional intro paragraph.
 * Used by Research / Lab / Applications / Careers / DetailPageLayout.
 * Publications only has a label — pass heading={undefined}.
 */
export default function SectionHeader({
  label,
  heading,
  intro,
  headingClassName,
  containerClassName = "max-w-3xl",
  marginBottomClassName = "mb-16",
}: SectionHeaderProps) {
  return (
    <RevealOnScroll className={cn(marginBottomClassName, containerClassName)}>
      <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </div>
      {heading && (
        <h2 className={cn(headingClassName ?? DEFAULT_HEADING, intro && "mb-6")}>
          {heading}
        </h2>
      )}
      {intro && (
        <p className="max-w-xl text-[15px] leading-[1.65] text-muted-foreground">
          {intro}
        </p>
      )}
    </RevealOnScroll>
  )
}
