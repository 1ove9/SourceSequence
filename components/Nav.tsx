"use client"

import {useEffect, useState} from "react"
import {ArrowRight} from "lucide-react"
import {useTranslations} from "next-intl"
import {Link} from "@/i18n/navigation"
import LanguageSwitcher from "./LanguageSwitcher"

type NavItem = {key: string; href: string; isRoute: boolean}

const navItems: NavItem[] = [
  {key: "research", href: "#research", isRoute: false},
  {key: "lab", href: "#lab", isRoute: false},
  {key: "applications", href: "#applications", isRoute: false},
  {key: "models", href: "/models", isRoute: true},
  {key: "about", href: "#about", isRoute: false},
  {key: "careers", href: "#careers", isRoute: false},
  {key: "contact", href: "#contact", isRoute: false},
]

export default function Nav() {
  const t = useTranslations("nav")
  const tBrand = useTranslations("brand")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, {passive: true})
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={[
          "mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-3 pl-5 pr-3",
          "rounded-full border transition-[background,box-shadow,border-color] duration-500",
          scrolled
            ? "border-white/[0.1] bg-[rgba(10,14,26,0.78)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-white/[0.06] bg-[rgba(10,14,26,0.6)]",
        ].join(" ")}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-5 w-5 place-items-center">
            <span
              className="block h-[2px] w-3.5 rounded-full"
              style={{background: "linear-gradient(90deg,#4d7cff,#60a5fa)"}}
            />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-foreground" />
          </span>
          <span className="text-[15px] font-semibold lowercase tracking-tight text-foreground">
            {tBrand("name")}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              {item.isRoute ? (
                <Link
                  href={item.href}
                  className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(item.key)}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(item.key)}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="btn-electric group ml-1 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[12.5px] font-medium"
          >
            {t("cta")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </nav>
    </header>
  )
}
