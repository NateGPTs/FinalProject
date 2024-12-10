import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../store/store';
import {createPost, clearError} from "../store/slices/postSlice"


export default function AddPostsPage(){

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [movieSearch, setMovieSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [postData, setPostData] = useState({
    userId: user?.id,
    title: "",
    description: "",
    movieName: "",
    movieId: "",
    comments: []
  });

  const searchMovies = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a73ae720d44df6ecef804a9aa6a127c1&query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results.slice(0, 5)); // Limit to 5 results
    } catch (err) {
      console.error('Failed to search movies:', err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMovies(movieSearch);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [movieSearch]);

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie);
    setPostData(prev => ({
      ...prev,
      movieName: movie.title,
      movieId: movie.id.toString()
    }));
    setMovieSearch("");
    setSearchResults([]);
  };

  const handleSave = async () => {
    if (!selectedMovie) return;

    const newPost = {
      userId: user?.id,
      title: postData.title,
      description: postData.description,
      movieName: selectedMovie.title,
      movieId: selectedMovie.id.toString(),
      comments: postData.comments,
      createdAt: new Date().toISOString()
    };
    
    console.log("movieId:" + newPost.movieId);
    const response = await dispatch(createPost(newPost));

    setPostData({
      userId: user?.id,
      title: "",
      description: "",
      movieName: "",
      movieId: "",
      comments: []
    });
    setSelectedMovie(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (error) {
      dispatch(clearError());
    }
  };
 
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #000000 0%, #1a0000 100%)",
      color: "white",
      padding: "80px 20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "white",
    },
    heading: {
      color: "white",
      marginBottom: "30px",
    },
    errorMessage: {
      color: "#ff4444",
      marginBottom: "20px",
    }
  };
  // Add CSS for focus effect
  const styleTag = document.createElement("style");
  styleTag.textContent = `
    .form-control {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      background: rgba(0, 0, 0, 0.5) !important;
      border: 1px solid rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      color: white !important;
      transition: all 0.3s ease;
      -webkit-text-fill-color: white !important;
    }
    .form-control:focus {
      box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
      outline: none;
      border-color: #E31837;
      background: rgba(0, 0, 0, 0.5) !important;
      color: white !important;
      -webkit-text-fill-color: white !important;
    }
    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .form-control:-webkit-autofill,
    .form-control:-webkit-autofill:hover,
    .form-control:-webkit-autofill:focus {
      -webkit-text-fill-color: white !important;
      -webkit-box-shadow: 0 0 0px 1000px black inset !important;
      transition: background-color 5000s ease-in-out 0s;
    }
    .custom-outline-btn {
      background: transparent;
      border: 2px solid #E31837;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .custom-outline-btn:hover {
      background: rgba(227, 24, 55, 0.1);
    }
    .custom-outline-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(styleTag);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create New Post</h1>
      {error && <div style={styles.errorMessage}>{error}</div>}
      
      <div>
        <label style={styles.label}>Title</label>
        <input
          id="title"
          className="form-control"
          onChange={handleInputChange}
          value={postData.title}
        />
      </div>

      <div>
        <label style={styles.label}>Description</label>
        <input
          id="description"
          className="form-control"
          type="text"
          onChange={handleInputChange}
          value={postData.description}
          placeholder="Enter description"
        />
      </div>

      <div className="position-relative">
        <label style={styles.label}>Search Movie</label>
        <input
          className="form-control"
          type="text"
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value)}
          placeholder="Search for a movie..."
        />
        
        {/* Selected Movie Display */}
        {selectedMovie && (
          <div className="selected-movie mt-2 p-2 bg-dark border border-danger rounded">
            <div className="d-flex justify-content-between align-items-center">
              <span>{selectedMovie.title} ({new Date(selectedMovie.release_date).getFullYear()})</span>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => setSelectedMovie(null)}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="position-absolute w-100 mt-1 bg-dark border border-secondary rounded z-index-1000">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="p-2 border-bottom border-secondary hover-bg-danger cursor-pointer"
                onClick={() => handleMovieSelect(movie)}
                style={{ cursor: 'pointer' }}
              >
                <div className="text-white">
                  {movie.title}
                  <small className="text-muted ms-2">
                    ({new Date(movie.release_date).getFullYear()})
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {isSearching && (
          <div className="text-center mt-2">
            <div className="spinner-border spinner-border-sm text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <motion.button
          className="btn btn-danger float-right custom-outline-btn px-4"
          whileHover={{ scale: 1.05 }}
          onClick={handleSave}
          disabled={isLoading || !selectedMovie}
        >
          Create Post
        </motion.button>
      </div>
    </div>
  );
}