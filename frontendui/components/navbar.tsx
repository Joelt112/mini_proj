"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, logout } from "../store/slices/userSlice"
import { Gavel, LogIn, UserPlus, LogOut, Menu, X, FileText, PlusCircle, Eye, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scrollToElement } from "@/lib/scroll-util"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading } = useSelector((state: any) => state.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    dispatch(fetchUser() as any)
  }, [dispatch])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleLogout = () => {
    dispatch(logout() as any)
    setMobileMenuOpen(false)
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Only handle the click if we're on the homepage
    if (pathname === "/") {
      e.preventDefault()
      scrollToElement(targetId, 80)
      setMobileMenuOpen(false)
    }
  }

  
  const handleFooterScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black text-white">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Bidout</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/categories"
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/categories" ? "text-primary" : "hover:text-primary",
            )}
          >
            Categories
          </Link>
          <Link
            href={pathname === "/" ? "#how-it-works" : "/#how-it-works"}
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/how-it-works" || pathname?.includes("#how-it-works")
                ? "text-primary"
                : "hover:text-primary",
            )}
            onClick={(e) => handleNavLinkClick(e, "how-it-works")}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/about" ? "text-primary" : "hover:text-primary",
            )}
          >
            About
          </Link>
          <Link
            href="#"
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/contact" ? "text-primary" : "hover:text-primary",
            )}
            onClick={handleFooterScroll}
          >
            Contact
          </Link>

          {/* Role-Based Menu Items for Auctioneers & Super Admin */}
          {isAuthenticated && user && (
            <>
              {user.role === "Auctioneer" && (
                <>
                  <Link
                    href="/submit-commission"
                    className={cn(
                      "text-sm font-medium transition-colors flex items-center gap-1",
                      pathname === "/submit-commission" ? "text-primary" : "hover:text-primary",
                    )}
                  >
                    <FileText className="h-4 w-4" /> Submit Commission
                  </Link>
                  <Link
                    href="/create-auction"
                    className={cn(
                      "text-sm font-medium transition-colors flex items-center gap-1",
                      pathname === "/create-auction" ? "text-primary" : "hover:text-primary",
                    )}
                  >
                    <PlusCircle className="h-4 w-4" /> Create Auction
                  </Link>
                  <Link
                    href="/view-my-auctions"
                    className={cn(
                      "text-sm font-medium transition-colors flex items-center gap-1",
                      pathname === "/view-my-auctions" ? "text-primary" : "hover:text-primary",
                    )}
                  >
                    <Eye className="h-4 w-4" /> View My Auctions
                  </Link>
                </>
              )}
              {user.role === "Super Admin" && (
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-medium transition-colors flex items-center gap-1",
                    pathname === "/dashboard" ? "text-primary" : "hover:text-primary",
                  )}
                >
                  
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Desktop Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          ) : isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white overflow-hidden">
                  <img
                    src={user?.profileImage?.url || "/placeholder.svg?height=32&width=32"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=32&width=32"
                    }}
                  />
                </div>
                <span className="text-sm font-medium">{user?.userName}</span>
              </div>

              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-primary flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hover:text-primary flex items-center gap-2"
                asChild
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>

              <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2" asChild>
                <Link href="/register">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-30 bg-black/95 backdrop-blur-sm transition-transform duration-300 ease-in-out transform pt-16",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container py-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/categories"
              className={cn(
                "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                pathname === "/categories" ? "bg-white/10 text-primary" : "hover:bg-white/5",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href={pathname === "/" ? "#how-it-works" : "/#how-it-works"}
              className={cn(
                "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                pathname?.includes("#how-it-works") ? "bg-white/10 text-primary" : "hover:bg-white/5",
              )}
              onClick={(e) => handleNavLinkClick(e, "how-it-works")}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className={cn(
                "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                pathname === "/about" ? "bg-white/10 text-primary" : "hover:bg-white/5",
              )}
              onClick={() => setMobileMenuOpen(false)             
              }
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                pathname === "/contact" ? "bg-white/10 text-primary" : "hover:bg-white/5",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Role-Based Menu Items for Auctioneers & Super Admin */}
            {isAuthenticated && user && (
              <>
                {user.role === "Auctioneer" && (
                  <>
                    <Link
                      href="/submit-commission"
                      className={cn(
                        "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                        pathname === "/submit-commission" ? "bg-white/10 text-primary" : "hover:bg-white/5",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FileText className="h-5 w-5" />
                      Submit Commission
                    </Link>
                    <Link
                      href="/create-auction"
                      className={cn(
                        "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                        pathname === "/create-auction" ? "bg-white/10 text-primary" : "hover:bg-white/5",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusCircle className="h-5 w-5" />
                      Create Auction
                    </Link>
                    <Link
                      href="/view-my-auctions"
                      className={cn(
                        "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                        pathname === "/view-my-auctions" ? "bg-white/10 text-primary" : "hover:bg-white/5",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Eye className="h-5 w-5" />
                      View My Auctions
                    </Link>
                  </>
                )}
                {user.role === "Super Admin" && (
                  <Link
                    href="/dashboard"
                    className={cn(
                      "py-3 px-4 rounded-md transition-colors flex items-center gap-2",
                      pathname === "/dashboard" ? "bg-white/10 text-primary" : "hover:bg-white/5",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="mt-4 pt-4 border-t border-white/10">
            {loading ? (
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-4">
                  <div className="w-10 h-10 rounded-full border border-white overflow-hidden">
                    <img
                      src={user?.profileImage?.url || "/placeholder.svg?height=40&width=40"}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{user?.userName}</div>
                    <div className="text-sm text-gray-400">{user?.role}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-center border-white/20 text-white hover:bg-white/10 hover:text-primary flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-center border-white/20 text-white hover:bg-white/10 hover:text-primary flex items-center gap-2"
                  asChild
                >
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </Button>

                <Button
                  className="w-full justify-center bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                  asChild
                >
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

