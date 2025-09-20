"use client"

import { motion } from "framer-motion"

const techCategories = [
  {
    category: "Frontend",
    color: "primary",
    technologies: [
      { name: "React", description: "Modern UI framework" },
      { name: "Next.js", description: "Full-stack React framework" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Framer Motion", description: "Animation library" },
    ],
  },
  {
    category: "Backend",
    color: "secondary",
    technologies: [
      { name: "Python", description: "More robust language for complex and multi-faceted backend systems" },
      { name: "FastAPI", description: "High-performance API framework" },
      { name: "PostgreSQL", description: "Relational database" },
      { name: "Redis", description: "In-memory data store" },
      { name: "Docker", description: "Containerization platform" },
    ],
  },
  {
    category: "AI & ML",
    color: "primary",
    technologies: [
      { name: "LangChain", description: "LLM application framework" },
      { name: "Gemini AI", description: "Google's AI model" },
      { name: "Vertex AI", description: "Google Cloud ML platform" },
      { name: "Hugging Face", description: "ML model hub" },
      { name: "NLTK", description: "Natural Language Toolkit" },
    ],
  },
  {
    category: "Google Cloud",
    color: "secondary",
    technologies: [
      { name: "Bucket", description: "Cloud storage solution" },
      { name: "ANN Index", description: "Approximate Nearest Neighbor search" },
      { name: "Deployed endpoints", description: "Web service endpoints for model deployment" },
      { name: "RAG Infrastructure", description: "Retrieval-Augmented Generation Machine Engine" },
      { name: "Chat Model", description: "Gemini AI chat model 2.5-pro" },
    ],
  },
]

export function TechStackSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Technology Stack</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Built with modern, scalable technologies to ensure reliability, performance, and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className={`glass rounded-xl p-6 hover:glass-strong transition-all duration-300 ${
                category.color === "secondary" ? "hover:neon-glow" : "hover:neon-glow-purple"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 ${
                  category.color === "secondary" ? "text-secondary" : "text-primary"
                }`}
              >
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.2 + techIndex * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between p-3 glass rounded-lg hover:glass-strong transition-all duration-200"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{tech.name}</div>
                      <div className="text-sm text-foreground/60">{tech.description}</div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        category.color === "secondary" ? "bg-secondary" : "bg-primary"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
