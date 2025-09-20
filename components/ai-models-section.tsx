"use client"

import { motion } from "framer-motion"
import { Brain, Eye, Search } from "lucide-react"

const aiModels = [
  {
    icon: Brain,
    title: "Natural Language Processing",
    description: "Advanced transformer models for understanding legal language and context",
    capabilities: [
      "Legal terminology recognition",
      "Context-aware analysis",
      "Semantic understanding",
      "Multi-language support",
    ],
    accuracy: "85.7%",
    color: "primary",
  },
  {
    icon: Search,
    title: "Retrieval-Augmented Generation",
    description: "RAG system that combines knowledge retrieval with generative AI for accurate responses",
    capabilities: [
      "Legal Vector database integration",
      "Get the ANN based Deployed Index on the Endpoint identification for better results",
      "Convert the user query into embeddings and do the semantically search",
      "Contextual retrieval",
    ],
    accuracy: "77.8%",
    color: "secondary",
  },
  {
    icon: Eye,
    title: "Computer Vision Models",
    description: "OCR and document understanding for processing scanned legal documents and images",
    capabilities: [
      "Document structure recognition",
      "Text extraction from images",
      "Layout understanding",
      "Handwriting recognition",
    ],
    accuracy: "96.5%",
    color: "primary",
  },
]

export function AIModelsSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">AI Models & Capabilities</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Our multi-modal AI system combines the latest advances in natural language processing, computer vision, and
            retrieval systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {aiModels.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`glass rounded-xl p-6 hover:glass-strong transition-all duration-300 group ${
                model.color === "secondary" ? "hover:neon-glow" : "hover:neon-glow-purple"
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    model.color === "secondary" ? "bg-secondary/10" : "bg-primary/10"
                  } group-hover:${model.color === "secondary" ? "bg-secondary/20" : "bg-primary/20"} transition-colors`}
                >
                  <model.icon className={`h-8 w-8 ${model.color === "secondary" ? "text-secondary" : "text-primary"}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{model.title}</h3>
                  <div
                    className={`text-sm font-medium ${model.color === "secondary" ? "text-secondary" : "text-primary"}`}
                  >
                    {model.accuracy} Accuracy
                  </div>
                </div>
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">{model.description}</p>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Key Capabilities:</h4>
                <ul className="space-y-2">
                  {model.capabilities.map((capability, capIndex) => (
                    <li key={capIndex} className="flex items-center space-x-2 text-sm text-foreground/70">
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          model.color === "secondary" ? "bg-secondary" : "bg-primary"
                        }`}
                      />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
