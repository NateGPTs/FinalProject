import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsSearch, BsStarFill, BsClock } from 'react-icons/bs';
import Navigation from './Navigation';

interface MovieResult {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const searchStyles = `
.search-container {
  background: linear-gradient(180deg, #000000 0%, #1a0000 100%);
  min-height: 100vh;
}

.search-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 0, 0, 0.4);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
}

.result-card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 0, 0, 0.3);
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.15);
}

.poster-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.result-card:hover .poster-overlay {
  opacity: 1;
}

.custom-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.custom-btn:hover {
  background-color: #bb2d3b;
  color: white;
}
`;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const searchMovies = async (query: string) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a73ae720d44df6ecef804a9aa6a127c1&query=${query}&language=en-US&page=1&include_adult=false`
      );
      const data = await response.json();
      
      if (data.results) {
        setResults(data.results);
      } else {
        setError('No results found');
        setResults([]);
      }
    } catch (err) {
      setError('Failed to fetch results');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      searchMovies(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
      searchMovies(searchTerm);
    }
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/search/movies/${movieId}`);
  };

  return (
    <div className="search-container">
      <style>{searchStyles}</style>
      <Navigation />
      
      <div className="container py-5">
        <div className="row justify-content-center mb-5" style={{ paddingTop: "80px" }}>
          <div className="col-lg-8">
            <form onSubmit={handleSearch} className="d-flex gap-3">
              <input
                type="text"
                className="form-control form-control-lg search-input text-white"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

              />
              <motion.button
                type="submit"
                className="btn custom-btn px-4 d-flex align-items-center gap-2"
                whileHover={{ scale: 1.05 }}
                disabled={loading}
              >
                <BsSearch />
                Search
              </motion.button>
            </form>
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          {results.map((movie, index) => (
            <motion.div
              key={movie.id}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="result-card h-100 rounded-3 overflow-hidden cursor-pointer"
                onClick={() => handleMovieClick(movie.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="position-relative">
                  <img
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/api/placeholder/300/450'}
                    alt={movie.title}
                    className="w-100"
                    style={{ height: '450px', objectFit: 'cover' }}
                  />
                  <div className="poster-overlay position-absolute top-0 start-0 w-100 h-100">
                    <div className="position-absolute bottom-0 p-4 w-100">
                      <h3 className="text-white mb-2">{movie.title}</h3>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <BsStarFill className="text-warning" />
                          <span className="text-white-50">{movie.vote_average.toFixed(1)}</span>
                          <BsClock className="text-danger ms-2" />
                          <span className="text-white-50">
                            {movie.release_date?.split('-')[0] || 'N/A'}
                          </span>
                        </div>
                        <motion.button
                          className="btn custom-btn btn-sm"
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMovieClick(movie.id);
                          }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;