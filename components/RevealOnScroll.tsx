"use client"

import type {ComponentProps} from "react"
import {motion} from "framer-motion"

const APPLE_EASE = [0.4, 0, 0.2, 1] as const

type MotionDivProps = ComponentProps<typeof motion.div>

export interface RevealOnScrollProps extends Omit<MotionDivProps, "initial" | "whileInView" | "viewport" | "transition"> {
  y?: number
  scale?: number
  delay?: number
  duration?: number
  viewportMargin?: string
  once?: boolean
  as?: "div" | "section"
}

/**
 * Standard scroll-reveal wrapper. Replaces the inline framer-motion
 * `whileInView` triplet repeated ~30 times across View components.
 *
 * Defaults: opacity 0→1, y 16→0, once, viewport margin -80px,
 * duration 0.7, apple ease. Override any field via props.
 */
export default function RevealOnScroll({
  y = 16,
  scale,
  delay = 0,
  duration = 0.7,
  viewportMargin = "-80px",
  once = true,
  as = "div",
  ...rest
}: RevealOnScrollProps) {
  const Component = as === "section" ? motion.section : motion.div
  const initial: Record<string, number> = {opacity: 0, y}
  const animate: Record<string, number> = {opacity: 1, y: 0}
  if (scale !== undefined) {
    initial.scale = scale
    animate.scale = 1
  }

  return (
    <Component
      initial={initial}
      whileInView={animate}
      viewport={{once, margin: viewportMargin}}
      transition={{duration, delay, ease: APPLE_EASE}}
      {...rest}
    />
  )
}
