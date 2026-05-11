"use client"

import {useTranslations} from "next-intl"

const navKeys = ["research", "lab", "applications", "about", "careers"] as const

const socialItems = [
  {label: "GitHub", href: "#"},
  {label: "LinkedIn", href: "#"},
  {label: "X", href: "#"},
  {label: "WeChat", href: "#"},
]

export default function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")

  return (
    <footer className="relative pb-10 pt-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="hairline mb-10" />

        {/* 3-column row */}
        <div className="mb-14 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {/* Left: copyright */}
          <div className="flex items-start">
            <p className="font-mono text-[11px] leading-[1.7] tracking-[0.15em] text-muted-foreground">
              {t("copyright")}
            </p>
          </div>

          {/* Middle: investor placeholder */}
          <div className="flex items-start md:justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/40">
              {t("backedBy")}
            </p>
          </div>

          {/* Right: nav + social */}
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
          </div>
        </div>

        {/* Large italic signature */}
        <div className="-mx-5 overflow-hidden md:-mx-8">
          <div
            className="select-none whitespace-nowrap px-5 font-display italic leading-[0.95] tracking-[-0.02em] md:px-8"
            style={{
              color: "#1a2238",
              fontSize: "clamp(2.75rem, 11vw, 11rem)",
            }}
          >
            {t("signature")}
          </div>
        </div>

        {/* Press email */}
        <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/40">
          {t("pressLabel")}
          {" · "}
          <a
            href="mailto:press@yuanxu.tech"
            className="transition-colors hover:text-muted-foreground"
          >
            press@yuanxu.tech
          </a>
        </div>
      </div>
    </footer>
  )
}
