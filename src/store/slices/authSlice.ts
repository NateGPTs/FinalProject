import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types/auth';

const API_URL = 'http://localhost:8080/api/auth';
const API_URLP = 'http://localhost:8080/api/edit/profile';

// Combined interface for auth state
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
};

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;


// Auth thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(`${API_URL}/login`, credentials, {
        withCredentials: true
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const checkSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(`${API_URL}/check`, {
        withCredentials: true
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Session check failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true
      });
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const newUser = {
        ...userData,
        post: [],
        comments: []
      };
      const response = await axios.post<User>(`${API_URL}/register`, newUser);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({ userId, updatedFields }: { userId: string; updatedFields: any }, { rejectWithValue }) => {
      try {
        console.log('Sending update request:', { userId, updatedFields });
        const response = await axios.put(`${API_URLP}/update`, {
          id: userId,
          ...updatedFields,
        });
        console.log('Update response:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('Update failed:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || 'Profile update failed');
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Check Session
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Profile Update
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
  
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;