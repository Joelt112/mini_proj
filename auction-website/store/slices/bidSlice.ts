import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../store"; // Adjust import path as needed
import { getAuctionDetail } from "./auctionSlice";

interface BidState {
  loading: boolean;
}

const initialState: BidState = {
  loading: false,
};

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    bidRequest(state) {
      state.loading = true;
    },
    bidSuccess(state) {
      state.loading = false;
    },
    bidFailed(state) {
      state.loading = false;
    },
  },
});

export const placeBid = (id: string, data: { amount: number }) => 
  async (dispatch: AppDispatch) => {
    dispatch(bidSlice.actions.bidRequest());
    try {
      const response = await axios.post<{ message: string }>(
        `http://localhost:5000/api/v1/bid/place/${id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(bidSlice.actions.bidSuccess());
      toast.success(response.data.message);
      dispatch(getAuctionDetail(id));
    } catch (error: any) {
      dispatch(bidSlice.actions.bidFailed());
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

export default bidSlice.reducer;