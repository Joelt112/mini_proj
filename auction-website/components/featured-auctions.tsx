"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Clock, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HoverButton } from "@/components/ui/hover-button"

// Mock data for featured auctions
const featuredAuctions = [
  {
    id: 1,
    title: "Vintage Rolex Submariner",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 15250,
    timeLeft: "2 days",
    category: "Watches",
    featured: true,
  },
  {
    id: 2,
    title: "Rare First Edition Book",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 4300,
    timeLeft: "5 hours",
    category: "Books",
    featured: true,
  },
  {
    id: 3,
    title: "Original Artwork by Modern Artist",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 7800,
    timeLeft: "1 day",
    category: "Art",
    featured: true,
  },
  {
    id: 4,
    title: "Antique Furniture Set",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 3200,
    timeLeft: "3 days",
    category: "Furniture",
    featured: true,
  },
  {
    id: 5,
    title: "Limited Edition Sneakers",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 950,
    timeLeft: "12 hours",
    category: "Fashion",
    featured: true,
  },
  {
    id: 6,
    title: "Signed Sports Memorabilia",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 1800,
    timeLeft: "4 days",
    category: "Sports",
    featured: true,
  },
]

export default function FeaturedAuctions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Add mouse wheel horizontal scrolling
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <section className="py-16 bg-white text-black">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Auctions</h2>
            <p className="text-gray-600 mt-2">Bid on our most exclusive items before they're gone</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="border-black text-black hover:bg-black/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="border-black text-black hover:bg-black/10"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredAuctions.map((auction) => (
            <div key={auction.id} className="min-w-[280px] md:min-w-[350px] snap-start">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-black/10">
                <div className="relative">
                  <Badge className="absolute top-2 right-2 z-10 bg-primary text-white">{auction.category}</Badge>
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold line-clamp-1">{auction.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-sm text-gray-600">Current Bid</p>
                      <p className="font-bold text-primary">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1 text-black">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{auction.timeLeft}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <HoverButton
                    defaultContent="Place Bid"
                    hoverContent={
                      <div className="flex items-center gap-2">
                        <Gavel className="h-4 w-4" />
                        <span>Bid Now</span>
                      </div>
                    }
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => (window.location.href = `/auction/${auction.id}`)}
                  >
                    <span className="sr-only">Place bid on {auction.title}</span>
                  </HoverButton>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

