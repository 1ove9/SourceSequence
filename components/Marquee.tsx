"use client"

const ANTENNA_ITEMS = [
  "PASS",
  "PINCHING ANTENNA SYSTEMS",
  "6G PHYSICAL LAYER",
  "AI-NATIVE RADIO",
  "HANGZHOU",
]

const SEP = " \u00b7 "

function MarqueeTrack({items}: {items: string[]}) {
  const text = items.join(SEP) + SEP
  return (
    <span className="inline-block whitespace-nowrap" aria-hidden>
      {text}
    </span>
  )
}

export default function Marquee({items = ANTENNA_ITEMS}: {items?: string[]}) {
  return (
    <div
      className="relative flex h-8 select-none items-center overflow-hidden border-y border-[var(--hairline)] font-mono text-[11px] uppercase tracking-[0.25em]"
      style={{ color: "rgba(21,23,28,0.25)" }}
      role="marquee"
      aria-label={`Scrolling ticker: ${items.join(", ")}`}
    >
      <div className="animate-marquee flex gap-0">
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
      </div>
    </div>
  )
}
