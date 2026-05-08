"use client"

const navItems = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#solutions" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-28 pb-10 border-t border-border/80">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Contact / address row */}
        <div className="grid grid-cols-12 gap-y-10 gap-x-6 md:gap-x-12 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              ⌖ Contact
            </div>
            <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl text-balance">
              Building partners, hires, and pilots.{" "}
              <span className="italic text-muted-foreground">Get in touch.</span>
            </h3>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a
                href="mailto:hello@yuanxu.tech"
                className="group inline-flex items-center gap-3 border border-primary/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                hello@yuanxu.tech
              </a>
              <a
                href="#"
                className="underline-sweep font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/85"
              >
                Open Roles
              </a>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              HQ // Shanghai
            </div>
            <p className="font-mono text-[12px] leading-relaxed text-foreground/80">
              N 31.2304° / E 121.4737°
              <br />
              Pudong District
              <br />
              Shanghai 201210, CN
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Lab // Beijing
            </div>
            <p className="font-mono text-[12px] leading-relaxed text-foreground/80">
              N 39.9042° / E 116.4074°
              <br />
              Haidian District
              <br />
              Beijing 100084, CN
            </p>
          </div>
        </div>

        {/* Top divider with sitemap */}
        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            YUANXU TECHNOLOGY <span className="mx-2 text-border">©</span> 2026
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navItems.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Massive low-key bottom statement */}
        <div className="overflow-hidden -mx-5 md:-mx-10">
          <div
            className="font-mono uppercase whitespace-nowrap select-none leading-[0.95] tracking-[-0.01em] px-5 md:px-10"
            style={{
              color: "#1a1a1a",
              fontSize: "clamp(2.5rem, 11vw, 11rem)",
              fontWeight: 500,
            }}
          >
            BUILDING THE PHYSICAL LAYER OF 6G.
          </div>
        </div>

        {/* Bottom mini meta */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/70">
          <span>v0.1 — RESEARCH PREVIEW</span>
          <span className="flex items-center gap-2">
            <span className="block h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
            SIGNAL // ACTIVE
          </span>
          <span>BUILT IN SHANGHAI</span>
        </div>
      </div>
    </footer>
  )
}
