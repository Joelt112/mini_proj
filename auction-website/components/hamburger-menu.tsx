"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Gavel, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-4 top-4 z-50 flex flex-col justify-center items-center w-12 h-12 rounded-full bg-black shadow-lg focus:outline-none",
          isOpen ? "bg-primary" : "bg-black",
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "block w-6 h-0.5 bg-white transition-all duration-300 ease-out",
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-1",
          )}
        />
        <span
          className={cn(
            "block w-6 h-0.5 bg-white transition-all duration-300 ease-out",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "block w-6 h-0.5 bg-white transition-all duration-300 ease-out",
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1",
          )}
        />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-40 w-[280px] bg-black shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Gavel className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-white">BidMaster</span>
            </Link>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/categories"
              className="text-lg font-medium text-white hover:text-primary transition-colors py-2 border-b border-white/10"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/how-it-works"
              className="text-lg font-medium text-white hover:text-primary transition-colors py-2 border-b border-white/10"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-white hover:text-primary transition-colors py-2 border-b border-white/10"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-white hover:text-primary transition-colors py-2 border-b border-white/10"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-primary flex items-center justify-center gap-2 w-full h-12 text-lg"
              asChild
            >
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 w-full h-12 text-lg"
              asChild
            >
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <UserPlus className="h-5 w-5" />
                <span>Register</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

