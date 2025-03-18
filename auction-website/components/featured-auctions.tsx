"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Clock, Gavel, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HoverButton } from "@/components/ui/hover-button"
import { cn } from "@/lib/utils"

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
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const updateScrollInfo = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setScrollPosition(scrollLeft)
      setMaxScroll(scrollWidth - clientWidth)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 1.5 : current.clientWidth / 1.5
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
        updateScrollInfo()
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("scroll", updateScrollInfo)

    // Initial calculation
    updateScrollInfo()

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("scroll", updateScrollInfo)
    }
  }, [])

  // Intersection Observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    const section = document.getElementById("featured-auctions")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <section id="featured-auctions" className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div
          className={cn(
            "flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">Featured Auctions</h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Bid on our most exclusive items before they're gone. These premium auctions are hand-selected by our
              curators.
            </p>
          </div>

          {/* Progress indicator for mobile */}
          <div className="mt-4 md:hidden">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation arrows for desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 10}
            className={cn(
              "absolute left-4 top-1/2 z-10 transform -translate-y-1/2 transition-all duration-300",
              scrollPosition <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:scale-110",
              "bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={scrollPosition >= maxScroll - 10}
            className={cn(
              "absolute right-4 top-1/2 z-10 transform -translate-y-1/2 transition-all duration-300",
              scrollPosition >= maxScroll - 10 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:scale-110",
              "bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredAuctions.map((auction, index) => (
            <div
              key={auction.id}
              className={cn(
                "min-w-[280px] md:min-w-[350px] snap-start transition-all duration-500 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
              )}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(auction.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={cn(
                  "h-full transition-all duration-500 border-white/10 bg-white/5 backdrop-blur-sm text-white overflow-hidden",
                  hoveredCard === auction.id
                    ? "transform scale-[1.03] shadow-xl shadow-primary/20 border-primary/30"
                    : "hover:shadow-lg hover:-translate-y-1",
                )}
              >
                <div className="relative">
                  <Badge className="absolute top-2 right-2 z-10 bg-primary text-white">{auction.category}</Badge>
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.title}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredCard === auction.id ? "scale-110" : "hover:scale-105",
                      )}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay gradient */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300",
                        hoveredCard === auction.id && "opacity-100",
                      )}
                    ></div>

                    {/* Time indicator that appears on hover */}
                    <div
                      className={cn(
                        "absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 transition-all duration-300 transform",
                        hoveredCard === auction.id ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                      )}
                    >
                      <Clock className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium">{auction.timeLeft} left</span>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold line-clamp-1 text-white">{auction.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-sm text-gray-300">Current Bid</p>
                      <p
                        className={cn(
                          "font-bold text-primary transition-all duration-300",
                          hoveredCard === auction.id && "text-xl",
                        )}
                      >
                        ${auction.currentBid.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-white transition-all duration-300",
                        hoveredCard === auction.id ? "opacity-0" : "opacity-100",
                      )}
                    >
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
                    className={cn(
                      "w-full transition-all duration-300",
                      hoveredCard === auction.id
                        ? "bg-primary hover:bg-primary/90 text-white shadow-lg"
                        : "bg-primary hover:bg-primary/90 text-white",
                    )}
                    onClick={() => (window.location.href = `/auction/${auction.id}`)}
                  >
                    <span className="sr-only">Place bid on {auction.title}</span>
                  </HoverButton>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 10}
            className={cn(
              "transition-all duration-300 bg-white/10 hover:bg-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center",
              scrollPosition <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100",
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={scrollPosition >= maxScroll - 10}
            className={cn(
              "transition-all duration-300 bg-white/10 hover:bg-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center",
              scrollPosition >= maxScroll - 10 ? "opacity-30 cursor-not-allowed" : "opacity-100",
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

