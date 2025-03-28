import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../store"; // Adjust the import based on your project structure

interface CommissionState {
  loading: boolean;
}

const initialState: CommissionState = {
  loading: false,
};

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
    },
    postCommissionProofSuccess(state) {
      state.loading = false;
    },
    postCommissionProofFailed(state) {
      state.loading = false;
    },
  },
});

export const postCommissionProof =
  (data: FormData) => async (dispatch: AppDispatch) => {
    dispatch(commissionSlice.actions.postCommissionProofRequest());
    try {
      const response = await axios.post<{ message: string }>(
        "http://localhost:5000/api/v1/commission/proof",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(commissionSlice.actions.postCommissionProofSuccess());
      toast.success(response.data.message);
    } catch (error: any) {
      dispatch(commissionSlice.actions.postCommissionProofFailed());
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

export default commissionSlice.reducer;
