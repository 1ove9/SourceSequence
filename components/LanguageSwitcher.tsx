"use client"

import {useTransition} from "react"
import {useLocale} from "next-intl"
import {usePathname, useRouter} from "@/i18n/navigation"
import type {Locale} from "@/i18n/routing"

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: Locale) => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, {locale: next})
    })
  }

  const baseBtn =
    "px-1 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors disabled:opacity-60"

  return (
    <div className="flex items-center gap-1" aria-label="Language">
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-current={locale === "en"}
        disabled={isPending}
        className={[
          baseBtn,
          locale === "en"
            ? "text-accent"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
      >
        EN
      </button>
      <span className="text-white/[0.15]">·</span>
      <button
        type="button"
        onClick={() => switchTo("zh")}
        aria-current={locale === "zh"}
        disabled={isPending}
        className={[
          baseBtn,
          locale === "zh"
            ? "text-accent"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
      >
        中
      </button>
    </div>
  )
}
