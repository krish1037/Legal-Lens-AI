"use client"

import { motion } from "framer-motion"
import { Brain, FileText, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced NLP models analyze legal documents with precision",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Support for text, PDF, DOCX, and image uploads",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get structured analysis and explanations in seconds",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your documents are processed securely and privately",
  },
]

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Analyze Legal Information
              </span>
              <br />
              <span className="text-foreground">Instantly with AI</span>
            </h1>

            <p className="text-xl sm:text-2xl text-foreground/80 max-w-4xl mx-auto text-pretty">
              Upload contracts, judgments, or legal documents in text, PDF, DOCX, or even images – Legal Lens AI will
              analyze and explain in seconds.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="glass rounded-lg p-4 hover:glass-strong transition-all duration-300 neon-glow-purple"
              >
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-foreground/60">Documents Analyzed</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="glass rounded-lg p-4 hover:glass-strong transition-all duration-300 neon-glow"
              >
                <div className="text-2xl font-bold text-secondary">90.2%</div>
                <div className="text-sm text-foreground/60">Accuracy Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="glass rounded-lg p-4 hover:glass-strong transition-all duration-300 neon-glow-purple"
              >
                <div className="text-2xl font-bold text-primary">&lt; 3s</div>
                <div className="text-sm text-foreground/60">Average Analysis Time</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 group hover:neon-glow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {feature.icon({ className: "h-6 w-6 text-primary" })}
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-foreground/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
