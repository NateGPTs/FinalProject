import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postSlice';
import commentsReducer from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    posts: postsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;