import axios from "axios";
import { createSlice, PayloadAction, AsyncThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllAuctionItems } from "./auctionSlice";
import { AppDispatch, RootState } from "@/store/store"; // Ensure these types are properly defined in your store

interface Proof {
  public_id: string;
  url: string;
  status: string;
  amount: number;
  comment: string;
  uploadedAt: string;
}

interface PaymentProof {
  _id: string;
  userId: string;
  proof: Proof;
}

interface SuperAdminState {
  loading: boolean;
  monthlyRevenue: any[];
  totalAuctioneers: any[];
  totalBidders: any[];
  paymentProofs: PaymentProof[];
  singlePaymentProof: PaymentProof | {};
}

const initialState: SuperAdminState = {
  loading: false,
  monthlyRevenue: [],
  totalAuctioneers: [],
  totalBidders: [],
  paymentProofs: [],
  singlePaymentProof: {},
};

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    requestForMonthlyRevenue(state) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    successForMonthlyRevenue(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    failedForMonthlyRevenue(state) {
      state.loading = false;
      state.monthlyRevenue = [];
    },
    requestForAllUsers(state) {
      state.loading = true;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    successForAllUsers(state, action: PayloadAction<{ auctioneersArray: any[]; biddersArray: any[] }>) {
      state.loading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    failureForAllUsers(state) {
      state.loading = false;
      state.totalAuctioneers = [];
      state.totalBidders = [];
    },
    requestForPaymentProofs(state) {
      state.loading = true;
      state.paymentProofs = [];
    },
    successForPaymentProofs(state, action: PayloadAction<PaymentProof[]>) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    failureForPaymentProofs(state) {
      state.loading = false;
      state.paymentProofs = [];
    },
    requestForDeletePaymentProof(state) {
      state.loading = true;
    },
    successForDeletePaymentProof(state) {
      state.loading = false;
    },
    failureForDeletePaymentProof(state) {
      state.loading = false;
    },
    requestForSinglePaymentProofDetail(state) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    successForSinglePaymentProofDetail(state, action: PayloadAction<PaymentProof>) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failureForSinglePaymentProofDetail(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },
    requestForUpdatePaymentProof(state) {
      state.loading = true;
    },
    successForUpdatePaymentProof(state) {
      state.loading = false;
    },
    failureForUpdatePaymentProof(state) {
      state.loading = false;
    },
    requestForAuctionItemDelete(state) {
      state.loading = true;
    },
    successForAuctionItemDelete(state) {
      state.loading = false;
    },
    failureForAuctionItemDelete(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
      state.monthlyRevenue = state.monthlyRevenue;
      state.paymentProofs = state.paymentProofs;
      state.totalAuctioneers = state.totalAuctioneers;
      state.totalBidders = state.totalBidders;
      state.singlePaymentProof = {};
    },
  },
});

// Async Thunk Actions
export const getMonthlyRevenue = () => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/superadmin/monthlyincome",
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failedForMonthlyRevenue());
    console.error(error.response?.data?.message);
  }
};

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForAllUsers());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/superadmin/users/getall",
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForAllUsers(response.data));
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failureForAllUsers());
    console.error(error.response?.data?.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForPaymentProofs());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/superadmin/paymentproofs/getall",
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForPaymentProofs(
        response.data.paymentProofs
      )
    );
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failureForPaymentProofs());
    console.error(error.response?.data?.message);
  }
};

export const deletePaymentProof = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForDeletePaymentProof());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/superadmin/paymentproof/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForDeletePaymentProof());
    dispatch(getAllPaymentProofs());
    toast.success(response.data.message);
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failureForDeletePaymentProof());
    console.error(error.response?.data?.message);
    toast.error(error.response?.data?.message);
  }
};

export const getSinglePaymentProofDetail = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForSinglePaymentProofDetail());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/superadmin/paymentproof/${id}`,
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForSinglePaymentProofDetail(
        response.data.paymentProofDetail
      )
    );
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failureForSinglePaymentProofDetail());
    console.error(error.response?.data?.message);
  }
};

export const updatePaymentProof = (id: string, status: string, amount: number) => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForUpdatePaymentProof());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/superadmin/paymentproof/status/update/${id}`,
      { status, amount },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(superAdminSlice.actions.successForUpdatePaymentProof());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
    dispatch(superAdminSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failureForUpdatePaymentProof());
    console.error(error.response?.data?.message);
    toast.error(error.response?.data?.message);
  }
};

export const deleteAuctionItem = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.requestForAuctionItemDelete());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/superadmin/auctionitem/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForAuctionItemDelete());
    toast.success(response.data.message);
    dispatch(getAllAuctionItems());
  } catch (error: any) {
    dispatch(superAdminSlice.actions.failureForAuctionItemDelete());
    console.error(error.response?.data?.message);
    toast.error(error.response?.data?.message);
  }
};

export const clearAllSuperAdminSliceErrors = () => (dispatch: AppDispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;