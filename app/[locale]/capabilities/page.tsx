import type {Metadata} from "next"
import {getTranslations, setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"
import AuroraBackground from "@/components/AuroraBackground"
import RevealOnScroll from "@/components/RevealOnScroll"
import {routing} from "@/i18n/routing"
import {Link} from "@/i18n/navigation"

const OG_LOCALE: Record<string, string> = {en: "en_US", zh: "zh_CN"}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: "capabilitiesPage"})
  const title = t("metaTitle")
  const description = t("metaDescription")

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/capabilities`,
      languages: {
        en: "/en/capabilities",
        zh: "/zh/capabilities",
        "x-default": "/en/capabilities",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Source Sequence",
      title,
      description,
      url: `/${locale}/capabilities`,
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: locale === "en" ? "zh_CN" : "en_US",
      images: [{url: "/og-image.png", width: 1200, height: 630, alt: title}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  }
}

const CAPS = ["cap1", "cap2", "cap3"] as const

export default async function CapabilitiesPage({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)
  const t = await getTranslations("capabilitiesPage")

  return (
    <main className="bg-canvas bg-grain relative isolate min-h-screen overflow-x-hidden text-foreground">
      <AuroraBackground />
      <Nav />

      {/* Page-head */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <RevealOnScroll>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("label")}
            </div>
            <h1 className="max-w-4xl text-balance font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] tracking-[-0.015em] text-foreground">
              {t("heading")}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Three capability detail sections */}
      {CAPS.map((cap, idx) => (
        <RevealOnScroll
          key={cap}
          y={24}
          delay={idx * 0.1}
          viewportMargin="-80px"
          as="section"
          id={cap}
          className="relative py-16 md:py-20"
        >
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] tracking-[-0.01em] text-foreground">
              {t(`${cap}Title`)}
            </h2>
            <div className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              {t(`${cap}Desc`)
                .split("\n")
                .map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {p}
                  </p>
                ))}
            </div>
          </div>
        </RevealOnScroll>
      ))}

      {/* Back link */}
      <div className="mx-auto max-w-5xl px-5 pb-20 md:px-8 md:pb-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("back")}
        </Link>
      </div>

      <Contact />
      <Footer />
    </main>
  )
}
