"use client"

import {useEffect, useState} from "react"
import {cn} from "@/lib/utils"
import ShinyText from "./ShinyText"
import TextPressure from "./TextPressure"

interface Props {
  text: string
  isZh: boolean
}

// Order matters: `leading-*` must come AFTER `text-[...]` because
// tailwind-merge treats them as conflicting in Tailwind v4 (the
// text-{size}/{leading} shorthand rule) and drops whichever came first.
const BASE =
  "select-none whitespace-nowrap font-display italic tracking-[-0.02em] text-canvas-deep pb-[0.15em]"

const TAIL = "leading-[0.95]"

const sizeFor = (isZh: boolean) =>
  isZh ? "text-[clamp(28px,8cqi,90px)]" : "text-[clamp(20px,5.4cqi,64px)]"

/**
 * Big italic signature at the bottom of Footer.
 *
 * - Server-render + initial client paint = plain static text (no hydration
 *   mismatch).
 * - EN branch: TextPressure with Fraunces Italic on capable hover desktop
 *   clients (≥768px). Only the weight axis responds to mouse proximity.
 * - ZH branch: ShinyText overlay — a slow, low-contrast gradient sweep over
 *   the existing Instrument Serif italic. Gated only on reduced-motion
 *   because it's a lightweight CSS-gradient + rAF effect, no hover needed.
 */
export default function FooterSignature({text, isZh}: Props) {
  const [enableEn, setEnableEn] = useState(false)
  const [enableZh, setEnableZh] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const noHover = window.matchMedia("(hover: none)").matches
    const mobile = window.matchMedia("(max-width: 767px)").matches
    // Intentional post-mount enhancement: both setEnable* calls promote
    // the static SSR fallback to the animated variant after we know the
    // device supports it. Static branch never re-renders into itself, so
    // this isn't the cascading-render pattern the rule is trying to catch.
    if (!reduced) {
      // ShinyText is cheap (CSS gradient + a motionValue), so it's safe on
      // touch + mobile. Only block it for explicit reduced-motion users.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnableZh(true)
    }
    if (!reduced && !noHover && !mobile) {
      // TextPressure needs hover + decent CPU — gated tighter.
      setEnableEn(true)
    }
  }, [])

  const cls = cn(BASE, sizeFor(isZh), TAIL)

  // Chinese variant
  if (isZh) {
    // Static fallback for reduced-motion users (and SSR).
    if (!enableZh) {
      return <div className={cls}>{text}</div>
    }
    // ShinyText inherits font-family, italic, font-size, white-space from
    // the wrapper div. The component itself sets WebkitTextFillColor
    // transparent + a gradient background so the text-canvas-deep color
    // we'd normally apply is overridden — we pass it explicitly as `color`
    // instead, with `shineColor` only marginally brighter.
    return (
      <div className={cls}>
        <ShinyText
          text={text}
          speed={8}
          delay={3}
          color="#15171c"
          shineColor="#2d3654"
          spread={120}
          direction="left"
        />
      </div>
    )
  }

  // English variant — static fallback (SSR / mobile / no-hover / reduced).
  if (!enableEn) {
    return <div className={cls}>{text}</div>
  }

  // English desktop with hover + motion ok: TextPressure with Fraunces.
  return (
    <div className="w-full" style={{minHeight: "1.05em"}}>
      <div className="mx-auto w-[85%]">
        <TextPressure
          text={text}
          fontFamily="var(--font-pressure)"
          fontUrl=""
          width={false}
          weight={true}
          italic={false}
          alpha={false}
          flex={false}
          stroke={false}
          scale={false}
          textColor="#15171c"
          minFontSize={28}
          className="!normal-case italic whitespace-nowrap"
        />
      </div>
    </div>
  )
}
