"use client"

import dynamic from "next/dynamic"
import {useRef} from "react"
import {motion} from "framer-motion"
import {ArrowRight} from "lucide-react"
import {useTranslations} from "next-intl"
import SignalFlux from "./SignalFlux"
import {useHeroReveal} from "./useHeroReveal"

// Code-split the WebGL scene so it doesn't block initial paint or get bundled
// into the SSR HTML. The scene is purely decorative; not having it during SSR
// is fine and yields a much smaller initial JS payload.
const PinchingAntennaModel = dynamic(() => import("./PinchingAntennaModel"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
        Initializing antenna system…
      </span>
    </div>
  ),
})

export default function Hero() {
  const t = useTranslations("hero")
  const scope = useRef<HTMLDivElement>(null)
  // Left text block — GSAP masked line reveal (P1; see ANIMATION.md).
  useHeroReveal(scope)

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-8 gap-y-16 px-5 md:px-8">
        {/* LEFT — text */}
        <div className="col-span-12 lg:col-span-7">
          <div ref={scope}>
            {/* Pill — subtitle */}
            <div data-reveal="pill">
              <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
                <span
                  aria-hidden
                  className="text-[14px] leading-none text-accent"
                >
                  &#x22B9;
                </span>
                {t("pill")}
              </span>
            </div>

            {/* Headline */}
            <h1
              data-reveal="title"
              className="mt-7 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.06] tracking-display text-foreground"
            >
              {t("title")}
            </h1>

            {/* Body */}
            <p
              data-reveal="body"
              className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[1.6]"
            >
              {t("body")}
            </p>

            {/* CTAs */}
            <div
              data-reveal="cta"
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#research"
                className="btn-electric group inline-flex h-12 items-center gap-2 rounded-[14px] px-6 text-[14px] font-semibold"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="glass-pill inline-flex h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold text-foreground transition-all duration-300 hover:bg-white/70"
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — 3D showcase */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            initial={{opacity: 0, scale: 0.96, y: 24}}
            animate={{opacity: 1, scale: 1, y: 0}}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.4, 0, 0.2, 1] as const,
            }}
            className="glass showcase-inner relative aspect-square w-full overflow-hidden"
            style={{borderRadius: 32}}
          >
            {/* Top instrument bar — three-segment layout */}
            <div className="pointer-events-none absolute inset-x-5 top-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="text-foreground">PASS-001</span>
              <span className="flex items-center gap-1.5 text-muted-foreground/80">
                <span className="block h-[6px] w-[6px] animate-pulse rounded-full bg-accent" />
                LIVE
              </span>
              <span className="text-muted-foreground">
                28.0 GHz <span className="text-black/20">/</span> Ch.2
              </span>
            </div>

            <PinchingAntennaModel />

            {/* Signal flux visualizer — bottom-left */}
            <div className="pointer-events-none absolute bottom-12 left-5 z-10">
              <SignalFlux />
            </div>

            {/* Bottom caption */}
            <div className="pointer-events-none absolute inset-x-5 bottom-4 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
              {t("modelCaption")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
