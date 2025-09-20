"use client"

import { Brain, Shield, Zap, Globe, FileText, Search, BarChart3, Users } from "lucide-react"
import { motion } from "framer-motion"

const floatingIcons = [
  { Icon: Brain, color: "text-primary", position: "top-20 left-10", delay: 0 },
  { Icon: Shield, color: "text-secondary", position: "top-40 right-20", delay: 1 },
  { Icon: Zap, color: "text-chart-4", position: "top-60 left-1/4", delay: 2 },
  { Icon: Globe, color: "text-chart-3", position: "bottom-40 right-10", delay: 3 },
  { Icon: FileText, color: "text-primary", position: "bottom-60 left-20", delay: 4 },
  { Icon: Search, color: "text-secondary", position: "top-1/3 right-1/4", delay: 5 },
  { Icon: BarChart3, color: "text-chart-5", position: "bottom-1/3 left-1/3", delay: 6 },
  { Icon: Users, color: "text-chart-3", position: "top-1/2 right-1/3", delay: 7 },
]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} opacity-20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="p-4 glass rounded-full">
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </motion.div>
      ))}

      <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-chart-3/20 to-chart-4/20 rounded-lg rotate-45 animate-bounce-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-chart-5/20 to-primary/20 rounded-full animate-float"></div>
    </div>
  )
}
