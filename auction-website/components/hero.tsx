import Link from "next/link"
import { Button } from "@/components/ui/button"
import TypingAnimation from "./typing-animation"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-black z-0"></div>
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap">
              <div className="whitespace-nowrap overflow-hidden">
                <TypingAnimation
                  text="Discover Unique Items at"
                  className="inline-block"
                  typingSpeed={100}
                  deletingSpeed={50}
                />
              </div>
              <span className="text-primary whitespace-nowrap">Unbeatable Prices</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Join thousands of bidders and find rare collectibles, luxury items, and one-of-a-kind treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/auctions">Browse Auctions</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

