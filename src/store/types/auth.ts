

// Based on the back ends data structure.

export interface Post {
    // Add your post interface properties here based on your backend post class
  }
  
  export interface Comment {
    // Add your comment interface properties here based on your backend comment class
  }
  
  export interface User {
    description: string;
    firstName: string;
    lastName: string;
    id: string;
    username: string;
    password: string;
    post: Post[];
    comments: Comment[];
  }
  
  export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }