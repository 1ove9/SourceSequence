"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={[
          "glass mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-3 pl-5 pr-3",
          "transition-[background,box-shadow] duration-500",
          scrolled
            ? "[background:rgba(255,255,255,0.78)]"
            : "[background:rgba(255,255,255,0.5)]",
        ].join(" ")}
        style={{ borderRadius: 9999 }}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-5 w-5 place-items-center">
            <span
              className="block h-[2px] w-3.5 rounded-full"
              style={{ background: "linear-gradient(90deg,#ff8a3d,#ffb27a)" }}
            />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-foreground" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            source sequence
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80 md:inline">
            / 源序
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center font-mono text-[11px] tracking-[0.18em] md:flex">
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={[
                "px-1.5 transition-colors",
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
                "px-1.5 transition-colors",
                lang === "中" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              ].join(" ")}
              aria-pressed={lang === "中"}
            >
              中
            </button>
          </div>

          <a
            href="#contact"
            className="btn-amber group ml-1 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[12.5px] font-medium"
          >
            Request Access
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </nav>
    </header>
  )
}
