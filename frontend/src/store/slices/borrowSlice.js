import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecordBookPopup } from "./popUpSlice";

// Use environment variable for backend URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
  },
  reducers: {
    fetchUserBorrowedBooksRequest: (state) => { state.loading = true; },
    fetchUserBorrowedBooksSuccess: (state, action) => {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchUserBorrowedBooksFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    fetchAllBorrowedBooksRequest: (state) => { state.loading = true; },
    fetchAllBorrowedBooksSuccess: (state, action) => {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowedBooksFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    recordBorrowedBookRequest: (state) => { state.loading = true; },
    recordBorrowedBookSuccess: (state, action) => { state.loading = false; state.message = action.payload; },
    recordBorrowedBookFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    returnBorrowedBookRequest: (state) => { state.loading = true; },
    returnBorrowedBookSuccess: (state, action) => { state.loading = false; state.message = action.payload; },
    returnBorrowedBookFailed: (state, action) => { state.loading = false; state.error = action.payload; },

    resetBorrowSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  fetchUserBorrowedBooksRequest,
  fetchUserBorrowedBooksSuccess,
  fetchUserBorrowedBooksFailed,
  fetchAllBorrowedBooksRequest,
  fetchAllBorrowedBooksSuccess,
  fetchAllBorrowedBooksFailed,
  recordBorrowedBookRequest,
  recordBorrowedBookSuccess,
  recordBorrowedBookFailed,
  returnBorrowedBookRequest,
  returnBorrowedBookSuccess,
  returnBorrowedBookFailed,
  resetBorrowSlice,
} = borrowSlice.actions;

export default borrowSlice.reducer;

// -------- THUNKS -------- //

export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(fetchUserBorrowedBooksRequest());
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/borrow/my-borrowed-books`, { withCredentials: true });
    dispatch(fetchUserBorrowedBooksSuccess(data.borrowedBooks));
  } catch (err) {
    dispatch(fetchUserBorrowedBooksFailed(err.response?.data?.message || "Failed"));
  }
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(fetchAllBorrowedBooksRequest());
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/borrow/borrowed-books-by-user`, { withCredentials: true });
    dispatch(fetchAllBorrowedBooksSuccess(data.borrowedBooks));
  } catch (err) {
    dispatch(fetchAllBorrowedBooksFailed(err.response?.data?.message || "Failed"));
  }
};

export const recordBorrowedBook = ({ bookId, email }) => async (dispatch) => {
  dispatch(recordBorrowedBookRequest());
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/borrow/record-borrow-book/${bookId}`,
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(recordBorrowedBookSuccess(data.message));
    dispatch(toggleRecordBookPopup());
  } catch (err) {
    dispatch(recordBorrowedBookFailed(err.response?.data?.message || "Failed"));
  }
};

export const returnBorrowedBook = ({ bookId, email }) => async (dispatch) => {
  dispatch(returnBorrowedBookRequest());
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/v1/borrow/return-borrowed-book/${bookId}`,
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(returnBorrowedBookSuccess(data.message));
    return data; // so .then(res => toast.success(res.message)) works
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed";
    dispatch(returnBorrowedBookFailed(errorMsg));
    throw new Error(errorMsg);
  }
};

export const resetBorrow = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};
