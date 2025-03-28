"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Gavel,
  UserPlus,
  Eye,
  EyeOff,
  Upload,
  X,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Building,
  DollarSign,
  ChevronsRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useDispatch, useSelector } from "react-redux"
import { register } from "@/store/slices/userSlice"
import { AppDispatch, RootState } from "@/store/store"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [formProgress, setFormProgress] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string>("")
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const { loading, isAuthenticated } = useSelector((state: RootState) => state.user)

  // Form state
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    easypaisaAccountNumber: "",
    paypalEmail: "",
    agreeTerms: false,
  })

  // Update form progress based on filled fields
  useEffect(() => {
    const requiredFields = ["userName", "email", "phone", "address", "role", "password"]
    const filledRequiredFields = requiredFields.filter((field) => formData[field as keyof typeof formData]).length
    const progress = Math.floor((filledRequiredFields / requiredFields.length) * 100)
    setFormProgress(progress)
  }, [formData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof reader.result === "string") {
          setProfileImagePreview(reader.result)
          setProfileImage(file)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setProfileImagePreview("")
    const fileInput = document.getElementById("profile-image") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Create FormData object
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "boolean") {
        submitData.append(key, String(value))
      }
    })

    if (profileImage) {
      submitData.append("profileImage", profileImage)
    }

    try {
      // Dispatch the registration action
      const action = await dispatch(register(submitData))
      router.push("/login")
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const goToNextTab = () => {
    if (activeTab === "personal") {
      setActiveTab("payment")
    }
  }

  const goToPrevTab = () => {
    if (activeTab === "payment") {
      setActiveTab("personal")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-primary/20 py-10 px-4 sm:px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Gavel className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-white">BidMaster</span>
          </Link>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Create Your Account</h1>
          <p className="text-gray-400 mt-2">Join our community of bidders and sellers</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-white">Registration Form</CardTitle>
                <CardDescription className="text-gray-400">Fill in your details to create an account</CardDescription>
              </div>
              <div className="w-32">
                <Progress value={formProgress} className="h-2 bg-white/10"/>
                <p className="text-xs text-gray-400 mt-1 text-right">{formProgress}% Complete</p>
              </div>
            </div>
          </CardHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1 rounded-t-none">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all duration-200"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Details
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              {/* Personal Info Tab */}
              <TabsContent value="personal" className="mt-4 space-y-4 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="text-white flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="userName"
                      name="userName"
                      placeholder="John Doe"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St, City, Country"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white flex items-center">
                      <Building className="h-4 w-4 mr-2 text-primary" />
                      Role
                    </Label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="" disabled className="bg-black">
                        Select Role
                      </option>
                      <option value="Auctioneer" className="bg-black">
                        Auctioneer
                      </option>
                      <option value="Bidder" className="bg-black">
                        Bidder
                      </option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.role === "Auctioneer"
                        ? "As an Auctioneer, you'll be able to list items for auction."
                        : formData.role === "Bidder"
                          ? "As a Bidder, you'll be able to place bids on auction items."
                          : "Select your role in the platform"}
                    </p>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-primary" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 pr-10 focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">Password must be at least 8 characters long</p>
                  </div>
                </div>

                {/* Profile Image Upload */}
                <div className="space-y-2 pt-4">
                  <Label htmlFor="profile-image" className="text-white">
                    Profile Image
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/20">
                      {profileImagePreview ? (
                        <>
                          <Image
                            src={profileImagePreview || "/placeholder.svg"}
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
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("profile-image")?.click()}
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        Upload Image
                      </Button>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF, max 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="pt-6 flex justify-end">
                  <Button
                    type="button"
                    onClick={goToNextTab}
                    className="bg-primary hover:bg-primary/90 text-white group"
                  >
                    Next: Payment Details
                    <ChevronsRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </TabsContent>

              {/* Payment Details Tab */}
              <TabsContent value="payment" className="mt-4 space-y-6 px-6">
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20 mb-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Payment Method Details
                  </h3>
                  <p className="text-sm text-gray-300">
                    {formData.role === "Auctioneer"
                      ? "As an Auctioneer, please provide your payment details below to receive payments from successful auctions."
                      : "Payment details are only required for Auctioneers. As a Bidder, you can skip this section."}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Bank Account Details */}
                  <div>
                    <h3 className="text-lg font-medium mb-4 border-b border-white/10 pb-2 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-primary" />
                      Bank Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Bank Name */}
                      <div className="space-y-2">
                        <Label htmlFor="bankName" className="text-white">
                          Bank Name
                        </Label>
                        <select
                          id="bankName"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          disabled={formData.role !== "Auctioneer"}
                          className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
                        >
                          <option value="" className="bg-black">
                            Select Your Bank
                          </option>
                          <option value="SBI" className="bg-black">
                            SBI
                          </option>
                          <option value="HDFC" className="bg-black">
                            HDFC
                          </option>
                          <option value="POSTOFFICE" className="bg-black">
                            POSTOFFICE
                          </option>
                          <option value="Allied Bank" className="bg-black">
                            Allied Bank
                          </option>
                        </select>
                      </div>

                      {/* Account Number */}
                      <div className="space-y-2">
                        <Label htmlFor="bankAccountNumber" className="text-white">
                          Account Number / IBAN
                        </Label>
                        <Input
                          id="bankAccountNumber"
                          name="bankAccountNumber"
                          placeholder="e.g. 1234567890"
                          value={formData.bankAccountNumber}
                          onChange={handleChange}
                          disabled={formData.role !== "Auctioneer"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 disabled:opacity-50 focus:border-primary"
                        />
                      </div>

                      {/* Account Holder Name */}
                      <div className="space-y-2">
                        <Label htmlFor="bankAccountName" className="text-white">
                          Account Holder Name
                        </Label>
                        <Input
                          id="bankAccountName"
                          name="bankAccountName"
                          placeholder="e.g. John Doe"
                          value={formData.bankAccountName}
                          onChange={handleChange}
                          disabled={formData.role !== "Auctioneer"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 disabled:opacity-50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alternative Payment Methods */}
                  <div>
                    <h3 className="text-lg font-medium mb-4 border-b border-white/10 pb-2 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Alternative Payment Methods
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Easypaisa Account Number */}
                      <div className="space-y-2">
                        <Label htmlFor="easypaisaAccountNumber" className="text-white">
                          Easypaisa Account Number
                        </Label>
                        <Input
                          id="easypaisaAccountNumber"
                          name="easypaisaAccountNumber"
                          placeholder="e.g. 03001234567"
                          value={formData.easypaisaAccountNumber}
                          onChange={handleChange}
                          disabled={formData.role !== "Auctioneer"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 disabled:opacity-50 focus:border-primary"
                        />
                      </div>

                      {/* PayPal Email */}
                      <div className="space-y-2">
                        <Label htmlFor="paypalEmail" className="text-white">
                          PayPal Email
                        </Label>
                        <Input
                          id="paypalEmail"
                          name="paypalEmail"
                          type="email"
                          placeholder="e.g. your.name@example.com"
                          value={formData.paypalEmail}
                          onChange={handleChange}
                          disabled={formData.role !== "Auctioneer"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 disabled:opacity-50 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
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

                {/* Navigation Buttons */}
                <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPrevTab}
                    className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
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
                      className="mr-2"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Personal Info
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 py-6 h-auto text-base"
                    disabled={isLoading || !formData.agreeTerms}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
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