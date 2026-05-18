"use client"

import dynamic from "next/dynamic"

/**
 * Thin client wrapper that lazily loads GenerativeRFModel with ssr:false.
 * Server components (research/[slug]/page.tsx) can render this mount
 * directly; the WebGL bundle only loads in the browser.
 */
const GenerativeRFModel = dynamic(() => import("./GenerativeRFModel"), {
  ssr: false,
  loading: () => (
    <div className="showcase-inner relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08]">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
        Initializing generator…
      </span>
    </div>
  ),
})

export default function GenerativeRFMount() {
  return <GenerativeRFModel />
}
