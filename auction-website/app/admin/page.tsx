"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Users,
  CreditCard,
  Trash2,
  TrendingUp,
  ArrowUpRight,
  Bell,
  ShieldCheck,
  Activity,
  Zap,
  DollarSign,
  Clock,
  Award,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdminPaymentGraph from "@/components/admin/payment-graph"
import AdminUsersGraph from "@/components/admin/users-graph"
import AdminPaymentProofs from "@/components/admin/payment-proofs"
import AdminAuctionItemDelete from "@/components/admin/auction-item-delete"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock authentication state - in a real app, this would come from your auth system
const mockUser = {
  id: 1,
  username: "AdminUser",
  role: "Super Admin",
}

// Mock stats data
const statsData = [
  {
    title: "Total Revenue",
    value: "$48,250",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "primary",
  },
  {
    title: "Active Users",
    value: "1,845",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "blue-500",
  },
  {
    title: "Completed Auctions",
    value: "342",
    change: "+5.1%",
    trend: "up",
    icon: Zap,
    color: "purple-500",
  },
  {
    title: "Pending Payments",
    value: "18",
    change: "-3.4%",
    trend: "down",
    icon: Clock,
    color: "amber-500",
  },
]

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    type: "payment",
    title: "New payment received",
    description: "John Doe paid $1,250 for Vintage Watch",
    time: "10 minutes ago",
    icon: DollarSign,
    color: "green-500",
  },
  {
    id: 2,
    type: "auction",
    title: "Auction ended",
    description: "Luxury Car Memorabilia sold for $8,750",
    time: "45 minutes ago",
    icon: Award,
    color: "blue-500",
  },
  {
    id: 3,
    type: "user",
    title: "New user registered",
    description: "Alice Smith created an account",
    time: "2 hours ago",
    icon: Users,
    color: "purple-500",
  },
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("revenue")
  const [animateStats, setAnimateStats] = useState(false)
  const router = useRouter()

  // Simulate authentication check and data loading
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, this would be an actual auth check
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(mockUser)
      setIsAuthenticated(true)
      setIsLoading(false)

      // Trigger stats animation after a small delay
      setTimeout(() => {
        setAnimateStats(true)
      }, 300)
    }

    checkAuth()
  }, [])

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "Super Admin")) {
      router.push("/")
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading) {
    return <AdminDashboardSkeleton />
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <div className="flex-1 flex flex-col">
        {/* Hero section with gradient background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-black to-primary/20 pt-20 pb-10">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
          <div className="absolute h-40 w-40 rounded-full bg-primary/30 blur-3xl -top-10 -right-10"></div>
          <div className="absolute h-40 w-40 rounded-full bg-blue-500/20 blur-3xl bottom-10 left-10"></div>

          <div className="container px-4 sm:px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Admin Control Panel
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 max-w-xl">
                  Monitor your auction platform's performance, manage users, and track revenue in real-time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-white/20 text-black hover:text-white hover:bg-white/10">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="mr-1">Notifications</span>
                  <Badge className="bg-primary text-white ml-1">3</Badge>
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  <Activity className="h-4 w-4 mr-2" />
                  System Status
                </Button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsData.map((stat, index) => (
                <Card
                  key={stat.title}
                  className={cn(
                    "bg-white/5 backdrop-blur-sm border-white/10 text-white overflow-hidden transition-all duration-500 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/5 group",
                    animateStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`h-12 w-12 rounded-lg bg-${stat.color}/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                      </div>
                      <div
                        className={`text-sm font-medium flex items-center gap-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {stat.change}
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 transform rotate-90" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <p className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent activity section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentActivity.map((activity, index) => (
                  <Card
                    key={activity.id}
                    className={cn(
                      "bg-white/5 backdrop-blur-sm border-white/10 text-white transition-all duration-500 hover:bg-white/10",
                      animateStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    )}
                    style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-10 w-10 rounded-full bg-${activity.color}/20 flex-shrink-0 flex items-center justify-center mt-1`}
                        >
                          <activity.icon className={`h-5 w-5 text-${activity.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-gray-400">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area with tabs */}
        <div className="bg-black pb-12">
          <div className="container px-4 sm:px-6">
            <Tabs defaultValue="revenue" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8 bg-white/5 p-1 rounded-xl">
                <TabsTrigger
                  value="revenue"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-200 hover:text-primary data-[state=active]:shadow-lg"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-200 hover:text-primary data-[state=active]:shadow-lg"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-200 hover:text-primary data-[state=active]:shadow-lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
                <TabsTrigger
                  value="items"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all duration-200 hover:text-primary data-[state=active]:shadow-lg"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Items
                </TabsTrigger>
              </TabsList>

              {/* Tab content container with fixed height and scrolling */}
              <div className="relative min-h-[500px] mb-8">
                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    activeTab === "revenue"
                      ? "translate-x-0 opacity-100 relative"
                      : "absolute inset-0 opacity-0 pointer-events-none",
                  )}
                >
                  <TabsContent value="revenue" className="mt-0 relative">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold mb-1">Monthly Total Payments Received</h3>
                          <p className="text-gray-400 text-sm">Track your platform's revenue performance over time</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-2">
                          <Badge className="bg-green-500 text-white">+12.5% from last month</Badge>
                        </div>
                      </div>
                      <AdminPaymentGraph />
                    </div>
                  </TabsContent>
                </div>

                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    activeTab === "users"
                      ? "translate-x-0 opacity-100 relative"
                      : "absolute inset-0 opacity-0 pointer-events-none",
                  )}
                >
                  <TabsContent value="users" className="mt-0">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold mb-1">User Distribution</h3>
                          <p className="text-gray-400 text-sm">Breakdown of user types on your platform</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button variant="outline" size="sm" className="border-white/20 text-black hover:bg-white/10">
                            <Users className="h-4 w-4 mr-2" />
                            View All Users
                          </Button>
                        </div>
                      </div>
                      <AdminUsersGraph />
                    </div>
                  </TabsContent>
                </div>

                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    activeTab === "payments"
                      ? "translate-x-0 opacity-100 relative"
                      : "absolute inset-0 opacity-0 pointer-events-none",
                  )}
                >
                  <TabsContent value="payments" className="mt-0">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold mb-1">Payment Verification</h3>
                          <p className="text-gray-400 text-sm">Review and approve payment proofs from users</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Badge className="bg-amber-500 text-white">12 pending approvals</Badge>
                        </div>
                      </div>
                      <div className="max-h-[600px] overflow-y-auto">
                        <AdminPaymentProofs />
                      </div>
                    </div>
                  </TabsContent>
                </div>

                <div
                  className={cn(
                    "transition-all duration-500 transform",
                    activeTab === "items"
                      ? "translate-x-0 opacity-100 relative"
                      : "absolute inset-0 opacity-0 pointer-events-none",
                  )}
                >
                  <TabsContent value="items" className="mt-0">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold mb-1">Auction Item Management</h3>
                          <p className="text-gray-400 text-sm">Remove items from the auction platform</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Zap className="h-4 w-4 mr-2" />
                            Add New Item
                          </Button>
                        </div>
                      </div>
                      <div className="max-h-[600px] overflow-y-auto">
                        <AdminAuctionItemDelete />
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer is consistently placed outside the main content area */}
      <Footer />
    </div>
  )
}

function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-black to-primary/20 pt-20 pb-10">
          <div className="container px-4 sm:px-6 relative z-10">
            <Skeleton className="h-8 w-40 bg-white/10 mb-2" />
            <Skeleton className="h-16 w-64 bg-white/10 mb-4" />
            <Skeleton className="h-6 w-full max-w-xl bg-white/10 mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Skeleton className="h-32 bg-white/10 rounded-lg" />
              <Skeleton className="h-32 bg-white/10 rounded-lg" />
              <Skeleton className="h-32 bg-white/10 rounded-lg" />
              <Skeleton className="h-32 bg-white/10 rounded-lg" />
            </div>

            <Skeleton className="h-8 w-48 bg-white/10 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-24 bg-white/10 rounded-lg" />
              <Skeleton className="h-24 bg-white/10 rounded-lg" />
              <Skeleton className="h-24 bg-white/10 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-black pb-12">
          <div className="container px-4 sm:px-6">
            <Skeleton className="h-12 w-full bg-white/10 mb-8 rounded-xl" />
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
              <Skeleton className="h-8 w-64 bg-white/10 mb-2" />
              <Skeleton className="h-4 w-full max-w-md bg-white/10 mb-6" />
              <Skeleton className="h-[300px] w-full bg-white/10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

