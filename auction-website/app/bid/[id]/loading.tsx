import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
        <p className="mt-4 text-lg text-white">Loading auction details...</p>
      </div>
    </div>
  )
}

