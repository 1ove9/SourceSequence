"use client"

import { ArrowRight } from "lucide-react"

const navItems = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#solutions" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const socialItems = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Contact row */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 mb-16">
          <div className="col-span-12 md:col-span-6">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              &#x2316; Contact
            </div>
            <h3 className="max-w-2xl text-balance font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              Building partners, hires, and pilots.{" "}
              <span className="italic text-muted-foreground">Get in touch.</span>
            </h3>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@yuanxu.io"
                className="btn-electric group inline-flex h-12 items-center gap-2 rounded-[14px] px-6 text-[14px] font-semibold"
              >
                hello@yuanxu.io
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#"
                className="glass-pill inline-flex h-12 items-center rounded-[14px] px-6 text-[14px] font-semibold text-foreground transition-all duration-300 hover:bg-white/[0.1]"
              >
                Open Roles
              </a>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-8">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              HQ // Shanghai
            </div>
            <p className="font-mono text-[12px] leading-relaxed text-foreground/60">
              N 31.2304° / E 121.4737°
              <br />
              Pudong District
              <br />
              Shanghai 201210, CN
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Lab // Beijing
            </div>
            <p className="font-mono text-[12px] leading-relaxed text-foreground/60">
              N 39.9042° / E 116.4074°
              <br />
              Haidian District
              <br />
              Beijing 100084, CN
            </p>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
            YUANXU / 源序 <span className="mx-2 text-white/[0.1]">&copy;</span> 2026
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navItems.map((n) => (
              <li key={n.label}>
                <a href={n.href} className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {socialItems.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Massive signature */}
        <div className="overflow-hidden -mx-5 md:-mx-8">
          <div
            className="select-none whitespace-nowrap px-5 font-display italic leading-[0.95] tracking-[-0.02em] md:px-8"
            style={{
              color: "#1a2238",
              fontSize: "clamp(2.75rem, 11vw, 11rem)",
            }}
          >
            Building the physical layer of 6G.
          </div>
        </div>

        {/* Bottom mini meta */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/50">
          <span>v0.1 — RESEARCH PREVIEW</span>
          <span className="flex items-center gap-2">
            <span
              className="block h-1.5 w-1.5 rounded-full pulse-dot"
              style={{ background: "#4d7cff" }}
            />
            SIGNAL // ACTIVE
          </span>
          <span>BUILT IN SHANGHAI</span>
        </div>
      </div>
    </footer>
  )
}
