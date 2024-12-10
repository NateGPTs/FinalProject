import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/post';

// Types based on your Java models
interface Comment {
  id: string;
  comment: string;
  userId: string;
  username: string;

  // Add other comment properties
}

interface Post {
  id: string;
  comments: Comment[];
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  movieName: string;
  movieId: string;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchSortedPosts = createAsyncThunk(
    'posts/fetchSorted',
    async (_, { rejectWithValue }) => {
      try {
        console.log('Making API request to:', `${API_URL}/sortedPC`);
        const response = await axios.get(`${API_URL}/sortedPC`);
        console.log('API response:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('API error:', error);
        return rejectWithValue(error.response?.data || 'Failed to fetch posts');
      }
    }
  );

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData: Partial<Post>, { rejectWithValue }) => {
    try {
      console.log("movieId:" + postData.movieId);
      const response = await axios.post(`${API_URL}/create`, postData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/id`, { 
        data: postId  // Spring expects the ID in the request body
      });
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sorted posts
      .addCase(fetchSortedPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSortedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchSortedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload); // Add new post at the beginning
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;