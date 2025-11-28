import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Use environment variable for backend URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    books: [],
    error: null,
    message: null,
  },
  reducers: {
    addBookRequest: (state) => {
      state.loading = true;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBooksRequest: (state) => {
      state.loading = true;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookRequest: (state) => {
      state.loading = true;
    },
    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.books = state.books.filter(book => book._id !== action.payload.bookId);
      state.message = action.payload.message;
    },
    deleteBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  addBookRequest,
  addBookSuccess,
  addBookFailed,
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailed,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailed,
  resetBookSlice,
} = bookSlice.actions;

export default bookSlice.reducer;

// ---------- THUNKS ---------- //

export const addBook = (formData) => async (dispatch) => {
  dispatch(addBookRequest());
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/book/admin/add`, formData, {
      withCredentials: true,
    });
    dispatch(addBookSuccess(data.message));
  } catch (err) {
    dispatch(addBookFailed(err.response?.data?.message || "Failed to add book"));
  }
};

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/book/all`, {
      withCredentials: true,
    });
    dispatch(fetchBooksSuccess(data.books));
  } catch (err) {
    dispatch(fetchBooksFailed(err.response?.data?.message || "Failed to fetch books"));
  }
};

export const deleteBook = ({ bookId }) => async (dispatch) => {
  dispatch(deleteBookRequest());
  try {
    const { data } = await axios.delete(`${BASE_URL}/api/v1/book/delete/${bookId}`, {
      withCredentials: true,
    });
    dispatch(deleteBookSuccess({ message: data.message, bookId }));
  } catch (err) {
    dispatch(deleteBookFailed(err.response?.data?.message || "Failed to delete book"));
  }
};
