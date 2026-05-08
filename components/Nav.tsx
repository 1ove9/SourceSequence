"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const items = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#solutions" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<"EN" | "中">("EN")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/80"
          : "bg-background/30 backdrop-blur-sm border-b border-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-3.5 w-3.5 place-items-center">
            <span className="block h-3.5 w-px bg-primary/90 rotate-[28deg] origin-center" />
            <span className="absolute h-1 w-1 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[13px] font-medium tracking-[0.18em] text-foreground">YUANXU</span>
          <span className="hidden md:inline font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70">
            / 源序
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center font-mono text-[11px] tracking-[0.18em]">
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={[
                "px-1 transition-colors",
                lang === "EN" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              ].join(" ")}
              aria-pressed={lang === "EN"}
            >
              EN
            </button>
            <span className="text-border">/</span>
            <button
              type="button"
              onClick={() => setLang("中")}
              className={[
                "px-1 transition-colors",
                lang === "中" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              ].join(" ")}
              aria-pressed={lang === "中"}
            >
              中
            </button>
          </div>

          {/* Status pill */}
          <span className="hidden lg:inline-flex items-center gap-2 border border-border/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="block h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            Active
          </span>
        </div>
      </nav>
    </header>
  )
}
