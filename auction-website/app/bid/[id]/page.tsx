"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  Share2,
  Eye,
  AlertCircle,
  ChevronRight,
  Award,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getAuctionDetail } from "@/store/slices/auctionSlice"
import { placeBid } from "@/store/slices/bidSlice"
import { RootState, AppDispatch } from "@/store/store"

export default function AuctionDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, auctionDetail, auctionBidders = [] } = useSelector(
    (state: RootState) => state.auction
  )
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  const [bidAmount, setBidAmount] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [bidStatus, setBidStatus] = useState<null | "success" | "error">(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetail(id as string))
    }
  }, [id, dispatch])

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!auctionDetail.endTime) return
      const difference = new Date(auctionDetail.endTime).getTime() - Date.now()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [auctionDetail.endTime])

  useEffect(() => {
    if (auctionDetail.currentBid) {
      setBidAmount(auctionDetail.currentBid + 10)
    }
  }, [auctionDetail.currentBid])

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (bidAmount > auctionDetail.currentBid) {
      const formData = new FormData()
      formData.append("amount", bidAmount.toString())
      dispatch(placeBid(id as string, formData))
        .then(() => {
          setBidStatus("success")
          dispatch(getAuctionDetail(id as string))
        })
        .catch(() => setBidStatus("error"))
        .finally(() => setIsLoading(false))
    } else {
      setBidStatus("error")
      setIsLoading(false)
    }

    setTimeout(() => setBidStatus(null), 3000)
  }

  const adjustBid = (amount: number) => {
    const newAmount = bidAmount + amount
    if (newAmount > auctionDetail.currentBid) {
      setBidAmount(newAmount)
    }
  }

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-red-900 bg-black px-4 py-4">
        <div className="container mx-auto">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-600" />
            <Link href="/bid" className="text-gray-400 hover:text-white">
              Auctions
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-600" />
            <span className="text-red-500">{auctionDetail.title}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link href="/bid" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Auctions
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column - Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-red-900 bg-gray-900">
              <Image
                src={auctionDetail.image?.url || "/placeholder.svg"}
                alt={auctionDetail.title || "Auction item"}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right column - Auction details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">{auctionDetail.title}</h1>
              <div className="mt-2 flex items-center">
                <span className="mr-3 rounded bg-green-900 px-2 py-1 text-xs font-semibold text-green-400">
                  {auctionDetail.category || "General"}
                </span>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="rounded-lg border border-red-900 bg-gradient-to-r from-black to-red-950 p-4">
              <h3 className="mb-2 text-sm font-semibold uppercase text-gray-400">Auction Ends In:</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="rounded bg-black p-2">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400">{unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bidding section */}
            <div className="rounded-lg border border-red-900 bg-black p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase text-gray-400">Current Bid:</h3>
                  <div className="text-3xl font-bold text-red-500">
                    ${auctionDetail.currentBid?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-400">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                {auctionBidders.length} bids so far
              </div>
            </div>

            {/* Bid form */}
            <form onSubmit={handleBidSubmit} className="rounded-lg border border-red-900 bg-black p-4">
              {bidStatus === "success" && (
                <div className="mb-4 flex items-center rounded-md bg-green-900/30 p-3 text-sm text-green-400">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Bid placed successfully!
                </div>
              )}
              {bidStatus === "error" && (
                <div className="mb-4 flex items-center rounded-md bg-red-900/30 p-3 text-sm text-red-400">
                  <XCircle className="mr-2 h-5 w-5" />
                  Bid must be higher than current price
                </div>
              )}

              <div className="mb-4">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => adjustBid(-10)}
                    className="flex h-12 w-12 items-center justify-center rounded-l-md border border-red-900 bg-black text-xl font-bold text-white hover:bg-red-950"
                  >
                    -
                  </button>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-3 text-lg font-bold text-gray-400">$</span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      step="0.01"
                      min={auctionDetail.currentBid + 0.01}
                      className="h-12 w-full border-y border-red-900 bg-black px-8 text-lg font-bold text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustBid(10)}
                    className="flex h-12 w-12 items-center justify-center rounded-r-md border border-red-900 bg-black text-xl font-bold text-white hover:bg-red-950"
                  >
                    +
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Minimum bid increment: $10.00
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || bidAmount <= auctionDetail.currentBid}
                className={`w-full rounded-md bg-red-600 py-3 text-center font-bold text-white transition-colors ${
                  isLoading || bidAmount <= auctionDetail.currentBid ? "cursor-not-allowed opacity-70" : "hover:bg-red-700"
                }`}
              >
                {isLoading ? "Processing..." : "Place Bid Now"}
              </button>
            </form>
          </div>
        </div>

        {/* Bid history section */}
        <div className="mt-12">
          <div className="border-b border-red-900">
            <div className="flex">
              <button className="border-b-2 border-red-600 px-4 py-2 font-medium text-white">Bid History</button>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-lg border border-red-900 bg-black p-4">
              <h3 className="mb-4 text-lg font-bold text-white">Bid History</h3>
              <div className="space-y-4">
                {Array.isArray(auctionBidders) && auctionBidders.map((bid, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-md p-2 ${index === 0 ? "bg-red-900/20" : ""}`}
                  >
                    <div className="flex items-center">
                      <div className="ml-2">
                        <div className="flex items-center">
                          <span className="font-medium text-white">{bid.userName}</span>
                          {index === 0 && (
                            <span className="ml-2 rounded bg-red-900/50 px-1.5 py-0.5 text-xs text-red-300">
                              Highest
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">{new Date(bid.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="font-bold text-white">
                      ${bid.amount?.toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </div>
                  </div>
                ))}
                {auctionBidders.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No bids placed yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}