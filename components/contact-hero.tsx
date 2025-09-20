"use client"

import { motion } from "framer-motion"
import { MessageCircle, Users, Clock, Mail, Phone, MapPin, Shield, Zap } from "lucide-react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

interface SupportStat {
  icon: (props: IconProps) => JSX.Element;
  value: string;
  label: string;
  description: string;
  color: string;
}

const supportStats: SupportStat[] = [
  {
    icon: (props: IconProps) => <MessageCircle {...props} />,
    value: "&lt; 2h",
    label: "Response Time",
    description: "Average email response",
    color: "blue",
  },
  {
    icon: (props: IconProps) => <Users {...props} />,
    value: "24/7",
    label: "Support Available",
    description: "Round-the-clock assistance",
    color: "green",
  },
  {
    icon: (props: IconProps) => <Clock {...props} />,
    value: "99%",
    label: "Satisfaction Rate",
    description: "Customer satisfaction",
    color: "purple",
  },
]

export function ContactHero() {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <MessageCircle className="h-4 w-4 mr-2" />
                Get in Touch
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                Get in
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Touch
                </span>
                <br />
                With Us
              </h1>

              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-lg">
                Have questions about Legal Lens AI? Need support or want to discuss enterprise solutions? We're here to
                help with <span className="text-primary font-semibold">24/7 support</span>.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Mail className="h-4 w-4 mr-2" />
                  Fast Response
                </div>
                <div className="flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  <Users className="h-4 w-4 mr-2" />
                  24/7 Support
                </div>
                <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure & Private
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
                  <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-2xl font-bold text-blue-900">&lt; 2h</span>
                </div>
                <p className="text-blue-700 font-medium">Response Time</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="flex items-center mb-3">
                  <Users className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-2xl font-bold text-green-900">24/7</span>
                </div>
                <p className="text-green-700 font-medium">Support</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Clock className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-2xl font-bold text-purple-900">99%</span>
                </div>
                <p className="text-purple-700 font-medium">Satisfaction</p>
              </div>

              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                <div className="flex items-center mb-3">
                  <Zap className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="text-2xl font-bold text-orange-900">Fast</span>
                </div>
                <p className="text-orange-700 font-medium">Resolution</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Email Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6 mx-auto">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">Email</div>
                <p className="text-blue-700 font-medium">Support</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-green-50 to-sky-100 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-6 mx-auto">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-900 mb-2">Phone</div>
                <p className="text-green-700 font-medium">Support</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-6 mx-auto">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">India</div>
                <p className="text-purple-700 font-medium">Presence</p>
              </div>
            </div>

            {/* Security Card */}
            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-rose-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-900 mb-2">Secure</div>
                <p className="text-orange-700 font-medium">Communication</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
