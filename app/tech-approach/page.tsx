import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { TechHero } from "@/components/tech-hero"
import { AIModelsSection } from "@/components/ai-models-section"
import { PipelineSection } from "@/components/pipeline-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ArchitectureSection } from "@/components/architecture-section"

export default function TechApproachPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <TechHero />
          <AIModelsSection />
          <PipelineSection />
          <TechStackSection />
          <ArchitectureSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
