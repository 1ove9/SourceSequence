"use client"

import {useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {ArrowRight, Menu, X} from "lucide-react"
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

const APPLE_EASE = [0.4, 0, 0.2, 1] as const

export default function Nav() {
  const t = useTranslations("nav")
  const tBrand = useTranslations("brand")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, {passive: true})
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // ESC closes
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <>
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
          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher />

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="btn-electric group ml-1 hidden h-9 items-center gap-1.5 rounded-full px-4 text-[12.5px] font-medium md:inline-flex"
            >
              {t("cta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t("menuOpen")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-foreground transition-colors hover:bg-white/[0.08] md:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("menuLabel")}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.25, ease: APPLE_EASE}}
            className="bg-grain fixed inset-0 z-[60] flex flex-col bg-[rgba(10,14,26,0.96)] md:hidden"
            style={{
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between px-5 pt-5">
              <Link href="/" onClick={close} className="flex items-center gap-2.5">
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
              <button
                type="button"
                onClick={close}
                aria-label={t("menuClose")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] text-foreground transition-colors hover:bg-white/[0.08]"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex flex-1 flex-col justify-center px-7">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.key}
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + i * 0.035,
                      ease: APPLE_EASE,
                    }}
                  >
                    {item.isRoute ? (
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-2.5 font-display text-[clamp(2rem,9vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-foreground transition-colors hover:text-accent"
                      >
                        {t(item.key)}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={close}
                        className="block py-2.5 font-display text-[clamp(2rem,9vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-foreground transition-colors hover:text-accent"
                      >
                        {t(item.key)}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom: CTA */}
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{
                duration: 0.4,
                delay: 0.05 + navItems.length * 0.035,
                ease: APPLE_EASE,
              }}
              className="px-7 pb-10 pt-6"
            >
              <a
                href="#contact"
                onClick={close}
                className="btn-electric group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[14px] font-semibold"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
