import {getLocale} from "next-intl/server"
import {Link} from "@/i18n/navigation"

const COPY: Record<string, {code: string; title: string; body: string; back: string}> = {
  en: {
    code: "404",
    title: "Signal lost.",
    body: "This page is not part of the current dataset. It may have been moved, renamed, or never existed.",
    back: "Return home",
  },
  zh: {
    code: "404",
    title: "信号丢失。",
    body: "该页面不在当前数据集中。可能已被移除、重命名，或从未存在。",
    back: "返回首页",
  },
}

export default async function NotFound() {
  const locale = await getLocale()
  const t = COPY[locale] ?? COPY.en

  return (
    <main className="bg-canvas bg-grain relative flex min-h-screen items-center justify-center px-5 text-foreground">
      <div className="max-w-xl text-center">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          ERR · {t.code}
        </div>
        <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
          {t.title}
        </h1>
        <p className="mx-auto mb-10 max-w-md text-[15px] leading-[1.7] text-muted-foreground">
          {t.body}
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
        >
          <span
            aria-hidden
            className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10"
          />
          {t.back}
        </Link>
      </div>
    </main>
  )
}
