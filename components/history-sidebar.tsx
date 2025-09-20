"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { History, ChevronLeft, ChevronRight, FileText, File, ImageIcon, Clock } from "lucide-react"

interface HistoryItem {
  id: string
  timestamp: Date
  type: "text" | "pdf" | "docx" | "image"
  title: string
  summary: string
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "pdf",
    title: "Employment Contract",
    summary: "Standard employment agreement with non-compete clause...",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "text",
    title: "Lease Agreement",
    summary: "Residential lease with standard terms and conditions...",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "docx",
    title: "Service Contract",
    summary: "Professional services agreement with payment terms...",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    type: "image",
    title: "Legal Notice",
    summary: "Court document regarding property dispute...",
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "docx":
      return File
    case "image":
      return ImageIcon
    default:
      return FileText
  }
}

const formatTimeAgo = (date: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}

export function HistorySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.div
      initial={{ width: isCollapsed ? 60 : 320 }}
      animate={{ width: isCollapsed ? 60 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen sticky top-0 glass-strong border-r border-border/50"
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <History className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">Analysis History</h2>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-foreground/60 hover:text-primary"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* History Items */}
        <div className="flex-1 overflow-y-auto space-y-3">
          <AnimatePresence>
            {!isCollapsed &&
              mockHistory.map((item, index) => {
                const IconComponent = getTypeIcon(item.type)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Card className="glass hover:glass-strong transition-all duration-200 cursor-pointer group">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground text-sm truncate">{item.title}</h3>
                            <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{item.summary}</p>
                            <div className="flex items-center space-x-1 mt-2">
                              <Clock className="h-3 w-3 text-foreground/40" />
                              <span className="text-xs text-foreground/40">{formatTimeAgo(item.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
          </AnimatePresence>

          {/* Collapsed state icons */}
          <AnimatePresence>
            {isCollapsed &&
              mockHistory.slice(0, 4).map((item, index) => {
                const IconComponent = getTypeIcon(item.type)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex justify-center"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 p-0 glass hover:glass-strong hover:neon-glow"
                      title={item.title}
                    >
                      <IconComponent className="h-4 w-4 text-primary" />
                    </Button>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>

        {/* Clear History Button */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                Clear History
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
