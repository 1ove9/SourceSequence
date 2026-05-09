import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Adds the hover lift / brighten interaction */
  hover?: boolean
  /** Use a slimmer glass material (less blur, lighter shadow) */
  thin?: boolean
}

/**
 * Liquid-glass surface used throughout the site.
 * Inspired by iOS 26 — multi-layer inset highlights, deep saturated backdrop blur,
 * generous corner radius, and Apple-standard easing on hover.
 */
export default function GlassCard({
  children,
  hover = false,
  thin = false,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        thin ? "glass-thin" : "glass",
        hover && "glass-hover",
        "rounded-3xl",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
