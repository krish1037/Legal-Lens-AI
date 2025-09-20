"use client"

import { motion } from "framer-motion"
import { CheckCircle, Lightbulb, Rocket, Users, Globe, Award } from "lucide-react"

const milestones = [
  {
    year: "2025",
    quarter: "Q1",
    icon: Lightbulb,
    title: "Concept & Research",
    description:
      "Initial research into legal documentation of laws of India. Identified key challenges in legal accessibility.",
    achievements: ["Market research completed", "Get to know about how vast the data is ", "Initial data sorting for the training set "],
  },
  {
    year: "2025",
    quarter: "Q2",
    icon: Rocket,
    title: "Feature Development",
    description: "Try to figure out how it will gone be workfull and what tech stack can be most suitable for this ",
    achievements: ["Do the feature engineering", "Exploring the web stack", "Filtering the data and making it ready for training "],
  },
  {
    year: "2025",
    quarter: "Q3",
    icon: Users,
    title: "First Prototype",
    description: "Just using the generative model for the response on the custom data set trained model.",
    achievements: ["500+ query analysis", "Document format support expanded"],
  },
  {
    year: "2025",
    quarter: "Q4",
    icon: Globe,
    title: "Add the RAG and OCR",
    description:
      "This time first use the RAG model for the better and more accurate results and also add the OCR for the scanned documents",
    achievements: ["More better and precised results", "10K+ documents analyzed", "Multi-language support added"],
  },
  {
    year: "2025",
    quarter: "Q5",
    icon: Award,
    title: "Deployement & Recognition",
    description: "Achieved industry recognition and expanded user base with improved accuracy and new features.",
    achievements: ["90.2% accuracy achieved", "1K+ users acquired", "20+ states coverage"],
  },
  {
    year: "2025",
    quarter: "Q6",
    title: "Future Vision",
    description: "Expanding AI capabilities with advanced legal reasoning and specialized domain expertise.",
    achievements: ["Advanced reasoning models", "Specialized legal domains", "Add on the chat bot for the Q&A"],
    isFuture: true,
  },
]

export function TimelineSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            From concept to reality - see how we've evolved to become a trusted AI legal analysis platform.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-primary h-full rounded-full opacity-30" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={`${milestone.year}-${milestone.quarter}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div
                    className={`glass rounded-xl p-6 hover:glass-strong transition-all duration-300 ${
                      milestone.isFuture ? "border-2 border-secondary/50 neon-glow" : "hover:neon-glow-purple"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      {index % 2 === 0 ? (
                        <>
                          <span className="text-sm font-medium text-primary">
                            {milestone.year} {milestone.quarter}
                          </span>
                          {milestone.isFuture && (
                            <span className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {milestone.isFuture && (
                            <span className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full">
                              Coming Soon
                            </span>
                          )}
                          <span className="text-sm font-medium text-primary">
                            {milestone.year} {milestone.quarter}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{milestone.title}</h3>
                    <p className="text-foreground/80 mb-4">{milestone.description}</p>
                    <ul className="space-y-2">
                      {milestone.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-center space-x-2 text-sm text-foreground/70">
                          <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      milestone.isFuture
                        ? "bg-secondary/20 border-2 border-secondary neon-glow"
                        : "glass-strong border-2 border-primary neon-glow-purple"
                    }`}
                  >
                    {milestone.icon ? (
                      <milestone.icon className={`h-6 w-6 ${milestone.isFuture ? "text-secondary" : "text-primary"}`} />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${milestone.isFuture ? "bg-secondary" : "bg-primary"}`} />
                    )}
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
