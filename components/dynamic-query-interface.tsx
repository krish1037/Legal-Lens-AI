"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, ImageIcon, MessageSquare, Sparkles, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function DynamicQueryInterface() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const handleAnalysis = async () => {
    if (!query.trim()) {
      setError("Please enter a query or upload a document")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Connect to your existing Flask API backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Analysis failed")
      // Fallback to mock data if backend is not available
      setAnalysisResult({
        query: query.trim(),
        legal_entities: ["Sample Entity"],
        context: "Mock context for demo",
        llm_answer: {
          summary: "This is a demo response. Please ensure your backend is running on port 5000.",
          explanation: "The backend server needs to be started to get real analysis results."
        },
        citations: ["Demo Citation"]
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setAnalysisResult(null)
    setError(null)
    setQuery("")
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left side - Feature cards scattered */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="transform rotate-3 hover:rotate-0 transition-transform duration-300"
            >
              <Card className="glass-strong hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Document Analysis</h3>
                      <p className="text-sm text-blue-700">PDF, DOCX, TXT</p>
                    </div>
                  </div>
                  <img
                    src="/legal-document-being-analyzed-by-ai.jpg"
                    alt="Document Analysis"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="transform -rotate-2 ml-6 hover:rotate-0 transition-transform duration-300"
            >
              <Card className="glass-strong hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-purple-500 rounded-xl">
                      <ImageIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900">Image Recognition</h3>
                      <p className="text-sm text-purple-700">JPG, PNG, WEBP</p>
                    </div>
                  </div>
                  <img
                    src="/ai-scanning-legal-document-image-with-ocr.jpg"
                    alt="Image Recognition"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Center - Main interface */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-strong border-2 border-primary/20 shadow-2xl">
                <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">Legal Analysis Interface</CardTitle>
                  <p className="text-muted-foreground">Upload your legal documents for instant AI analysis</p>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
                      <TabsTrigger
                        value="upload"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        Upload
                      </TabsTrigger>
                      <TabsTrigger
                        value="text"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        Text
                      </TabsTrigger>
                      <TabsTrigger
                        value="url"
                        className="data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        URL
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="space-y-6">
                      <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors bg-gradient-to-br from-primary/5 to-secondary/5">
                        <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2 text-lg">Drop files here or click to upload</p>
                        <p className="text-muted-foreground">Supports PDF, DOCX, TXT, JPG, PNG</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="text" className="space-y-6">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-40 p-6 border border-border rounded-2xl bg-background text-foreground resize-none focus:ring-2 focus:ring-primary/25 focus:border-primary text-lg"
                        placeholder="Paste your legal text here for analysis..."
                      />
                    </TabsContent>

                    <TabsContent value="url" className="space-y-6">
                      <input
                        type="url"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-6 border border-border rounded-2xl bg-background text-foreground focus:ring-2 focus:ring-primary/25 focus:border-primary text-lg"
                        placeholder="Enter document URL..."
                      />
                    </TabsContent>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200"
                      >
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <AnimatePresence>
                      {!analysisResult && (
                        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Button
                            onClick={handleAnalysis}
                            disabled={isAnalyzing}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl text-xl font-semibold shadow-lg"
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                Analyzing with AI...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-3 h-6 w-6" />
                                Start Legal Analysis
                              </>
                            )}
                          </Button>
                        </motion.div>
                      )}

                      {analysisResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center justify-center space-x-3 text-green-600 bg-green-50 p-4 rounded-xl border border-green-200">
                            <CheckCircle className="h-6 w-6" />
                            <span className="font-semibold text-lg">Analysis Complete!</span>
                          </div>

                          <div className="glass-strong p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
                            <h4 className="font-bold text-foreground mb-4 text-xl">Legal Analysis Results:</h4>
                            
                            {/* Query Display */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-1">Query:</p>
                              <p className="font-medium text-foreground">{analysisResult.query}</p>
                            </div>

                            {/* Legal Entities */}
                            {analysisResult.legal_entities && analysisResult.legal_entities.length > 0 && (
                              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600 mb-2 font-medium">Detected Legal Entities:</p>
                                <div className="flex flex-wrap gap-2">
                                  {analysisResult.legal_entities.map((entity: any, index: number) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                      {typeof entity === 'object' ? entity.reference || entity.text : entity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* LLM Answer */}
                            {analysisResult.llm_answer && (
                              <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                                <p className="text-green-900 font-medium mb-2">AI Analysis:</p>
                                {analysisResult.llm_answer.summary && (
                                  <div className="mb-3">
                                    <p className="text-green-800 font-medium text-sm mb-1">Summary:</p>
                                    <p className="text-green-700">{analysisResult.llm_answer.summary}</p>
                                  </div>
                                )}
                                {analysisResult.llm_answer.explanation && (
                                  <div>
                                    <p className="text-green-800 font-medium text-sm mb-1">Explanation:</p>
                                    <p className="text-green-700">{analysisResult.llm_answer.explanation}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Context */}
                            {analysisResult.context && (
                              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                                <p className="text-purple-600 font-medium text-sm mb-2">Context:</p>
                                <p className="text-purple-700 text-sm">{analysisResult.context}</p>
                              </div>
                            )}

                            {/* Citations */}
                            {analysisResult.citations && analysisResult.citations.length > 0 && (
                              <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                                <p className="text-orange-600 font-medium text-sm mb-2">Citations:</p>
                                <div className="space-y-1">
                                  {analysisResult.citations.map((citation: any, index: number) => (
                                    <p key={index} className="text-orange-700 text-xs">
                                      • {typeof citation === 'object' ? JSON.stringify(citation) : citation}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <Button
                            onClick={resetAnalysis}
                            variant="outline"
                            className="w-full py-4 rounded-xl text-lg border-2 bg-transparent"
                          >
                            Analyze Another Document
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right side - More feature cards scattered */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="transform rotate-2 mr-6 hover:rotate-0 transition-transform duration-300"
            >
              <Card className="glass-strong hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-500 rounded-xl">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">AI Insights</h3>
                      <p className="text-sm text-green-700">Smart Analysis</p>
                    </div>
                  </div>
                  <img
                    src="/ai-providing-legal-insights-and-recommendations.jpg"
                    alt="AI Insights"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="transform -rotate-3 hover:rotate-0 transition-transform duration-300"
            >
              <Card className="glass-strong hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-orange-500 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-900">Compliance Check</h3>
                      <p className="text-sm text-orange-700">Auto Verification</p>
                    </div>
                  </div>
                  <img
                    src="/legal-compliance-dashboard-with-checkmarks.jpg"
                    alt="Compliance Check"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
