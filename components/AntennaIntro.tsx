import {getTranslations} from "next-intl/server"
import {ArrowLeft, ArrowUpRight, Github} from "lucide-react"
import {Link} from "@/i18n/navigation"
import {BRAND} from "@/lib/brand"

/**
 * Positioning band at the top of /antenna — the single line of copy written
 * specially for the YAF page, plus GitHub / online-platform entry points.
 * Reuses the existing glass-pill + electric-button styles only.
 */
export default async function AntennaIntro() {
  const t = await getTranslations("antenna")

  return (
    <section className="relative pt-32 pb-4 md:pt-40">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        {/* Back to parent — /antenna is a sub-page; give visitors a clear way up. */}
        <div className="mb-8 flex justify-center md:justify-start">
          <Link
            href="/"
            className="glass-pill group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {t("back")}
          </Link>
        </div>

        <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span aria-hidden className="text-[13px] leading-none text-accent">
            &#x22B9;
          </span>
          {t("eyebrow")}
        </span>

        <p className="mx-auto mt-7 max-w-3xl text-balance font-display text-[clamp(1.35rem,3vw,2.1rem)] leading-[1.3] tracking-[-0.01em] text-foreground/90">
          {t("intro")}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {BRAND.platform.isLive ? (
              <a
                href={BRAND.platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric group inline-flex h-11 items-center gap-2 rounded-[14px] px-5 text-[13.5px] font-semibold"
              >
                {t("ctaPlatform")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span className="glass-pill inline-flex h-11 items-center gap-2 rounded-[14px] px-5 text-[13px] font-medium text-muted-foreground/70">
                {t("platformSoon")}
              </span>
            )}

            {BRAND.repo.isLive && (
              <a
                href={BRAND.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13.5px] font-semibold text-foreground transition-all duration-300 hover:bg-white/70"
              >
                <Github className="h-4 w-4" strokeWidth={1.7} />
                {t("ctaGithub")}
              </a>
            )}
        </div>
      </div>
    </section>
  )
}
