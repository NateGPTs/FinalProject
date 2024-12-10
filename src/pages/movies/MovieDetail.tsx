import React, { useState, useEffect } from 'react';
import { Star, Clock, Film, Award, User, Trash2, Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import Navigation from '../Navigation';
import MovieDetailsDialog from './MovieDetailsDialogue';

interface MovieDetails {
  title: string;
  release_date: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  poster_path: string;
  vote_average: number;
  credits: {
    cast: Array<{ id: number; name: string }>;
    crew: Array<{ id: number; name: string; job: string }>;
  };
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  comments: Comment[];
  userId: string;
  title: string;
  description: string;
  movieName: string;
  createdAt: string;
}

const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const { user } = useSelector((state: RootState) => state.auth);
  const [showDialog, setShowDialog] = useState(false);
  
  const { imdbId } = useParams<{ imdbId: string }>();

  useEffect(() => {
    const fetchMovieAndPosts = async () => {
      setLoading(true);
      try {
        // Fetch movie details from TMDB
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${imdbId}?api_key=a73ae720d44df6ecef804a9aa6a127c1&append_to_response=credits`
        );
        const movieData = await movieResponse.json();
        
        if (movieData.success === false) {
          throw new Error(movieData.status_message);
        }

        setMovie(movieData);

        // Fetch posts from backend
        const postsResponse = await fetch(`http://localhost:8080/api/post/sorted/${imdbId}`);
        const postsData = await postsResponse.json();

        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (imdbId) {
      fetchMovieAndPosts();
    }
  }, [imdbId]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie || !user) return;

    try {
      const response = await fetch('http://localhost:8080/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPost,
          userId: user.id,
          movieName: movie.title,
          comments: [],
          movieId : imdbId,
        })
      });
      const createdPost = await response.json();
      setPosts(prev => [createdPost, ...prev]);
      setNewPost({ title: '', description: '' });
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleAddComment = async (postId: string) => {
    const content = newComments[postId];
    if (!content || !user) return;

    try {
      await fetch(`http://localhost:8080/api/post/post/comment/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          content
        })
      });

      // Refresh posts to get updated comments
      const response = await fetch('http://localhost:8080/api/post/sortedPC');
      const updatedPosts = await response.json();
      setPosts(updatedPosts.filter((post: Post) => 
        post.movieName.toLowerCase() === movie?.title.toLowerCase()
      ));
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:8080/api/post/delete/${postId}`)
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      console.error('Failed to delete post:', err);
    };
  }  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="alert alert-danger text-center m-4">
        {error || 'Movie not found'}
      </div>
    );
  }

  const director = movie.credits.crew.find(
    person => person.job === 'Director'
  )?.name || 'Unknown';

  const cast = movie.credits.cast
    .slice(0, 5)
    .map(actor => actor.name)
    .join(', ');


  return (
    <>
      <Navigation />
      <div className="min-vh-100 bg-dark" style={{ paddingTop: '80px' }}>
        <div className="container py-5">
          {/* Movie Details Section */}
          <div className="row mb-5">
            <div className="col-md-4">
              <img 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/api/placeholder/300/450'}
                alt={movie.title}
                className="img-fluid rounded shadow"
              />
            </div>
            
            <div className="col-md-8">
              <h1 className="text-light mb-4">{movie.title}</h1>
              <div className="d-flex gap-4 mb-4 text-light">
                <span className="d-flex align-items-center">
                  <Star className="text-warning me-2" />
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="d-flex align-items-center">
                  <Clock className="me-2" />
                  {movie.runtime} min
                </span>
                <span className="d-flex align-items-center">
                  <Film className="me-2" />
                  {movie.genres.map(g => g.name).join(', ')}
                </span>
              </div>
              
              <p className="text-light mb-4">{movie.overview}</p>
              
              <div className="row text-light">
                <div className="col-md-6 mb-3">
                  <h3 className="h5">Director</h3>
                  <p>{director}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h3 className="h5">Cast</h3>
                  <p>{cast}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <h3 className="h5">Released</h3>
                  <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Post Section */}
          <div className="card bg-dark text-light border-secondary mb-4">
            <div className="card-header">
              <h2 className="h4 mb-0">Create a Post</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreatePost}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Write your thoughts..."
                    value={newPost.description}
                    onChange={e => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">Post</button>
              </form>
            </div>
          </div>

          {/* Posts Section */}
          <div className="posts-section">
            {posts.map(post => (
              <div key={post.id} className="card bg-dark text-light border-secondary mb-4">
                <div className="card-header d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h5 mb-1">{post.title}</h3>
                    <small className="text-muted d-flex align-items-center">
                      <User className="me-2" size={16} />
                      {post.userId}
                    </small>
                  </div>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="card-body">
                  <p className="mb-4">{post.description}</p>
                  
                  {/* Comments Section */}
                  <div className="comments-section">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="bg-secondary bg-opacity-25 p-3 rounded mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <User size={16} className="text-muted me-2" />
                          <span className="text-muted">{comment.userId}</span>
                        </div>
                        <p className="mb-0">{comment.content}</p>
                      </div>
                    ))}
                    
                    {/* Add Comment Form */}
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Add a comment..."
                        value={newComments[post.id] || ''}
                        onChange={e => setNewComments(prev => ({
                          ...prev,
                          [post.id]: e.target.value
                        }))}
                      />
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleAddComment(post.id)}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;