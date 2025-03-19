"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../store/slices/userSlice";
import { Gavel, LogIn, UserPlus, LogOut, Menu, X, FileText, PlusCircle, Eye, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import HamburgerMenu from "./hamburger-menu";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser() as any);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout() as any);
    setMobileMenuOpen(false);
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
          <Link href="/categories" className="text-sm font-medium hover:text-primary">Categories</Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">How It Works</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>

          {/* ✅ Role-Based Menu Items for Auctioneers & Super Admin */}
          {isAuthenticated && user && (
            <>
              {user.role === "Auctioneer" && (
                <>
                  <Link href="/submit-commission" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Submit Commission
                  </Link>
                  <Link href="/create-auction" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" /> Create Auction
                  </Link>
                  <Link href="/view-my-auctions" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    <Eye className="h-4 w-4" /> View My Auctions
                  </Link>
                </>
              )}
              {user.role === "Super Admin" && (
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Desktop Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <img 
                  src={user.profileImage.url || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <span className="text-sm font-medium">{user.userName}</span>
              </div>

              <Button className="text-white hover:bg-white/10 flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* ✅ Restored Original Login & Register Button UI */}
              <Button variant="ghost" className="text-white hover:bg-white/10 flex items-center gap-2" asChild>
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

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden flex items-center p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black text-white border-t border-white/10">
          <Link href="/categories" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
          <Link href="/how-it-works-info" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
          <Link href="/about" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

          {isAuthenticated && user && (
            <>
              {user.role === "Auctioneer" && (
                <>
                  <Link href="/submit-commission" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Submit Commission</Link>
                  <Link href="/create-auction" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Create Auction</Link>
                  <Link href="/view-my-auctions" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>View My Auctions</Link>
                </>
              )}
              {user.role === "Super Admin" && (
                <Link href="/dashboard" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              )}
            </>
          )}

          {isAuthenticated ? (
            <>
              <span className="py-2 text-center">{user.userName}</span>
              <button className="py-3 w-full text-center hover:bg-red-500 hover:text-white" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link href="/register" className="w-full py-3 text-center hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
      <HamburgerMenu/>
    </header>
  );
}
