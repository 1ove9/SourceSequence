import {getLocale, getTranslations} from "next-intl/server"
import {cn} from "@/lib/utils"
import {BRAND} from "@/lib/brand"

const navKeys = ["research", "lab", "applications", "models", "about", "careers"] as const

// Social channels stay empty until real accounts exist. Adding placeholder
// "#" links signals "site isn't ready" to anyone who clicks. Restore items
// here when GitHub / LinkedIn / X / WeChat profiles are live.
const socialItems: Array<{label: string; href: string}> = []

export default async function Footer() {
  const t = await getTranslations("footer")
  const tNav = await getTranslations("nav")
  const locale = await getLocale()
  const isZh = locale === "zh"

  return (
    <footer className="relative pb-10 pt-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="hairline mb-10" />

        {/* 2-column row: copyright (left) + nav/social (right) */}
        <div className="mb-14 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8">
          {/* Left: copyright */}
          <div className="flex items-start">
            <p className="font-mono text-[11px] leading-[1.7] tracking-[0.15em] text-muted-foreground">
              {t("copyright")}
            </p>
          </div>

          {/* Right: nav + (optional) social */}
          <div className="flex flex-col gap-5 md:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navKeys.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
            {socialItems.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {socialItems.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Large italic signature */}
        <div className="@container w-full max-w-full">
          <div
            className={cn(
              "select-none whitespace-nowrap font-display italic tracking-[-0.02em] text-canvas-deep",
              isZh
                ? "text-[clamp(28px,8cqi,90px)]"
                : "text-[clamp(20px,5.4cqi,64px)]",
              "leading-[0.95] pb-[0.15em]",
            )}
          >
            {t("signature")}
          </div>
        </div>

        {/* Press email */}
        <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/40">
          {t("pressLabel")}
          {" · "}
          <a
            href={`mailto:${BRAND.emails.press}`}
            className="transition-colors hover:text-muted-foreground"
          >
            {BRAND.emails.press}
          </a>
        </div>
      </div>
    </footer>
  )
}
