"use client"

import { useState } from "react"
import Link from "next/link"
import { Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SlideBidButtonProps {
  href: string
  itemTitle: string
  className?: string
}

export function SlideBidButton({ href, itemTitle, className }: SlideBidButtonProps) {
  const [isTouched, setIsTouched] = useState(false)

  const handleTouchStart = () => {
    setIsTouched(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false)
    }, 1000)
  }

  return (
    <Link href={href} className="w-full">
      <Button
        className={cn("slide-bid-button bg-primary hover:bg-primary/90 text-white w-full", className)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <span
          className={cn(
            "slide-bid-text flex items-center justify-center w-full",
            isTouched ? "transform -translate-y-full" : "",
          )}
        >
          Place Bid
        </span>
        <span className={cn("slide-bid-hover-text", isTouched ? "transform translate-y-0" : "")}>
          <Gavel className="h-4 w-4 mr-2" />
          <span>Bid Now</span>
        </span>
        <span className="sr-only">Place bid on {itemTitle}</span>
      </Button>
    </Link>
  )
}

