import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";

interface AuctionItem {
  id: string;
  title: string;
  image: string;
  category: string;
  currentBid: number;
  endTime: string;
  description : string;
 
}

interface AuctionState {
  loading: boolean;
  itemDetail: Record<string, any>;
  auctionDetail: Record<string, any>;
  auctionBidders: Record<string, any>;
  myAuctions: AuctionItem[];
  allAuctions: AuctionItem[];
}

const initialState: AuctionState = {
  loading: false,
  itemDetail: {},
  auctionDetail: {},
  auctionBidders: {},
  myAuctions: [],
  allAuctions: [],
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    createAuctionRequest(state) {
      state.loading = true;
    },
    createAuctionSuccess(state) {
      state.loading = false;
    },
    createAuctionFailed(state) {
      state.loading = false;
    },
    getAllAuctionItemRequest(state) {
      state.loading = true;
    },
    getAllAuctionItemSuccess(state, action: PayloadAction<AuctionItem[]>) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAllAuctionItemFailed(state) {
      state.loading = false;
    },
    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(
      state,
      action: PayloadAction<{ auctionItem: any; bidders: any }>
    ) {
      state.loading = false;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state) {
      state.loading = false;
    },
    getMyAuctionsRequest(state) {
      state.loading = true;
      state.myAuctions = [];
    },
    getMyAuctionsSuccess(state, action: PayloadAction<AuctionItem[]>) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionsFailed(state) {
      state.loading = false;
      state.myAuctions = [];
    },
    deleteAuctionItemRequest(state) {
      state.loading = true;
    },
    deleteAuctionItemSuccess(state) {
      state.loading = false;
    },
    deleteAuctionItemFailed(state) {
      state.loading = false;
    },
    republishItemRequest(state) {
      state.loading = true;
    },
    republishItemSuccess(state) {
      state.loading = false;
    },
    republishItemFailed(state) {
      state.loading = false;
    },
    resetSlice(state) {
      state.loading = false;
    },
  },
});

// ✅ Get All Auction Items
export const getAllAuctionItems = () => async (dispatch: AppDispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auctionitem/allitems",
      { withCredentials: true }
    );
    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.getAllAuctionItemFailed());
    console.error(error);
  }
};

// ✅ Get My Auction Items
export const getMyAuctionItems = () => async (dispatch: AppDispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionsRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auctionitem/myitems",
      { withCredentials: true }
    );
    dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));
  } catch (error) {
    dispatch(auctionSlice.actions.getMyAuctionsFailed());
    console.error(error);
  }
};

// ✅ Get Auction Detail
export const getAuctionDetail =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(auctionSlice.actions.getAuctionDetailRequest());
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/auctionitem/auction/${id}`,
        { withCredentials: true }
      );
      dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
    } catch (error) {
      dispatch(auctionSlice.actions.getAuctionDetailFailed());
      console.error(error);
    }
  };

// ✅ Create Auction
export const createAuction =
  (data: FormData) => async (dispatch: AppDispatch) => {
    dispatch(auctionSlice.actions.createAuctionRequest());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auctionitem/create",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(auctionSlice.actions.createAuctionSuccess());
      toast.success(response.data.message);
      dispatch(getAllAuctionItems());
    } catch (error: any) {
      dispatch(auctionSlice.actions.createAuctionFailed());
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  export const deleteAuction =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(auctionSlice.actions.deleteAuctionItemRequest());
    try {
      const response = await axios.delete<{ message: string }>(
        `http://localhost:5000/api/v1/auctionitem/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(auctionSlice.actions.deleteAuctionItemSuccess());
      toast.success(response.data.message);

      // Refresh auction items
      dispatch(getMyAuctionItems());
      dispatch(getAllAuctionItems());

      dispatch(auctionSlice.actions.resetSlice());
    } catch (error: any) {
      dispatch(auctionSlice.actions.deleteAuctionItemFailed());

      const errorMessage =
        error?.response?.data?.message || error?.message || "An error occurred";

      toast.error(errorMessage);
      console.error("Auction deletion error:", errorMessage);

      dispatch(auctionSlice.actions.resetSlice());
    }
  };


export default auctionSlice.reducer;
