"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, MapPin, Phone, Clock } from "lucide-react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

interface ContactMethod {
  icon: (props: IconProps) => JSX.Element;
  title: string;
  value: string;
  description: string;
  link: string;
  color: "primary" | "secondary";
}

const contactMethods: ContactMethod[] = [
  {
    icon: (props: IconProps) => <Mail {...props} />,
    title: "Email",
    value: "krishsharma1037@gmail.com",
    description: "General inquiries and support",
    link: "mailto:krishsharma1037@gmail.com",
    color: "primary",
  },
  {
    icon: (props: IconProps) => <Mail {...props} />,
    title: "Enterprise Sales",
    value: "enterprise@legallens.ai",
    description: "Business and enterprise solutions",
    link: "mailto:enterprise@legallens.ai",
    color: "secondary",
  },
  {
    icon: (props: IconProps) => <Linkedin {...props} />,
    title: "LinkedIn",
    value: "Krish Sharma",
    description: "Connect with us professionally",
    link: "https://www.linkedin.com/in/krish-sharma-1ba645301/",
    color: "primary",
  },
  {
    icon: (props: IconProps) => <Github {...props} />,
    title: "GitHub",
    value: "Krish Sharma",
    description: "Open source contributions",
    link: "https://github.com/krish1037",
    color: "secondary",
  },
]

interface OfficeInfo {
  icon: (props: IconProps) => JSX.Element;
  title: string;
  value: string;
  description: string;
}

const officeInfo: OfficeInfo[] = [
  {
    icon: (props: IconProps) => <MapPin {...props} />,
    title: "Headquarters",
    value: "Jaipur",
    description: "Rajasthan, India",
  },
  {
    icon: (props: IconProps) => <Phone {...props} />,
    title: "Phone",
    value: "+9214589991",
    description: "Business hours only",
  },
  {
    icon: (props: IconProps) => <Clock {...props} />,
    title: "Business Hours",
    value: "9 AM - 6 PM PST",
    description: "Monday to Friday",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
        <p className="text-foreground/80 mb-8">
          Choose the best way to reach us. We're committed to providing excellent support and building lasting
          relationships with our users.
        </p>
      </motion.div>

      {/* Contact Methods */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.title}
            href={method.link}
            target={method.link.startsWith("http") ? "_blank" : undefined}
            rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`block glass rounded-lg p-4 hover:glass-strong transition-all duration-300 group ${
              method.color === "secondary" ? "hover:neon-glow" : "hover:neon-glow-purple"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-lg ${
                  method.color === "secondary" ? "bg-secondary/10" : "bg-primary/10"
                } group-hover:${method.color === "secondary" ? "bg-secondary/20" : "bg-primary/20"} transition-colors`}
              >
                {method.icon({
                  className: `h-5 w-5 ${method.color === "secondary" ? "text-secondary" : "text-primary"}`,
                })}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{method.title}</h4>
                  <span
                    className={`text-sm font-medium ${
                      method.color === "secondary" ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {method.value}
                  </span>
                </div>
                <p className="text-sm text-foreground/60">{method.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Office Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground mb-4">Office Information</h3>
        {officeInfo.map((info, index) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass rounded-lg p-4 hover:glass-strong transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">{info.icon({ className: "h-5 w-5 text-primary" })}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{info.title}</h4>
                  <span className="text-sm font-medium text-primary">{info.value}</span>
                </div>
                <p className="text-sm text-foreground/60">{info.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
