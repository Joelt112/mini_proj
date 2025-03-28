"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Search, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {  deleteAuctionItem } from "@/store/slices/superAdminSlice";
import {  getAllAuctionItems } from "@/store/slices/auctionSlice";
import { RootState, AppDispatch } from "@/store/store";

export default function AdminAuctionItemDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { allAuctions, loading } = useSelector((state: RootState) => state.auction);

  const [searchQuery, setSearchQuery] = useState("");
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllAuctionItems());
  }, [dispatch]);

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await dispatch(deleteAuctionItem(itemToDelete._id)); // Ensure _id is used instead of id
      dispatch(getAllAuctionItems());
    }
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  const filteredItems = allAuctions.filter((item: any) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Skeleton className="h-[400px] w-full bg-white/10" />;
  }

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item: any) => (
          <div key={item._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            <div className="relative h-40">
              <Badge className="absolute top-2 right-2 z-10 bg-primary text-white">{item.category}</Badge>
              <Image src={item.image?.url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h4 className="font-medium text-lg mb-2">{item.title}</h4>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-400">Current Bid</p>
                  <p className="font-bold text-primary">${item.currentBid ? item.currentBid.toLocaleString() : "0"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Time Left</p>
                  <p className="font-medium">{item.timeLeft}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                onClick={() => handleDeleteClick(item)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Item
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
          <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-gray-400">Try adjusting your search query</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-black border border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the auction item.
            </DialogDescription>
          </DialogHeader>

          {itemToDelete && (
            <div className="flex items-center gap-4 py-2">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={itemToDelete.image?.url || "/placeholder.svg"} alt={itemToDelete.title} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-medium">{itemToDelete.title}</h4>
                <p className="text-sm text-gray-400">Current Bid: ${itemToDelete.currentBid ? itemToDelete.currentBid.toLocaleString() : "0"}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
