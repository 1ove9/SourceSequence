import {setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import HomeHero from "@/components/HomeHero"
import Marquee from "@/components/Marquee"
import Capabilities from "@/components/Capabilities"
import Solutions from "@/components/Solutions"
import CaseStudies from "@/components/CaseStudies"
import Publications from "@/components/Publications"
import TrustedBy from "@/components/TrustedBy"
import Vision from "@/components/Vision"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import AuroraBackground from "@/components/AuroraBackground"
import ClientMessages from "@/i18n/ClientMessages"

// Homepage ticker — Physics-Grounded AI terms (antenna terms live on /antenna).
const HOME_MARQUEE = [
  "PHYSICS-GROUNDED AI",
  "PHYSICS-INFORMED MODELING",
  "UNCERTAINTY QUANTIFICATION",
  "INDUSTRIAL RELIABILITY",
  "HANGZHOU",
]

export default async function Page({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  return (
    <main className="bg-canvas bg-grain relative isolate min-h-screen overflow-x-hidden text-foreground">
      <AuroraBackground />
      <Nav />
      {/* 1 · Manifesto */}
      <HomeHero />
      <Marquee items={HOME_MARQUEE} />
      {/* 2 · Core capabilities */}
      <Capabilities />
      {/* 3 · Industry solutions (featured entry into /solutions) */}
      <Solutions variant="teaser" />
      {/* 4 · Evidence / case studies */}
      <CaseStudies />
      {/* Verifiable records only render when real CMS entries exist. */}
      <Publications verifiedOnly />
      <TrustedBy />
      {/* 5 · Vision and action */}
      <ClientMessages namespaces={["home", "about"]}>
        <Vision ns="home.vision" />
        <About />
      </ClientMessages>
      <Contact />
      <Footer />
    </main>
  )
}
