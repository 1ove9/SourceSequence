"use client"

import {useRef} from "react"
import {ArrowRight} from "lucide-react"
import {useTranslations} from "next-intl"
import {Link} from "@/i18n/navigation"
import {useHeroReveal} from "./useHeroReveal"
import WavefieldCanvas from "./WavefieldCanvas"

/**
 * Homepage hero — Physics-Grounded AI. Text-forward (no WebGL scene); the
 * antenna 3D showcase now lives on /antenna. Reuses the same type scale,
 * glass-pill, and electric-button styles as the antenna Hero.
 *
 * Entrance is GSAP (P1 — masked line reveal) via useHeroReveal; see ANIMATION.md.
 */
export default function HomeHero() {
  const t = useTranslations("home.hero")
  const scope = useRef<HTMLDivElement>(null)
  useHeroReveal(scope)

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32">
      {/* Signature wavefield — the one ambient flourish; sits behind the text */}
      <WavefieldCanvas className="pointer-events-none absolute inset-0 -z-[1] h-full w-full [mask-image:linear-gradient(to_bottom,black,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_55%,transparent)]" />
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div ref={scope}>
          <div data-reveal="pill">
            <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
              <span aria-hidden className="text-[14px] leading-none text-accent">
                &#x22B9;
              </span>
              {t("pill")}
            </span>
          </div>

          <h1
            data-reveal="title"
            className="mt-7 max-w-4xl font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.06] tracking-display text-foreground"
          >
            {t("title")}
          </h1>

          <p
            data-reveal="body"
            className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[1.6]"
          >
            {t("body")}
          </p>

          <div
            data-reveal="cta"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/solutions"
              className="btn-electric group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/#contact"
              className="glass-pill inline-flex h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold text-foreground transition-all duration-300 hover:bg-white/70"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
