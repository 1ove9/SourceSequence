"use client"

import {useEffect} from "react"
import {useLocale} from "next-intl"

const COPY: Record<string, {code: string; title: string; body: string; retry: string}> = {
  en: {
    code: "500",
    title: "Something destabilized.",
    body: "An unexpected error surfaced while rendering this page. Try again, or come back in a moment.",
    retry: "Retry",
  },
  zh: {
    code: "500",
    title: "出现了未预期的扰动。",
    body: "渲染此页面时发生异常。可以重试，或稍后再访问。",
    retry: "重试",
  },
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  const locale = useLocale()
  const t = COPY[locale] ?? COPY.en

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="bg-canvas bg-grain relative flex min-h-screen items-center justify-center px-5 text-foreground">
      <div className="max-w-xl text-center">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          ERR · {t.code}
          {error.digest ? ` · ${error.digest}` : ""}
        </div>
        <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
          {t.title}
        </h1>
        <p className="mx-auto mb-10 max-w-md text-[15px] leading-[1.7] text-muted-foreground">
          {t.body}
        </p>
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
        >
          <span
            aria-hidden
            className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10"
          />
          {t.retry}
        </button>
      </div>
    </main>
  )
}
