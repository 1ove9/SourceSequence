import {ArrowRight} from "lucide-react"
import {getTranslations} from "next-intl/server"
import HeroVisual from "./HeroVisual"

export default async function Hero() {
  const t = await getTranslations("hero")

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-8 gap-y-16 px-5 md:px-8">
        {/* LEFT — text */}
        <div className="col-span-12 lg:col-span-7">
          <div>
            {/* Pill — subtitle */}
            <div className="hero-reveal hero-reveal-pill">
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
              className="hero-reveal hero-reveal-title mt-7 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.06] tracking-display text-foreground"
            >
              {t("title")}
            </h1>

            {/* Body */}
            <p
              className="hero-reveal hero-reveal-body mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[1.6]"
            >
              {t("body")}
            </p>

            {/* CTAs */}
            <div
              className="hero-reveal hero-reveal-cta mt-10 flex flex-wrap items-center gap-3"
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
          <HeroVisual modelCaption={t("modelCaption")} />
        </div>
      </div>
    </section>
  )
}
