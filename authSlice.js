import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/auth';

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get user profile
export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`
        }
      };
      const response = await axios.get(`${API_URL}/profile`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`
        }
      };
      const response = await axios.put(`${API_URL}/profile`, userData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    userToken: null,
    isAdmin: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.isAdmin = false;
      localStorage.removeItem('persist:root');
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;