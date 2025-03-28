import Link from "next/link"
import { Gavel } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-black text-white"
    id="footer">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Gavel className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BidMaster</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              The premier online auction platform for unique and valuable items.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auctions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sell an Item
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} BidMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

