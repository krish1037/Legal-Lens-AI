"use client"

import { motion } from "framer-motion"
import { Brain, Languages, FileSearch, Shield, Zap, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Legal Analysis",
    description:
      "Our advanced NLP models understand legal language and context, providing accurate analysis of complex documents.",
    benefits: ["Natural language processing", "Context-aware analysis", "Legal terminology recognition"],
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description:
      "Analyze legal documents in multiple languages with consistent accuracy and cultural legal context awareness.",
    benefits: ["5+ languages supported", "Cultural context awareness", "Cross-jurisdictional analysis"],
  },
  {
    icon: FileSearch,
    title: "Case Law Insights",
    description:
      "Access relevant case law and precedents that relate to your documents, providing deeper legal context.",
    benefits: ["Precedent identification", "Case law references", "Jurisdictional relevance"],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description:
      "Your documents are processed with enterprise-grade security and privacy protection. We never store your data.",
    benefits: ["End-to-end encryption", "No data retention", "GDPR compliant"],
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description:
      "Get comprehensive analysis in seconds, not hours. Our optimized AI pipeline ensures rapid document processing.",
    benefits: ["Sub-3 second analysis", "Real-time processing", "Scalable infrastructure"],
  },
  {
    icon: Users,
    title: "Collaborative Features",
    description:
      "Share analyses with team members, add comments, and collaborate on document reviews with built-in tools.",
    benefits: ["Team collaboration", "Comment system", "Version tracking"],
  },
]

export function KeyFeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Key Features</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover the powerful features that make Legal Lens AI the preferred choice for legal document analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 group hover:neon-glow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              </div>

              <p className="text-foreground/80 mb-4 leading-relaxed">{feature.description}</p>

              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-foreground/70">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
