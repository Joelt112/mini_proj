import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";

interface UserState {
  loading: boolean;
  isAuthenticated: boolean;
  user: Record<string, any>;
  leaderboard: any[];
}

const initialState: UserState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  leaderboard: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action: PayloadAction<{ user: any }>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
    },
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<{ user: any }>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
    },
    fetchUserRequest(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
    },
    // FIX: Removed unused `action` parameter
    fetchLeaderboardRequest(state) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state) {
      state.loading = false;
      state.leaderboard = [];
    },
  },
});

export const register = (data: FormData) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
  } catch (error: any) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

export const login =
  (data: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        data,
        { withCredentials: true }
      );

      dispatch(userSlice.actions.loginSuccess({ user: response.data.user }));
      toast.success(response.data.message || "Login successful!");
    } catch (error: any) {
      dispatch(userSlice.actions.loginFailed());
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await axios.get("http://localhost:5000/api/v1/user/logout", {
      withCredentials: true,
    });

    dispatch(userSlice.actions.logoutSuccess());
    toast.success("Logged out successfully");
  } catch (error: any) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

export const fetchUser = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get("http://localhost:5000/api/v1/user/me", {
      withCredentials: true,
    });

    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
  } catch (error: any) {
    dispatch(userSlice.actions.fetchUserFailed());
  }
};

export const fetchLeaderboard = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/leaderboard",
      {
        withCredentials: true,
      }
    );
    dispatch(
      userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard)
    );
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};

export default userSlice.reducer;
