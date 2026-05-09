import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Capabilities from "@/components/Capabilities"
import Solutions from "@/components/Solutions"
import Research from "@/components/Research"
import Footer from "@/components/Footer"
import BackgroundLayer from "@/components/BackgroundLayer"

export default function Page() {
  return (
    <main className="bg-canvas bg-grain relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundLayer />
      <Nav />
      <Hero />
      <Capabilities />
      <Solutions />
      <Research />
      <Footer />
    </main>
  )
}
