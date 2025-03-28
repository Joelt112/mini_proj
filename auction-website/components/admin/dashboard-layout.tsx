"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gavel, LayoutDashboard, Users, ShoppingBag, CreditCard, Settings, Bell, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/components/user",
      icon: Users,
    },
    {
      name: "Auctions",
      href: "/admin/auctions",
      icon: ShoppingBag,
      badge: "12",
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: CreditCard,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 lg:px-6 bg-black z-30 sticky top-0">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={toggleSidebar}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <Link href="/" className="flex items-center gap-2 mr-6">
            <Gavel className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold hidden sm:inline-block">BidMaster</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@bidmaster.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-black border-r border-white/10 w-64 flex-shrink-0 fixed lg:sticky top-16 h-[calc(100vh-4rem)] z-20 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "left-0" : "-left-64",
            isMobile && isSidebarOpen ? "shadow-2xl" : "",
          )}
        >
          <div className="flex flex-col h-full py-4">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Panel</p>
            </div>

            <nav className="space-y-1 px-3 py-2 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-white/20 hover:bg-white/20 text-white">{item.badge}</Badge>
                  )}
                </Link>
              ))}
            </nav>

            <div className="px-3 py-2 mt-auto">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-400">Super Admin</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black/80 z-10 lg:hidden" onClick={toggleSidebar} />
        )}

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            isMobile && isSidebarOpen ? "opacity-50 lg:opacity-100" : "opacity-100",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

