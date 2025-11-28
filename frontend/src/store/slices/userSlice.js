import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddNewAdminPopup } from "./popUpSlice";

const API = import.meta.env.VITE_BACKEND_URL + "/api/v1/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    message: null,
    users: [],
    promoteLoading: false,
    promoteError: null,
    promoteMessage: null,
  },
  reducers: {
    // Fetch All Users
    fetchAllUsersRequest: (state) => { state.loading = true; },
    fetchAllUsersSuccess: (state, action) => { state.loading = false; state.users = action.payload; },
    fetchAllUsersFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    // Add New Admin
    addNewAdminRequest: (state) => { state.loading = true; },
    addNewAdminSuccess: (state, action) => { state.loading = false; state.message = action.payload; },
    addNewAdminFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    // Promote User to Admin
    promoteUserRequest: (state) => { state.promoteLoading = true; },
    promoteUserSuccess: (state, action) => { state.promoteLoading = false; state.promoteMessage = action.payload; },
    promoteUserFailed: (state, action) => { state.promoteLoading = false; state.promoteError = action.payload; },

    // Reset Slice
    resetUserSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.promoteLoading = false;
      state.promoteError = null;
      state.promoteMessage = null;
    },
  },
});

export const {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailed,
  addNewAdminRequest,
  addNewAdminSuccess,
  addNewAdminFailed,
  promoteUserRequest,
  promoteUserSuccess,
  promoteUserFailed,
  resetUserSlice,
} = userSlice.actions;

// Thunks
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersRequest());
  try {
    const { data } = await axios.get(`${API}/all`, { withCredentials: true });
    dispatch(fetchAllUsersSuccess(data.users));
  } catch (err) {
    dispatch(fetchAllUsersFailed(err.response?.data?.message || "Failed to fetch users"));
  }
};

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(addNewAdminRequest());
  try {
    const { data: res } = await axios.post(`${API}/add/new-admin`, data, { withCredentials: true });
    dispatch(addNewAdminSuccess(res.message));
    dispatch(toggleAddNewAdminPopup());
  } catch (err) {
    dispatch(addNewAdminFailed(err.response?.data?.message || "Failed to add admin"));
  }
};

export const promoteUserToAdmin = (email) => async (dispatch) => {
  dispatch(promoteUserRequest());
  try {
    const { data } = await axios.post(`${API}/make-admin`, { email }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(promoteUserSuccess(data.message));
  } catch (err) {
    dispatch(promoteUserFailed(err.response?.data?.message || "Failed to promote user"));
  }
};

export default userSlice.reducer;
