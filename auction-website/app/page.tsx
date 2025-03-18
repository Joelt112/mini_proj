import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import FeaturedAuctions from "@/components/featured-auctions"
import AuctionGrid from "@/components/auction-grid"
import HoverButtons from "@/components/hover-buttons"
import Footer from "@/components/footer"
import Leaderboard from "@/components/leaderboard"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedAuctions />
          <Leaderboard/>
        <AuctionGrid />
      </main>
      <Footer />
    </div>
  )
}

