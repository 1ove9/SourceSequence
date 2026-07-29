import {ArrowRight} from "lucide-react"
import {getTranslations} from "next-intl/server"
import {Link} from "@/i18n/navigation"
import WavefieldCanvas from "./WavefieldCanvas"

/**
 * Homepage hero — Physics-Grounded AI. Text-forward (no WebGL scene); the
 * antenna 3D showcase now lives on /antenna. Reuses the same type scale,
 * glass-pill, and electric-button styles as the antenna Hero.
 *
 * The text remains a Server Component. A small CSS entrance preserves the
 * first-fold rhythm without shipping an animation runtime for static copy.
 */
export default async function HomeHero() {
  const t = await getTranslations("home.hero")

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32">
      {/* Signature wavefield — the one ambient flourish; sits behind the text */}
      <WavefieldCanvas className="pointer-events-none absolute inset-0 -z-[1] h-full w-full [mask-image:linear-gradient(to_bottom,black,black_55%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_55%,transparent)]" />
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div>
          <div className="hero-reveal hero-reveal-pill">
            <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
              <span aria-hidden className="text-[14px] leading-none text-accent">
                &#x22B9;
              </span>
              {t("pill")}
            </span>
          </div>

          <h1
            className="hero-reveal hero-reveal-title mt-7 max-w-4xl font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.06] tracking-display text-foreground"
          >
            {t("title")}
          </h1>

          <p
            className="hero-reveal hero-reveal-body mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[1.6]"
          >
            {t("body")}
          </p>

          <div
            className="hero-reveal hero-reveal-cta mt-10 flex flex-wrap items-center gap-3"
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
