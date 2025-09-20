"use client"

import { motion } from "framer-motion"
import { Cpu, Database, Network, Code, Brain, Shield, Zap, Globe } from "lucide-react"
import type { IconType } from "react-icons"

const techHighlights = [
  {
    icon: Cpu as IconType,
    title: "Advanced AI",
    description: "State-of-the-art NLP models",
    color: "blue",
  },
  {
    icon: Database as IconType,
    title: "RAG System",
    description: "Retrieval-augmented generation",
    color: "green",
  },
  {
    icon: Network as IconType,
    title: "Vision Models",
    description: "Document image processing",
    color: "purple",
  },
  {
    icon: Code as IconType,
    title: "Modern Stack",
    description: "Scalable architecture",
    color: "orange",
  },
]

export function TechHero() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Cpu className="h-4 w-4 mr-2" />
                Technical Excellence
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                Our
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Technical Approach
                </span>
                <br />
                & Innovation
              </h1>

              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-lg">
                Discover the cutting-edge AI technology and architecture that powers Legal Lens AI's document analysis
                capabilities with <span className="text-primary font-semibold">unprecedented accuracy</span>.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Brain className="h-4 w-4 mr-2" />
                  AI-Powered
                </div>
                <div className="flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4 mr-2" />
                  Lightning Fast
                </div>
                <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure & Scalable
                </div>
              </div>
            </motion.div>

            {/* Bottom Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="flex items-center mb-3">
                  <Cpu className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-2xl font-bold text-blue-900">Advanced</span>
                </div>
                <p className="text-blue-700 font-medium">AI Models</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="flex items-center mb-3">
                  <Database className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-2xl font-bold text-green-900">RAG</span>
                </div>
                <p className="text-green-700 font-medium">System</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Network className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-2xl font-bold text-purple-900">Vision</span>
                </div>
                <p className="text-purple-700 font-medium">Models</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                <div className="flex items-center mb-3">
                  <Code className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="text-2xl font-bold text-orange-900">Modern</span>
                </div>
                <p className="text-orange-700 font-medium">Stack</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Tech Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {/* AI Processing Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6 mx-auto">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">AI</div>
                <p className="text-blue-700 font-medium">Processing</p>
              </div>
            </div>

            {/* Security Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-green-50 to-sky-100 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-6 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-900 mb-2">Secure</div>
                <p className="text-green-700 font-medium">Architecture</p>
              </div>
            </div>

            {/* Performance Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-6 mx-auto">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">Fast</div>
                <p className="text-purple-700 font-medium">Performance</p>
              </div>
            </div>

            {/* Global Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-rose-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6 mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-900 mb-2">Proudly</div>
                <p className="text-orange-700 font-medium">Indian</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
