"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { Mail, Phone, MapPin, User, DollarSign, Trophy, Clock, CreditCard, Building } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function UserProfile() {
  
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user)
  const [activeTab, setActiveTab] = useState("personal")

  useEffect(() => {
    if (!isAuthenticated) {
  
    }
  }, [isAuthenticated])

  if (loading || !user) {
    return (
      <div className="w-full min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto p-6">
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 items-center md:items-start">
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-red-600 overflow-hidden bg-neutral-800 shadow-lg shadow-red-900/20">
              <img
                src={user.profileImage?.url || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1">
              <Badge className="bg-red-600 hover:bg-red-700 text-white">{user.role}</Badge>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl text-white font-bold">{user.userName}</h1>
            <p className="text-neutral-400 mb-4">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-sm text-white">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-sm text-white">{user.phone || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm truncate text-white">{user.address || "No address"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-neutral-400">Role</h3>
              <p className="text-2xl font-bold mt-1 text-white">{user.role}</p>
            </CardContent>
          </Card>

          {user.role === "Auctioneer" ? (
            <Card className="border-0 bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-md overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-neutral-400">Unpaid Commissions</h3>
                <p className="text-2xl font-bold mt-1 text-white">{user.unpaidCommission}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-md overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-neutral-400">Auctions Won</h3>
                <p className="text-2xl font-bold mt-1 text-white">{user.auctionsWon}</p>
              </CardContent>
            </Card>
          )}

          <Card className="border-0 bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-neutral-400">Member Since</h3>
              <p className="text-2xl font-bold mt-1 text-white">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-neutral-900 p-1 rounded-lg mb-6">
            <TabsTrigger
              value="personal"
              className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all"
            >
              <User className="mr-2 h-4 w-4" />
              Personal Details
            </TabsTrigger>
            {user.role === "Auctioneer" && (
              <TabsTrigger
                value="payment"
                className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </TabsTrigger>
            )}
            {user.role === "Bidder" && (
              <TabsTrigger
                value="stats"
                className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-md transition-all"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Bidding Stats
              </TabsTrigger>
            )}
          </TabsList>

          {/* Personal Details Tab */}
          <TabsContent value="personal">
            <Card className="border border-neutral-800 bg-neutral-900/50 shadow-lg backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Username</label>
                      <div className="bg-neutral-800 p-3 rounded-lg text-white">
                        {user.userName}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm  text-neutral-400">Email Address</label>
                      <div className="bg-neutral-800 p-3 rounded-lg text-white">
                        {user.email}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Phone Number</label>
                      <div className="bg-neutral-800 p-3 rounded-lg text-white">
                        {user.phone || "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Address</label>
                      <div className="bg-neutral-800 p-3 rounded-lg text-white">
                        {user.address || "No address"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm  text-neutral-400">Role</label>
                      <div className="bg-neutral-800 p-3 rounded-lg text-white">
                        {user.role}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Joined On</label>
                      <div className="bg-neutral-800 p-3 rounded-lg text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Details Tab */}
          {user.role === "Auctioneer" && (
            <TabsContent value="payment">
              <Card className="border border-neutral-800 bg-neutral-900/50 shadow-lg backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="bg-neutral-800 rounded-xl p-6">
                      <h4 className="text-lg font-medium mb-4">Bank Transfer</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Bank Name</p>
                          <p>{user.paymentMethods?.bankTransfer?.bankName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Account Number</p>
                          <p>{user.paymentMethods?.bankTransfer?.bankAccountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Account Name</p>
                          <p>{user.paymentMethods?.bankTransfer?.bankAccountName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-neutral-800 rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">Easypaisa</h4>
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Account Number</p>
                          <p>{user.paymentMethods?.easypaisa?.easypaisaAccountNumber}</p>
                        </div>
                      </div>

                      <div className="bg-neutral-800 rounded-xl p-6">
                        <h4 className="text-lg font-medium mb-4">PayPal</h4>
                        <div>
                          <p className="text-sm text-neutral-400 mb-1">Email</p>
                          <p>{user.paymentMethods?.paypal?.paypalEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Statistics Tab */}
          {user.role === "Bidder" && (
            <TabsContent value="stats">
              <Card className="border border-neutral-800 bg-neutral-900/50 shadow-lg backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-800 rounded-xl p-6">
                      <h4 className="text-lg font-medium mb-4 text-white">Auctions Won</h4>
                      <p className="text-3xl font-bold text-white">{user.auctionsWon}</p>
                    </div>
                    <div className="bg-neutral-800 rounded-xl p-6">
                      <h4 className="text-lg font-medium mb-4 text-white">Money Spent</h4>
                      <p className="text-3xl font-bold text-white">{user.moneySpent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}