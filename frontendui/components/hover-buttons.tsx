"use client"

import { useState } from "react"
import { ArrowRight, Heart, ShoppingCart, Info, Bell, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HoverButtons() {
  // For mobile touch detection
  const [touchedButton, setTouchedButton] = useState<string | null>(null)

  const handleTouchStart = (buttonId: string) => {
    setTouchedButton(buttonId)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setTouchedButton(null)
    }, 1000) // Keep the hover state visible for a moment after touch
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Interactive Buttons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Button 1: Slide-in Text */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Slide-in Text</h3>
            <Button
              className={cn(
                "relative overflow-hidden group bg-primary hover:bg-primary/90 w-full h-12",
                touchedButton === "button1" && "bg-primary/90",
              )}
              onTouchStart={() => handleTouchStart("button1")}
              onTouchEnd={handleTouchEnd}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                View Auction
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                Place Bid Now
              </span>
            </Button>
          </div>

          {/* Button 2: Reveal Icon */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Reveal Icon</h3>
            <Button
              variant="outline"
              className={cn(
                "border-white text-white hover:bg-white hover:text-black transition-all duration-300 w-full h-12 group",
                touchedButton === "button2" && "bg-white text-black",
              )}
              onTouchStart={() => handleTouchStart("button2")}
              onTouchEnd={handleTouchEnd}
            >
              <span className="mr-2">Add to Watchlist</span>
              <Heart
                className={cn(
                  "w-0 h-4 transition-all duration-300 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-1",
                  touchedButton === "button2" && "w-4 opacity-100 ml-1",
                )}
              />
            </Button>
          </div>

          {/* Button 3: Expanding Background */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Expanding Background</h3>
            <Button
              className={cn(
                "relative w-full h-12 border-2 border-primary bg-transparent text-white overflow-hidden group",
                touchedButton === "button3" && "text-white",
              )}
              onTouchStart={() => handleTouchStart("button3")}
              onTouchEnd={handleTouchEnd}
            >
              <span className="relative z-10">Quick Bid</span>
              <span
                className={cn(
                  "absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100",
                  touchedButton === "button3" && "scale-x-100",
                )}
              ></span>
            </Button>
          </div>

          {/* Button 4: Icon Swap */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Icon Swap</h3>
            <Button
              className={cn(
                "bg-white text-black hover:bg-primary hover:text-white w-full h-12 group",
                touchedButton === "button4" && "bg-primary text-white",
              )}
              onTouchStart={() => handleTouchStart("button4")}
              onTouchEnd={handleTouchEnd}
            >
              <Clock
                className={cn(
                  "w-4 h-4 mr-2 transition-opacity duration-300 group-hover:opacity-0",
                  touchedButton === "button4" ? "opacity-0" : "opacity-100",
                )}
              />
              <span>Auction Ends</span>
              <ShoppingCart
                className={cn(
                  "w-4 h-4 ml-2 absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  touchedButton === "button4" ? "opacity-100" : "opacity-0",
                )}
              />
            </Button>
          </div>

          {/* Button 5: Slide-in Arrow */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Slide-in Arrow</h3>
            <Button
              variant="ghost"
              className={cn(
                "border border-white/20 text-white hover:bg-white/10 w-full h-12 group",
                touchedButton === "button5" && "bg-white/10",
              )}
              onTouchStart={() => handleTouchStart("button5")}
              onTouchEnd={handleTouchEnd}
            >
              <span>View Details</span>
              <ArrowRight
                className={cn(
                  "w-0 h-4 ml-0 transition-all duration-300 group-hover:w-4 group-hover:ml-2",
                  touchedButton === "button5" && "w-4 ml-2",
                )}
              />
            </Button>
          </div>

          {/* Button 6: Reveal Additional Info */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Reveal Info</h3>
            <Button
              className={cn(
                "bg-black border-2 border-primary text-white hover:bg-primary w-full h-12 relative group overflow-hidden",
                touchedButton === "button6" && "bg-primary",
              )}
              onTouchStart={() => handleTouchStart("button6")}
              onTouchEnd={handleTouchEnd}
            >
              <span className="mr-2">Current Bid: $1,200</span>
              <span
                className={cn(
                  "absolute right-4 transform translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 flex items-center",
                  touchedButton === "button6" && "translate-x-0 opacity-100",
                )}
              >
                <Info className="w-4 h-4 mr-1" />
                <span className="text-xs">+3 bids</span>
              </span>
            </Button>
          </div>

          {/* Button 7: Expanding Width */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Expanding Width</h3>
            <div className="w-full flex justify-center">
              <Button
                className={cn(
                  "bg-primary text-white hover:bg-primary/90 transition-all duration-300 w-1/2 group hover:w-full",
                  touchedButton === "button7" && "w-full bg-primary/90",
                )}
                onTouchStart={() => handleTouchStart("button7")}
                onTouchEnd={handleTouchEnd}
              >
                <Bell className="w-4 h-4 mr-2" />
                <span>Notify Me</span>
              </Button>
            </div>
          </div>

          {/* Button 8: Rotating Chevron */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-medium mb-2">Rotating Chevron</h3>
            <Button
              variant="outline"
              className={cn(
                "border-primary text-primary hover:bg-primary hover:text-white w-full h-12 group",
                touchedButton === "button8" && "bg-primary text-white",
              )}
              onTouchStart={() => handleTouchStart("button8")}
              onTouchEnd={handleTouchEnd}
            >
              <span>More Options</span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-90",
                  touchedButton === "button8" && "rotate-90",
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

