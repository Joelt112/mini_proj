"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import FeaturedAuctions from "@/components/featured-auctions"
import AuctionGrid from "@/components/auction-grid"
import Leaderboard from "@/components/leaderboard"
import Footer from "@/components/footer"
import AdminDashboard from "./admin/page"
import AdminPaymentGraph from "@/components/admin/payment-graph"
import AdminUsersGraph from "@/components/admin/users-graph"
import AdminPaymentProofs from "@/components/admin/payment-proofs"
import AdminAuctionItemDelete from "@/components/admin/auction-item-delete"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, CreditCard, Trash2 } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("revenue")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedAuctions />
        <Leaderboard />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}

