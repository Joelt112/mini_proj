import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideBidButton } from "@/components/ui/slide-bid-button"

// Mock data for auction items
const auctionItems = [
  {
    id: 7,
    title: "Vintage Camera Collection",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 850,
    timeLeft: "1 day",
    category: "Electronics",
  },
  {
    id: 8,
    title: "Handcrafted Jewelry Set",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 1200,
    timeLeft: "6 hours",
    category: "Jewelry",
  },
  {
    id: 9,
    title: "Classic Vinyl Records Bundle",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 320,
    timeLeft: "2 days",
    category: "Music",
  },
  {
    id: 10,
    title: "Antique Pocket Watch",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 750,
    timeLeft: "3 days",
    category: "Watches",
  },
  {
    id: 11,
    title: "Rare Comic Book Collection",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 2800,
    timeLeft: "5 days",
    category: "Collectibles",
  },
  {
    id: 12,
    title: "Designer Handbag",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 1650,
    timeLeft: "1 day",
    category: "Fashion",
  },
  {
    id: 13,
    title: "Vintage Wine Selection",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 3200,
    timeLeft: "4 days",
    category: "Wine & Spirits",
  },
  {
    id: 14,
    title: "Gaming Console Bundle",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 550,
    timeLeft: "2 days",
    category: "Electronics",
  },
]

export default function AuctionGrid() {
  return (
    <section className="py-12 sm:py-16 bg-black text-white">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Popular Auctions</h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Discover our most sought-after items</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-2 border-primary text-white hover:bg-primary hover:text-white transition-all duration-300 px-4 sm:px-6 py-2 sm:py-6 h-auto text-base sm:text-lg font-medium rounded-full group flex items-center"
              asChild
            >
              <Link href="/auctions">
                View All Auctions
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {auctionItems.map((item) => (
            <Card
              key={item.id}
              className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white text-black border-white/10 overflow-hidden"
            >
              <div className="relative">
                <Badge className="absolute top-2 right-2 z-10 bg-primary text-white">{item.category}</Badge>
                <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
              <CardContent className="pt-4 px-3 sm:px-4">
                <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Current Bid</p>
                    <p className="font-bold text-primary text-sm sm:text-base">${item.currentBid.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1 text-black">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm font-medium">{item.timeLeft}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                <SlideBidButton 
                  href={`/auction/${item.id}`}
                  itemTitle={item.title}
                  className="w-full"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

