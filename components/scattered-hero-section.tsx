"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Shield, Zap, Globe, Users, Target, Clock, TrendingUp } from "lucide-react"

export function ScatteredHeroSection() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered Legal Analysis
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                Analyze Legal
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Information
                </span>
                <br />
                Instantly
              </h1>

              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-lg">
                Harness the power of advanced AI to identify legal complexities, analyze documents, and get instant
                insights with <span className="text-primary font-semibold">90% accuracy</span>.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4 mr-2" />
                  Lightning Fast
                </div>
                <div className="flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Brain className="h-4 w-4 mr-2" />
                  AI-Powered
                </div>
                <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Target className="h-4 w-4 mr-2" />
                  90% Accurate
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
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-2xl font-bold text-blue-900">10K+</span>
                </div>
                <p className="text-blue-700 font-medium">Documents Analyzed</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="flex items-center mb-3">
                  <Target className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-2xl font-bold text-green-900">90%</span>
                </div>
                <p className="text-green-700 font-medium">Accuracy Rate</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-lg font-bold text-purple-900">Precise Detection</span>
                </div>
                <p className="text-purple-700 font-medium">Advanced Analysis</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200">
                <div className="flex items-center mb-3">
                  <Globe className="h-6 w-6 text-cyan-600 mr-3" />
                  <span className="text-lg font-bold text-cyan-900">22+ state access of India</span>
                </div>
                <p className="text-cyan-700 font-medium">5+ Languages</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Verified Documents */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-6 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-900 mb-2">10K+</div>
                <p className="text-green-700 font-medium">Verified Documents</p>
              </div>
            </div>

            {/* Legal Issues Detected */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-6 mx-auto">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-900 mb-2">3.2K</div>
                <p className="text-red-700 font-medium">Legal Issues Detected</p>
              </div>
            </div>

            {/* 24/7 AI Analysis */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6 mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">24/7</div>
                <p className="text-blue-700 font-medium">AI Analysis</p>
              </div>
            </div>

            {/* Accuracy Rate */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-6 mx-auto">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">90%</div>
                <p className="text-purple-700 font-medium">Accuracy Rate</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg">
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4 rounded-xl text-lg border-2 bg-transparent">
            View Demo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
