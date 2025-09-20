"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ImageIcon, FileIcon, Loader2, ChevronDown, ChevronUp } from "lucide-react"

interface AnalysisResult {
  id: string
  timestamp: Date
  type: "text" | "pdf" | "docx" | "image"
  summary: string
  keyPoints: string[]
  legalConcepts: string[]
  recommendations: string[]
}

export function QueryInterface() {
  const [activeTab, setActiveTab] = useState("text")
  const [textInput, setTextInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["summary"]))

  const handleAnalyze = async () => {
    if (!textInput.trim()) return

    setIsAnalyzing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResult: AnalysisResult = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: activeTab as any,
      summary:
        "This appears to be a standard employment contract with several key provisions. The document establishes an at-will employment relationship with a 90-day probationary period. Notable clauses include confidentiality agreements, non-compete restrictions, and intellectual property assignments.",
      keyPoints: [
        "At-will employment relationship established",
        "90-day probationary period specified",
        "Salary: $75,000 annually with quarterly review potential",
        "Standard benefits package included (health, dental, 401k)",
        "40-hour work week with flexible scheduling options",
      ],
      legalConcepts: [
        "At-Will Employment: Either party can terminate without cause",
        "Confidentiality Agreement: Protects company proprietary information",
        "Non-Compete Clause: 12-month restriction within 50-mile radius",
        "Intellectual Property Assignment: Work-related creations belong to company",
        "Dispute Resolution: Mandatory arbitration for employment disputes",
      ],
      recommendations: [
        "Review the non-compete clause carefully - 12 months may be enforceable depending on your state",
        "Ensure you understand what constitutes 'confidential information'",
        "Consider negotiating the intellectual property clause if you have existing IP",
        "Verify that the arbitration clause allows for attorney fee recovery",
        "Request clarification on the performance review process and criteria",
      ],
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name)
    }
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass-strong border-border/50 neon-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Legal Document Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 glass">
                  <TabsTrigger value="text" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="pdf" className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4" />
                    <span>PDF</span>
                  </TabsTrigger>
                  <TabsTrigger value="docx" className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4" />
                    <span>DOCX</span>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Image</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Paste your legal document text here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[200px] glass border-border/50 focus:border-primary/50 focus:ring-primary/25"
                  />
                </TabsContent>

                <TabsContent value="pdf" className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center glass hover:glass-strong transition-all duration-300">
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-foreground/80 mb-2">Drop your PDF file here or click to browse</p>
                    <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="pdf-upload" />
                    <label htmlFor="pdf-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        Choose PDF File
                      </Button>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="docx" className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center glass hover:glass-strong transition-all duration-300">
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-foreground/80 mb-2">Drop your DOCX file here or click to browse</p>
                    <input type="file" accept=".docx" onChange={handleFileUpload} className="hidden" id="docx-upload" />
                    <label htmlFor="docx-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        Choose DOCX File
                      </Button>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center glass hover:glass-strong transition-all duration-300">
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-foreground/80 mb-2">Drop your image file here or click to browse</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        Choose Image File
                      </Button>
                    </label>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (activeTab === "text" && !textInput.trim())}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-purple"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Document...
                  </>
                ) : (
                  "Analyze Document"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card className="glass-strong border-border/50 neon-glow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">Analysis Results</CardTitle>
                  <p className="text-sm text-foreground/60">Analyzed on {analysisResult.timestamp.toLocaleString()}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleSection("summary")}
                      className="flex items-center justify-between w-full text-left p-3 glass rounded-lg hover:glass-strong transition-all duration-200"
                    >
                      <h3 className="font-semibold text-foreground">Executive Summary</h3>
                      {expandedSections.has("summary") ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.has("summary") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-foreground/80 p-3 glass rounded-lg">{analysisResult.summary}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleSection("keyPoints")}
                      className="flex items-center justify-between w-full text-left p-3 glass rounded-lg hover:glass-strong transition-all duration-200"
                    >
                      <h3 className="font-semibold text-foreground">Key Points</h3>
                      {expandedSections.has("keyPoints") ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.has("keyPoints") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 p-3 glass rounded-lg">
                            {analysisResult.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-foreground/80">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Legal Concepts */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleSection("legalConcepts")}
                      className="flex items-center justify-between w-full text-left p-3 glass rounded-lg hover:glass-strong transition-all duration-200"
                    >
                      <h3 className="font-semibold text-foreground">Legal Concepts Explained</h3>
                      {expandedSections.has("legalConcepts") ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.has("legalConcepts") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 p-3 glass rounded-lg">
                            {analysisResult.legalConcepts.map((concept, index) => (
                              <div key={index} className="p-3 glass rounded-lg">
                                <p className="text-foreground/80">{concept}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleSection("recommendations")}
                      className="flex items-center justify-between w-full text-left p-3 glass rounded-lg hover:glass-strong transition-all duration-200"
                    >
                      <h3 className="font-semibold text-foreground">Recommendations</h3>
                      {expandedSections.has("recommendations") ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedSections.has("recommendations") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 p-3 glass rounded-lg">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-foreground/80">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
