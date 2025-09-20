import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { AboutHero } from "@/components/about-hero"
import { MissionSection } from "@/components/mission-section"
import { TimelineSection } from "@/components/timeline-section"
import { KeyFeaturesSection } from "@/components/key-features-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <AboutHero />
          <MissionSection />
          <TimelineSection />
          <KeyFeaturesSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
