import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comment';

// Define types
interface Comment {
  id: string;
  comment: string;
  userId: string;
  username: string;
  createdAt: string;
}

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

// Create thunks
export const createComment = createAsyncThunk(
  'comments/create',
  async (commentData: Omit<Comment, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/post`, commentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${commentId}`);
      return commentId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete comment');
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;