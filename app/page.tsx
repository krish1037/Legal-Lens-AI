import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScatteredHeroSection } from "@/components/scattered-hero-section"
import { DynamicQueryInterface } from "@/components/dynamic-query-interface"
import { FloatingElements } from "@/components/floating-elements"

export default function HomePage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FloatingElements />

      <div className="relative z-10">
        <Navigation />
        <main>
          <ScatteredHeroSection />
          <DynamicQueryInterface />
        </main>
        <Footer />
      </div>
    </div>
  )
}
