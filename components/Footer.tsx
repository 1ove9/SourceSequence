import {getLocale, getTranslations} from "next-intl/server"
import {BRAND} from "@/lib/brand"
import {Link} from "@/i18n/navigation"
import FooterSignature from "./FooterSignature"

type FooterNavItem = {key: string; href: string; external?: boolean}

// Hash anchors are home-page sections; `solutions`, `yaf`, `models` are real
// routes. `github` / `platform` are external and only appear once configured.
// The locale-aware Link makes anchor clicks from a subpage navigate home and
// then scroll to the section.
const baseNavItems: ReadonlyArray<FooterNavItem> = [
  {key: "capabilities", href: "/#capabilities"},
  {key: "solutions", href: "/solutions"},
  {key: "yaf", href: "/antenna"},
  {key: "models", href: "/models"},
  {key: "about", href: "/#about"},
  {key: "careers", href: "/#careers"},
]

// Social channels stay empty until real accounts exist. Adding placeholder
// "#" links signals "site isn't ready" to anyone who clicks. Restore items
// here when GitHub / LinkedIn / X / WeChat profiles are live.
const socialItems: Array<{label: string; href: string}> = []

export default async function Footer() {
  const t = await getTranslations("footer")
  const tNav = await getTranslations("nav")
  const locale = await getLocale()
  const isZh = locale === "zh"

  const navItems: FooterNavItem[] = [
    ...baseNavItems,
    ...(BRAND.repo.isLive
      ? [{key: "github", href: BRAND.repo.url, external: true}]
      : []),
    ...(BRAND.platform.isLive
      ? [{key: "platform", href: BRAND.platform.url, external: true}]
      : []),
  ]

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
              {navItems.map((item) => (
                <li key={item.key}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tNav(item.key)}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tNav(item.key)}
                    </Link>
                  )}
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
          <FooterSignature text={t("signature")} isZh={isZh} />
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
