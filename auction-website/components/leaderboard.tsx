"use client";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, TrendingUp, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard } from "@/store/slices/userSlice";
import { RootState, AppDispatch } from "@/store/store";
//import Spinner from "@/custom-components/Spinner";

export default function Leaderboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { leaderboard, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Top Bidders</h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">Our most active community members this month</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-2 border-primary text-black hover:bg-primary hover:text-white transition-all duration-300 px-4 sm:px-6 py-2 sm:py-6 h-auto text-base sm:text-lg font-medium rounded-full group flex items-center"
              asChild
            >
              <Link href="/leaderboard">
                View Full Leaderboard
                <TrendingUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-[-2px] transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
        
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="grid grid-cols-12 bg-white/10 py-3 px-4 text-sm font-medium text-gray-300">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Bidder</div>
                <div className="col-span-3 text-right">Total Bids</div>
                <div className="col-span-3 text-right">Auctions Won</div>
              </div>

              {leaderboard.slice(0, 100).map((bidder, index) => (
                <div
                  key={bidder._id}
                  className={cn(
                    "grid grid-cols-12 items-center py-4 px-4 transition-colors hover:bg-white/5",
                    index !== leaderboard.length - 1 && "border-b border-white/10"
                  )}
                >
                  <div className="col-span-1 text-center">
                    {index + 1 === 1 ? (
                      <Crown className="h-6 w-6 text-yellow-500 mx-auto" />
                    ) : index + 1 === 2 ? (
                      <Crown className="h-6 w-6 text-gray-400 mx-auto" />
                    ) : index + 1 === 3 ? (
                      <Crown className="h-6 w-6 text-amber-700 mx-auto" />
                    ) : (
                      <span className="text-lg font-semibold text-gray-400">{index + 1}</span>
                    )}
                  </div>
                  <div className="col-span-5">
                    <div className="flex items-center gap-3">
  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
  <Image
    src={bidder.profileImage?.url || "/default-avatar.png"} // ✅ Fix: Fallback image
    alt={bidder.userName}
    fill
    className="object-cover"
    sizes="40px"
    unoptimized // ✅ Fix for external images
  />
</div>

                      <div>
                        <Link
                          href={`/profile/${bidder._id}`}
                          className="font-medium text-white hover:text-primary transition-colors"
                        >
                          {bidder.userName}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 text-right font-medium">
                    ${bidder.moneySpent ? bidder.moneySpent.toLocaleString() : "0"}
                  </div>
                  <div className="col-span-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-medium">{bidder.auctionsWon || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {leaderboard.slice(0, 100).map((bidder, index) => (
                <div
                  key={bidder._id}
                  className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        {index + 1 <= 3 ? (
                          <div className={`absolute -top-2 -left-2 bg-${index + 1 === 1 ? "yellow-500" : index + 1 === 2 ? "gray-400" : "amber-700"} rounded-full p-1`}>
                            <Crown className="h-4 w-4 text-black" />
                          </div>
                        ) : (
                          <div className="absolute -top-2 -left-2 bg-white/10 rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                        )}
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-white/10">
                          <Image
                            src={bidder.profileImage.url || "/placeholder.svg"}
                            alt={bidder.userName}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <Link
                        href={`/profile/${bidder._id}`}
                        className="font-medium text-white hover:text-primary transition-colors text-lg"
                      >
                        {bidder.userName}
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white/10 rounded-md p-2">
                      <p className="text-gray-400 text-xs">Total Bids</p>
                      <p className="font-medium text-white">${bidder.moneySpent ? bidder.moneySpent.toLocaleString() : "0"}</p>
                    </div>
                    <div className="bg-white/10 rounded-md p-2">
                      <p className="text-gray-400 text-xs">Auctions Won</p>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium">{bidder.auctionsWon || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
