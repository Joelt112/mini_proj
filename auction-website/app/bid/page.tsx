"use client";

import { Clock, Search, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctionItems } from "@/store/slices/auctionSlice";
import { RootState, AppDispatch } from "@/store/store";
import FeaturedAuctions from "@/components/auction-card"


import { useEffect } from "react";

export default function AuctionPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { allAuctions, loading } = useSelector(
      (state: RootState) => state.auction
    );

    
      useEffect(() => {
        dispatch(getAllAuctionItems());
      }, [dispatch]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-900/70 to-black py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Discover Exclusive Auctions</h2>
            <p className="mb-8 text-lg text-gray-300">
              Bid on unique items from around the world. Find your next treasure today.
            </p>
            <div className="relative mx-auto max-w-xl">
              <input
                type="text"
                placeholder="Search auctions..."
                className="w-full rounded-full border border-red-800 bg-black/60 px-6 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-red-500 focus:outline-none"
              />
              <button className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white hover:bg-red-700">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Featured Auctions</h3>
            <div className="flex space-x-2">
              <button className="rounded-md border border-red-700 bg-black px-3 py-1 text-sm text-white hover:bg-red-900">
                All
              </button>
              <button className="rounded-md border border-gray-700 bg-black px-3 py-1 text-sm text-white hover:bg-red-900">
                Art
              </button>
              <button className="rounded-md border border-gray-700 bg-black px-3 py-1 text-sm text-white hover:bg-red-900">
                Collectibles
              </button>
              <button className="rounded-md border border-gray-700 bg-black px-3 py-1 text-sm text-white hover:bg-red-900">
                Electronics
              </button>
            </div>
          </div>

          {/* Auction Grid */}
         
        <FeaturedAuctions />

          {/* Load More Button */}
          <div className="mt-10 text-center">
            <button className="rounded-md border border-red-600 bg-black px-6 py-2 text-red-500 transition-colors hover:bg-red-900/20 hover:text-white">
              Load More Auctions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-red-900 bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">BidMaster</h3>
              <p className="text-sm text-gray-400">
                The premier platform for exclusive auctions. Find rare collectibles, art, and luxury items.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase text-gray-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase text-gray-400">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-red-500">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase text-gray-400">Newsletter</h4>
              <p className="mb-4 text-sm text-gray-400">Subscribe to get updates on exclusive auctions</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border border-red-900 bg-black px-4 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
                />
                <button className="rounded-r-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-red-900/30 pt-8 text-center text-sm text-gray-500">
            <p>© 2023 BidMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

