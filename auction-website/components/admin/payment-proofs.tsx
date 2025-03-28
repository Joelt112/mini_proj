"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trash2, Search, AlertTriangle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { deletePaymentProof, getAllPaymentProofs, updatePaymentProof, getSinglePaymentProofDetail } from "@/store/slices/superAdminSlice"


export default function PaymentProofManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { paymentProofs, loading } = useSelector((state: RootState) => state.superAdmin)
  const [filteredProofs, setFilteredProofs] = useState<PaymentProof[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [status, setStatus] = useState("Pending")
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    dispatch(getAllPaymentProofs())
  }, [dispatch])

  useEffect(() => {
    if (paymentProofs.length > 0) {
      setFilteredProofs(paymentProofs)
    }
  }, [paymentProofs])

  useEffect(() => {
    const filterItems = () => {
      if (searchQuery.trim() === "") {
        setFilteredProofs(paymentProofs)
      } else {
        const query = searchQuery.toLowerCase()
        const filtered = paymentProofs.filter(
          (item) => 
            item.userId.toLowerCase().includes(query) || 
            item.proof.status.toLowerCase().includes(query)
        )
        setFilteredProofs(filtered)
      }
    }
    filterItems()
  }, [searchQuery, paymentProofs])

  const handleViewProof = (id: string) => {
    const proof = paymentProofs.find(p => p._id === id)
    if (proof) {
      setSelectedProof(proof)
      setStatus(proof.proof.status)
      setAmount(proof.proof.amount)
      setShowDialog(true)
    }
  }

  const handleDeleteProof = (id: string) => {
    dispatch(deletePaymentProof(id))
  }

  const handleUpdateProof = () => {
    if (selectedProof) {
      dispatch(updatePaymentProof(selectedProof._id, status, amount))
      setShowDialog(false)
    }
  }

  if (loading) {
    return <Skeleton className="h-[400px] w-full bg-white/10" />
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by user ID or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white"
          />
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto pr-2 content-scrollable">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProofs.map((proof) => (
            <div
              key={proof._id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="relative h-40">
                <Badge className={`absolute top-2 right-2 z-10 ${
                  proof.status === "Settled" ? "bg-green-500" :
                  proof.status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                }`}>
                  {proof.status}
                </Badge>
                <Image 
                  src={proof.proof.url || "/placeholder.svg"} 
                  alt="Payment proof" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg mb-2">User ID: {proof.userId}</h4>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Amount</p>
                    <p className="font-bold text-primary">${proof.amount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">
                      {new Date(proof.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-red-600 hover:bg-white/10"
                    onClick={() => handleViewProof(proof._id)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDeleteProof(proof._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProofs.length === 0 && (
          <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No payment proofs found</h3>
            <p className="text-gray-400">Try adjusting your search query</p>
          </div>
        )}
      </div>

      {/* Payment Proof Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-black border border-white/20 text-white z-50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Payment Proof Details
            </DialogTitle>
          </DialogHeader>

          {selectedProof && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-2">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={selectedProof.proof.url || "/placeholder.svg"}
                    alt="Payment proof"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">User ID: {selectedProof.userId}</h4>
                  <p className="text-sm text-gray-400">
                    Date: {new Date(selectedProof.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2 bg-white/5 border border-white/20 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 bg-white/5 text-red-600 border border-white/20 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Settled">Settled</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-400">Comment</p>
                <p className="font-medium">{selectedProof.comment || "No comments"}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              className="border-white/20 text-black hover:text-white hover:bg-white/10"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/80 text-white"
              onClick={handleUpdateProof}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}