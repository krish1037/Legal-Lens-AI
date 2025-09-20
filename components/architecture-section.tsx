"use client"

import { motion } from "framer-motion"
import { Server, Database, Shield, Zap, Globe, Monitor, LucideIcon } from "lucide-react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

interface ArchitectureFeature {
  icon: (props: IconProps) => JSX.Element;
  title: string;
  description: string;
  benefits: string[];
}

const architectureFeatures: ArchitectureFeature[] = [
  {
    icon: (props: IconProps) => <Server {...props} />,
    title: "Microservices Architecture",
    description: "Scalable, maintainable services that can be deployed and updated independently",
    benefits: ["Independent scaling", "Fault isolation", "Technology diversity", "Faster deployments"],
  },
  {
    icon: (props: IconProps) => <Database {...props} />,
    title: "Data Pipeline",
    description: "Robust data processing pipeline with real-time and batch processing capabilities",
    benefits: ["Real-time processing", "Data validation", "Error handling", "Monitoring & alerts"],
  },
  {
    icon: (props: IconProps) => <Shield {...props} />,
    title: "Security First",
    description: "Enterprise-grade security with encryption, authentication, and compliance",
    benefits: ["End-to-end encryption", "Zero-trust architecture", "GDPR compliance", "Regular audits"],
  },
  {
    icon: (props: IconProps) => <Zap {...props} />,
    title: "High Performance",
    description: "Optimized for speed with caching, CDN, and efficient algorithms",
    benefits: ["Sub-second response", "Global CDN", "Intelligent caching", "Load balancing"],
  },
  {
    icon: (props: IconProps) => <Globe {...props} />,
    title: "Global Scale",
    description: "Multi-region deployment with automatic failover and disaster recovery",
    benefits: ["99.9% uptime", "Global presence", "Auto-scaling", "Disaster recovery"],
  },
  {
    icon: (props: IconProps) => <Monitor {...props} />,
    title: "Observability",
    description: "Comprehensive monitoring, logging, and alerting for system health",
    benefits: ["Real-time monitoring", "Distributed tracing", "Custom metrics", "Automated alerts"],
  },
]

export function ArchitectureSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">System Architecture</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Our architecture is designed for scale, security, and reliability to handle millions of document analyses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {architectureFeatures.map((feature, index) => (
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
                  {feature.icon({ className: "h-6 w-6 text-primary" })}
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

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 glass rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">90.9%</div>
              <div className="text-sm text-foreground/60">Uptime SLA</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">&lt; 5s</div>
              <div className="text-sm text-foreground/60">Analysis Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-foreground/60">Requests/Day</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">500ms</div>
              <div className="text-sm text-foreground/60">API Response</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
