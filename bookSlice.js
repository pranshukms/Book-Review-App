import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/books';

// Get all books
export const getBooks = createAsyncThunk(
  'books/getBooks',
  async (params, { rejectWithValue }) => {
    try {
      const { page, limit, search, genre } = params;
      const response = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}&search=${search}&genre=${genre}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get single book
export const getBookById = createAsyncThunk(
  'books/getBookById',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBookReviews = createAsyncThunk(
  'books/getBookReviews',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/books/${bookId}/reviews`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create book(admin)
export const createBook = createAsyncThunk(
  'books/createBook',
  async (bookData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`
        }
      };
      const response = await axios.post(API_URL, bookData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    currentBook: null,
    page: 1,
    pages: 1,
    totalBooks: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all books
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.totalBooks = action.payload.totalBooks;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get single book
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create book
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default bookSlice.reducer;