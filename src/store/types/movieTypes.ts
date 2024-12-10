// types.ts
export interface Comment {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
  }
  
  export interface Post {
    id: string;
    comments: Comment[];
    userId: string;
    title: string;
    description: string;
    movieName: string;
    createdAt: string;
  }
  
  export interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{ Source: string; Value: string }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }
  
  export interface MovieState {
    currentMovie: Movie | null;
    posts: Post[];
    loading: boolean;
    error: string | null;
  }