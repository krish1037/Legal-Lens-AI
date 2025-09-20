"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How accurate is Legal Lens AI's document analysis?",
    answer:
      "Legal Lens AI achieves 90.2% accuracy in legal document analysis. Our AI models are trained on millions of legal documents and continuously updated to maintain high precision. However, we always recommend consulting with a qualified attorney for critical legal decisions.",
  },
  {
    question: "What types of documents can Legal Lens AI analyze?",
    answer:
      "We support a wide range of legal documents including contracts, agreements, leases, terms of service, privacy policies, court documents, and more. Our system can process text files, PDFs, DOCX documents, and even scanned images with OCR technology.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade encryption and never store your documents after analysis. All processing is done in real-time, and your data is immediately deleted from our servers. We're GDPR compliant and follow strict data protection protocols.",
  },
  {
    question: "How long does document analysis take?",
    answer:
      "Most documents are analyzed in under 5 seconds. Processing time may vary slightly based on document length and complexity, but our optimized AI pipeline ensures rapid analysis without compromising accuracy.",
  },
  {
    question: "Do you offer enterprise solutions?",
    answer:
      "Yes, we offer comprehensive enterprise solutions including API access, bulk processing, custom integrations, dedicated support, and on-premise deployment options. Contact our enterprise team for a customized solution.",
  },
  {
    question: "Can Legal Lens AI replace a lawyer?",
    answer:
      "No, Legal Lens AI is designed to assist and inform, not replace legal professionals. Our AI provides analysis and insights to help you understand legal documents, but we always recommend consulting with qualified attorneys for legal advice and critical decisions.",
  },
  {
    question: "What languages does Legal Lens AI support?",
    answer:
      "We currently support 55+ languages including English, Hindi, and many others. Our multilingual models understand legal terminology and context across different jurisdictions.",
  },
  {
    question: "How much does Legal Lens AI cost?",
    answer:
      "We offer flexible pricing plans including a free tier for basic analysis, professional plans for regular users, and enterprise solutions for organizations. Visit our pricing page or contact sales for detailed information.",
  },
]

export function FAQSection() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-foreground/80">
            Find answers to common questions about Legal Lens AI and our services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass rounded-lg hover:glass-strong transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors rounded-lg"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                {expandedItems.has(index) ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {expandedItems.has(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center glass rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
          <p className="text-foreground/80 mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-purple">
            Contact Support
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
