import {setRequestLocale} from "next-intl/server"
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Marquee from "@/components/Marquee"
import TrustedBy from "@/components/TrustedBy"
import Vision from "@/components/Vision"
import Research from "@/components/Research"
import Lab from "@/components/Lab"
import InsideTheLab from "@/components/InsideTheLab"
import Applications from "@/components/Applications"
import About from "@/components/About"
import Publications from "@/components/Publications"
import Careers from "@/components/Careers"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"

export default async function Page({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <Hero />
      <Marquee />
      <TrustedBy />
      <Vision />
      <Research />
      <Lab />
      <InsideTheLab />
      <Applications />
      <About />
      <Publications />
      <Careers />
      <Contact />
      <Footer />
    </main>
  )
}
