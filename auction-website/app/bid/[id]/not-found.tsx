
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <AlertTriangle className="h-16 w-16 text-red-600" />
      <h1 className="mt-6 text-3xl font-bold text-white">Auction Not Found</h1>
      <p className="mt-2 max-w-md text-gray-400">The auction you're looking for doesn't exist or has been removed.</p>
      <Link href="/auctions" className="mt-8 rounded-md bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700">
        Browse Available Auctions
      </Link>
    </div>
  )
}

