import { Scale, Mail, Linkedin, Github, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const techStack = ["React", "Flask", "LangChain", "Gemini AI"]

export function Footer() {
  return (
    <footer className="glass-strong border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left - Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="glass p-4 rounded-xl flex items-center space-x-4 hover:neon-glow transition-all duration-300">
                <div className="p-3 bg-primary rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">krishsharma1037@gmail.com</p>
                </div>
              </div>

              <div className="glass p-4 rounded-xl flex items-center space-x-4 hover:neon-glow transition-all duration-300">
                <div className="p-3 bg-secondary rounded-lg">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium text-foreground">Krish Sharma</p>
                </div>
              </div>

              <div className="glass p-4 rounded-xl flex items-center space-x-4 hover:neon-glow transition-all duration-300">
                <div className="p-3 bg-chart-3 rounded-lg">
                  <Github className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <p className="font-medium text-foreground">krish1037</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - AI-Powered Detection */}
          <div className="lg:col-span-1">
            <div className="glass-strong p-8 rounded-2xl text-center hover:neon-glow-purple transition-all duration-300">
              <div className="p-4 bg-primary rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">AI-Powered Detection</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Leveraging cutting-edge machine learning algorithms to combat misinformation with 90% accuracy across
                multiple content formats.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl font-bold text-secondary">15K+</div>
                  <div className="text-sm text-muted-foreground">Articles Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">90%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Profile Section */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <img
                      src="/WhatsApp Image 2024-10-13 at 11.52.33_b21d52bb.jpg"
                      alt="Krish Sharma"
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full">
                  <Zap className="h-4 w-4 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">Krish Sharma</h3>
              <p className="text-muted-foreground mb-6">Full Stack Developer & AI/ML Engineer</p>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3">
                Available for Projects
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">© 2025 TruthLens AI – All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
