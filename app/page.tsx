import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Capabilities from "@/components/Capabilities"
import Solutions from "@/components/Solutions"
import Research from "@/components/Research"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground grain vignette overflow-x-hidden">
      <Nav />
      <Hero />
      <Capabilities />
      <Solutions />
      <Research />
      <Footer />
    </main>
  )
}
