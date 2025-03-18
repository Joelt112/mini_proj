"use client"

import type React from "react"

import { useState, useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HoverButtonProps {
  defaultContent: ReactNode
  hoverContent: ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  onClick?: () => void
  asChild?: boolean
}

export function HoverButton({
  defaultContent,
  hoverContent,
  variant = "default",
  className,
  onClick,
  asChild = false,
  ...props
}: HoverButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isTouched, setIsTouched] = useState(false)

  const handleTouchStart = () => {
    setIsTouched(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false)
    }, 1000)
  }

  // Reset touch state when component unmounts
  useEffect(() => {
    return () => {
      setIsTouched(false)
    }
  }, [])

  if (asChild) {
    return (
      <Button
        variant={variant}
        className={cn("relative overflow-hidden group", className)}
        onClick={onClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        asChild
        {...props}
      >
        {props.children}
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      className={cn("relative overflow-hidden group", className)}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <div className="relative w-full">
        <span
          className={cn("transition-all duration-300", isTouched ? "opacity-0" : "opacity-100 group-hover:opacity-0")}
        >
          {defaultContent}
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300",
            isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          {hoverContent}
        </span>
      </div>
    </Button>
  )
}

