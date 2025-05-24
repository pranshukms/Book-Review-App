import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/books';

// Get book reviews
export const getBookReviews = createAsyncThunk(
  'reviews/getBookReviews',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${bookId}/reviews`);
      return { bookId, reviews: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create review
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ bookId, reviewData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`
        }
      };
      const response = await axios.post(
        `${API_URL}/${bookId}/reviews`,
        reviewData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsByBook: {},
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get book reviews
      .addCase(getBookReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsByBook[action.payload.bookId] = action.payload.reviews;
      })
      .addCase(getBookReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        const bookId = action.payload.book;
        if (state.reviewsByBook[bookId]) {
          state.reviewsByBook[bookId].unshift(action.payload);
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default reviewSlice.reducer;