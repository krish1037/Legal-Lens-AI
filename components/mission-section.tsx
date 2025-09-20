"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize legal understanding by providing AI-powered analysis that makes complex legal documents accessible to everyone, regardless of their legal background.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where legal information is transparent, understandable, and accessible to all, empowering individuals and businesses to make informed decisions.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in transparency, accuracy, and user empowerment. Our AI is designed to assist, not replace, human judgment in legal matters.",
  },
]

export function MissionSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Legal Lens AI?</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Legal documents shouldn't be a barrier to understanding your rights and obligations. We're here to bridge
            that gap.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="glass rounded-xl p-8 hover:glass-strong transition-all duration-300 group hover:neon-glow"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">{value.title}</h3>
              <p className="text-foreground/80 text-center leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
