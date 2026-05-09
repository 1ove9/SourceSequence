"use client"

const ITEMS = [
  "PASS",
  "PINCHING ANTENNA SYSTEMS",
  "6G PHYSICAL LAYER",
  "AI-NATIVE RADIO",
  "SHANGHAI",
]

const SEP = " \u00b7 "

function MarqueeTrack() {
  const text = ITEMS.join(SEP) + SEP
  return (
    <span className="inline-block whitespace-nowrap" aria-hidden>
      {text}
    </span>
  )
}

export default function Marquee() {
  return (
    <div
      className="relative flex h-8 select-none items-center overflow-hidden font-mono text-[11px] uppercase tracking-[0.25em]"
      style={{ color: "#c4c4c0" }}
      role="marquee"
      aria-label="Scrolling ticker: PASS, Pinching Antenna Systems, 6G Physical Layer, AI-Native Radio, Shanghai"
    >
      <div className="animate-marquee flex gap-0">
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  )
}
