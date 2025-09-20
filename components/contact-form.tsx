"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, Loader2 } from "lucide-react"

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "enterprise", label: "Enterprise Solutions" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          inquiryType: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = formData.name && formData.email && formData.message && formData.inquiryType

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-xl p-8 text-center neon-glow"
      >
        <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-foreground/80">
          Thank you for contacting us. We'll get back to you within 2 business hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-8 neon-glow-purple"
    >
      <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
      <p className="text-foreground/80 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="glass border-border/50 focus:border-primary/50 focus:ring-primary/25"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="glass border-border/50 focus:border-primary/50 focus:ring-primary/25"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">
              Company
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="glass border-border/50 focus:border-primary/50 focus:ring-primary/25"
              placeholder="Your company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-foreground">
              Inquiry Type *
            </Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
              <SelectTrigger className="glass border-border/50 focus:border-primary/50 focus:ring-primary/25">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground">
            Message *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="glass border-border/50 focus:border-primary/50 focus:ring-primary/25 min-h-[120px]"
            placeholder="Tell us about your inquiry, questions, or how we can help you..."
            required
          />
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-purple"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 p-4 glass rounded-lg">
        <p className="text-sm text-foreground/60">
          By submitting this form, you agree to our privacy policy. We'll only use your information to respond to your
          inquiry and won't share it with third parties.
        </p>
      </div>
    </motion.div>
  )
}
