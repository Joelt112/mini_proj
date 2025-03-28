"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { postCommissionProof } from "@/store/slices/commissionSlice"
import { AppDispatch, RootState } from "@/store/store"
import { Upload, DollarSign, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SubmitCommissionPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.commission)

  const [isLoading, setIsLoading] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    amount: "",
    comment: "",
    proof: null as File | null,
  })

  const updateProgress = () => {
    const requiredFields = ["proof", "amount", "comment"]
    const filledFields = requiredFields.filter((field) => {
      if (field === "proof") return formData.proof !== null
      return formData[field as keyof typeof formData] !== ""
    }).length
    const progress = Math.floor((filledFields / requiredFields.length) * 100)
    setFormProgress(progress)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    updateProgress()
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewFile(file.name)
      setFormData((prev) => ({
        ...prev,
        proof: file,
      }))
      updateProgress()
    }
  }

  const removeFile = () => {
    setPreviewFile(null)
    setFormData((prev) => ({
      ...prev,
      proof: null,
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    updateProgress()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const submitData = new FormData()
    submitData.append("amount", formData.amount)
    submitData.append("comment", formData.comment)
    if (formData.proof) {
      submitData.append("proof", formData.proof)
    }

    try {
      await dispatch(postCommissionProof(submitData))
      setShowSuccess(true)
      setFormData({ amount: "", comment: "", proof: null })
      setPreviewFile(null)
      setFormProgress(0)
    } catch (error) {
      console.error("Submission failed:", error)
      alert("Submission failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-md w-full animate-in fade-in-zoom">
            <div className="flex flex-col items-center text-center gap-4">
              <CheckCircle2 className="h-12 w-12 text-green-400" />
              <h3 className="text-2xl font-bold text-white">Submission Successful!</h3>
              <p className="text-gray-300">
                Your commission proof has been successfully submitted. You will receive a confirmation email shortly.
              </p>
              <Button
                onClick={() => {
                  setShowSuccess(false)
                  router.push("/")
                }}
                className="mt-4 w-full bg-primary hover:bg-primary/90"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 py-12">
        <div className="container px-4 sm:px-6 max-w-5xl">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Submit Commission Proof</h1>
                <p className="text-gray-400 max-w-xl">
                  Submit your payment proof for commission. Please provide accurate information and supporting documents.
                </p>
              </div>

              <div className="w-full md:w-48">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Completion</span>
                  <span className="text-primary font-medium">{formProgress}%</span>
                </div>
                <Progress value={formProgress} className="h-2 bg-white/10" />
              </div>
            </div>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl text-white">
            <CardHeader>
              <CardTitle className="text-xl text-white">Proof Submission</CardTitle>
              <CardDescription className="text-gray-400">
                Provide details about your commission payment
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-white">
                        Amount <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 pl-10 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment" className="text-white">
                        Comment <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Add any additional comments..."
                        value={formData.comment}
                        onChange={handleChange}
                        required
                        className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proof" className="text-white">
                        Payment Proof <span className="text-primary">*</span>
                      </Label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        {previewFile ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="h-8 w-8 text-primary" />
                            <div className="text-left">
                              <p className="text-sm font-medium">{previewFile}</p>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="text-sm text-red-400 hover:text-red-300 mt-1"
                              >
                                Remove File
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer py-8">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium">Click to upload proof document</p>
                            <p className="text-sm text-gray-400 mt-1">PDF, PNG, JPG (MAX. 5MB)</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          id="proof"
                          name="proof"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto border-white/20 text-white bg-slate-900 hover:bg-white/10"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  disabled={isLoading || formProgress < 66}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                  {isLoading ? "Submitting..." : "Submit Proof"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Submission Guidelines
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Ensure the payment proof is clear and readable</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Double-check the amount matches your payment</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Include any transaction IDs or references in comments</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Allowed file types: PDF, PNG, JPG (max 5MB)</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}