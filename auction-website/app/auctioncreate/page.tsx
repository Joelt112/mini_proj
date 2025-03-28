"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { createAuction } from "@/store/slices/auctionSlice"
import { AppDispatch, RootState } from "@/store/store"
import {
  Gavel,
  Upload,
  X,
  Clock,
  Tag,
  ImageIcon,
  DollarSign,
  Calendar,
  CheckCircle2,
  Info,
  AlertCircle,
  ChevronDown,
  Route,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"

// Mock categories and conditions for the example
const categories = [
  "Art",
  "Collectibles",
  "Electronics",
  "Fashion",
  "Furniture",
  "Jewelry",
  "Sports",
  "Vehicles",
  "Watches",
  "Other",
]

const conditions = ["New", "Like New", "Excellent", "Good", "Fair", "Poor"]

export default function CreateAuctionPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.auction)

  const [isLoading, setIsLoading] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    startingBid: "",
    description: "",
    startTime: null as Date | null,
    endTime: null as Date | null,
    image: null as File | null,
  })

  // Update form progress based on filled fields
  const updateProgress = () => {
    const requiredFields = ["title", "category", "condition", "startingBid", "description", "startTime", "endTime"]
    const filledFields = requiredFields.filter((field) => formData[field as keyof typeof formData]).length
    const progress = Math.floor((filledFields / requiredFields.length) * 100)
    setFormProgress(progress)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setTimeout(updateProgress, 0)
  }

  const handleDateChange = (date: Date | null, field: "startTime" | "endTime") => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }))
    setTimeout(updateProgress, 0)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result)
          setFormData((prev) => ({
            ...prev,
            image: file,
          }))
          updateProgress()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setPreviewImage(null)
    setFormData((prev) => ({
      ...prev,
      image: null,
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    updateProgress()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Format dates into the desired string format
    const formattedStartTime = formData.startTime
      ? format(
          formData.startTime,
          "EEE MMM dd yyyy HH:mm:ss 'GMT'xx '(India Standard Time)'"
        )
      : "";
    const formattedEndTime = formData.endTime
      ? format(
          formData.endTime,
          "EEE MMM dd yyyy HH:mm:ss 'GMT'xx '(India Standard Time)'"
        )
      : "";
  
    // Create FormData object for submission
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === "image" && value instanceof File) {
          submitData.append(key, value);
        } else if (key === "startTime") {
          submitData.append(key, formattedStartTime);
        } else if (key === "endTime") {
          submitData.append(key, formattedEndTime);
        } else if (typeof value === "string") {
          submitData.append(key, value);
        }
      }
    });
  
    try {
      // Dispatch the createAuction action
      const action = await dispatch(createAuction(submitData));
      router.push("/");
    } catch (error) {
      console.error("Auction creation failed:", error);
      alert("Auction creation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 sm:px-6 max-w-5xl">
          {/* Header section with title and progress */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-primary/20 text-primary">Auctioneer</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Create Auction</h1>
                <p className="text-gray-400 max-w-xl">
                  List your item for auction and let the bidding begin. Provide detailed information to attract more
                  bidders.
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

          {/* Main form card */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl text-white">
            <CardHeader>
              <CardTitle className="text-xl text-white">Auction Details</CardTitle>
              <CardDescription className="text-gray-400">Fill in the details about your auction item</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-8">
                {/* Basic item details section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Item Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">
                        Title <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Vintage Rolex Submariner"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">
                        Category <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                        >
                          <option value="" disabled className="bg-black">
                            Select Category
                          </option>
                          {categories.map((category) => (
                            <option key={category} value={category} className="bg-black">
                              {category}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition" className="text-white">
                        Condition <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <select
                          id="condition"
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          required
                          className="w-full h-10 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                        >
                          <option value="" disabled className="bg-black">
                            Select Condition
                          </option>
                          {conditions.map((condition) => (
                            <option key={condition} value={condition} className="bg-black">
                              {condition}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startingBid" className="text-white">
                        Starting Bid ($) <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="startingBid"
                          name="startingBid"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.startingBid}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 pl-10 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide a detailed description of your item..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
                    />
                    <p className="text-xs text-gray-400">
                      Include details about the item's history, features, and any imperfections.
                    </p>
                  </div>
                </div>

                {/* Auction timing section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Auction Timing</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="text-white">
                        Start Time <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <DatePicker
                          selected={formData.startTime}
                          onChange={(date) => handleDateChange(date, "startTime")}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="w-full text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime" className="text-white">
                        End Time <span className="text-primary">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <DatePicker
                          selected={formData.endTime}
                          onChange={(date) => handleDateChange(date, "endTime")}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="w-full text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Auction Duration Tips</h4>
                        <p className="text-sm text-gray-300">
                          We recommend setting auctions for 5-7 days to maximize visibility and bidding. Auctions ending
                          on weekends often receive more bids.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image upload section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Item Images</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      {previewImage ? (
                        <div className="relative">
                          <Image
                            src={previewImage || "/placeholder.svg"}
                            alt="Item preview"
                            width={400}
                            height={300}
                            className="mx-auto max-h-[300px] w-auto object-contain rounded-md"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-black/70 p-1 rounded-full hover:bg-primary/80 transition-colors"
                          >
                            <X className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer py-8">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm text-gray-400 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    {!previewImage && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Select Image
                      </Button>
                    )}

                    <p className="text-xs text-gray-400">
                      High-quality images increase your chances of selling. Include multiple angles if possible.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  disabled={isLoading || formProgress < 100}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Gavel className="h-5 w-5" />
                  )}
                  {isLoading ? "Creating Auction..." : "Create Auction"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Tips section */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Tips for a Successful Auction
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Use a clear, descriptive title that includes brand names and key features</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Set a reasonable starting bid to attract initial interest</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Include multiple high-quality photos from different angles</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Be honest about the condition and any defects</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Respond promptly to questions from potential bidders</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}