"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Gavel, UserPlus, Eye, EyeOff, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bankName: "",
    accountNumber: "",
    easyPayNumber: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would register with your backend here
    console.log("Registration with:", { ...formData, profileImage })

    setIsLoading(false)
    router.push("/login") // Redirect to login page after registration
  }

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Gavel className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BidMaster</span>
          </Link>
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-400 mt-2">Join our community of bidders and sellers</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Registration Form</CardTitle>
            <CardDescription className="text-gray-400">Fill in your details to create an account</CardDescription>
          </CardHeader>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Payment Details
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="personal" className="mt-4">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-image">Profile Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                        {profileImage ? (
                          <>
                            <Image
                              src={profileImage || "/placeholder.svg"}
                              alt="Profile preview"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-0 right-0 bg-black/70 p-1 rounded-full"
                            >
                              <X className="h-3 w-3 text-white" />
                            </button>
                          </>
                        ) : (
                          <Upload className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          id="profile-image"
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-white/20 text-white hover:bg-white/10"
                        >
                          Upload Image
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF, max 2MB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => document.querySelector('[data-value="payment"]')?.click()}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Next: Payment Details
                  </Button>
                </CardFooter>
              </TabsContent>

              <TabsContent value="payment" className="mt-4">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      placeholder="e.g. Bank of America"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Bank Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="e.g. 1234567890"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="easyPayNumber">EasyPay Number</Label>
                    <Input
                      id="easyPayNumber"
                      name="easyPayNumber"
                      placeholder="e.g. EP1234567"
                      value={formData.easyPayNumber}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                      required
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor="agreeTerms" className="text-sm font-medium leading-none">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="personal"]')?.click()}
                    className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 px-5 py-6 h-auto w-full sm:w-auto text-base mobile-friendly-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Personal Info
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 py-6 h-auto w-full sm:w-auto text-base"
                    disabled={isLoading || !formData.agreeTerms}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </TabsContent>
            </form>
          </Tabs>
        </Card>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

