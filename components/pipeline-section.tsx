"use client"

import { motion } from "framer-motion"
import { Upload, FileText, Brain, CheckCircle, ArrowRight, LucideIcon } from "lucide-react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

interface PipelineStep {
  icon: (props: IconProps) => JSX.Element;
  title: string;
  description: string;
  details: string[];
  duration: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    icon: (props: any) => <Upload {...props} />,
    title: "Document Upload",
    description: "Secure upload and preprocessing of legal documents in various formats",
    details: [
      "Multi-format support (PDF, DOCX, images)",
      "Automatic format detection",
      "Security validation",
      "Metadata extraction",
    ],
    duration: "< 1s",
  },
  {
    icon: (props: any) => <FileText {...props} />,
    title: "Text Extraction & Preprocessing",
    description: "Advanced OCR and text processing to prepare documents for analysis",
    details: ["OCR for scanned documents", "Text normalization", "Structure recognition", "Language detection"],
    duration: "< 5s",
  },
  {
    icon: (props: any) => <Brain {...props} />,
    title: "AI Analysis",
    description: "Multi-model AI analysis combining NLP, RAG, and domain expertise",
    details: ["Legal concept identification", "Context analysis", "Precedent matching", "Risk assessment"],
    duration: "< 5s",
  },
  {
    icon: (props: any) => <CheckCircle {...props} />,
    title: "Results & Explanation",
    description: "Structured output with explanations, recommendations, and insights",
    details: ["Executive summary", "Key points extraction", "Legal explanations", "Actionable recommendations"],
    duration: "Instant",
  },
]

export function PipelineSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Analysis Pipeline</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Our streamlined pipeline processes documents through multiple stages to deliver comprehensive analysis in
            seconds.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-8">
              {pipelineSteps.map((step, index) => (
                <div key={step.title} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 group hover:neon-glow-purple mb-4">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <div className="text-sm font-medium text-secondary mb-3">{step.duration}</div>
                      <p className="text-sm text-foreground/80 mb-4">{step.description}</p>
                      <ul className="space-y-1 text-xs text-foreground/60">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-1">
                            <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                      className="mx-4"
                    >
                      <ArrowRight className="h-6 w-6 text-primary animate-pulse-slow" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 hover:neon-glow-purple"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    {step.icon({ className: "h-6 w-6 text-primary" })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <span className="text-sm font-medium text-secondary">{step.duration}</span>
                    </div>
                    <p className="text-foreground/80 mb-3">{step.description}</p>
                    <ul className="space-y-1 text-sm text-foreground/60">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
