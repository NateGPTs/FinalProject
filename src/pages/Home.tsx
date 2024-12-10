import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { SiNetflix } from 'react-icons/si';
import { BsFillPlayFill, BsStarFill, BsCollectionPlay, BsCalendar3, BsFire } from 'react-icons/bs';
import { HiTrendingUp } from 'react-icons/hi';
import Tilt from 'react-parallax-tilt';
import Navigation from "./Navigation"

const styles = `
.bg-gradient-dark {
  background: linear-gradient(180deg, #000000 0%, #1a0000 100%);
}

.text-gradient {
  background: linear-gradient(45deg, #ff0000, #cc0000);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.movie-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 0, 0, 0.1);
}

.movie-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255, 0, 0, 0.3);
}

.movie-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.custom-shadow {
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.15);
}

.hero-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%);
}

.red-glow {
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
}

.category-card {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: scale(1.03);
  background: rgba(255, 0, 0, 0.15);
  border-color: rgba(255, 0, 0, 0.4);
}

.nav-link {
  position: relative;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #ff0000;
  transition: width 0.3s ease;
}

.nav-link:hover:after {
  width: 100%;
}

.custom-btn {
  background: #ff0000;
  border: none;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background: #cc0000;
  transform: translateY(-2px);
}

.custom-outline-btn {
  border: 2px solid #ff0000;
  color: #ff0000;
  transition: all 0.3s ease;
}

.custom-outline-btn:hover {
  background: rgba(255, 0, 0, 0.1);
  transform: translateY(-2px);
}

.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.newsletter-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: white;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 0, 0, 0.4);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
}
`;

const featuredMovies = [
  {
    title: "Red Rising",
    genre: "Sci-Fi Action",
    rating: 9.4,
    poster: "https://th.bing.com/th/id/OIP.rvxkm3ZswfeGymXwjT686wAAAA?rs=1&pid=ImgDetMain",
    year: 2024,
    duration: "2h 35m",
    description: "In a dystopian future, a revolutionary rises against a color-coded society."
  },
  {
    title: "Crimson Peak",
    genre: "Gothic Romance",
    rating: 8.9,
    poster: "https://th.bing.com/th/id/OIP.rvxkm3ZswfeGymXwjT686wAAAA?rs=1&pid=ImgDetMain",
    year: 2024,
    duration: "2h 15m",
    description: "A mysterious tale of love, betrayal, and supernatural occurrences."
  },
  {
    title: "Black Swan",
    genre: "Psychological Thriller",
    rating: 9.1,
    poster: "https://th.bing.com/th/id/OIP.rvxkm3ZswfeGymXwjT686wAAAA?rs=1&pid=ImgDetMain",
    year: 2024,
    duration: "2h 10m",
    description: "A ballet dancer's pursuit of perfection leads to a dark transformation."
  },
  {
    title: "Scarlet Revenge",
    genre: "Action Drama",
    rating: 8.8,
    poster: "https://th.bing.com/th/id/OIP.rvxkm3ZswfeGymXwjT686wAAAA?rs=1&pid=ImgDetMain",
    year: 2024,
    duration: "2h 25m",
    description: "An elite assassin seeks vengeance in a neon-lit underworld."
  },
  {
    title: "Ruby Spark",
    genre: "Romance",
    rating: 8.7,
    poster: "https://th.bing.com/th/id/OIP.rvxkm3ZswfeGymXwjT686wAAAA?rs=1&pid=ImgDetMain",
    year: 2024,
    duration: "2h 05m",
    description: "A writer's fictional character mysteriously comes to life."
  }
];

const categories = [
  { 
    name: "Action",
    count: 245,
    icon: BsFire,
    description: "High-octane thrills and explosive entertainment"
  },
  {
    name: "Drama",
    count: 189,
    icon: BsCollectionPlay,
    description: "Compelling stories that move and inspire"
  },
  {
    name: "Sci-Fi",
    count: 156,
    icon: HiTrendingUp,
    description: "Mind-bending adventures in future worlds"
  },
  {
    name: "Horror",
    count: 123,
    icon: BsCalendar3,
    description: "Spine-chilling tales of terror and suspense"
  }
];

const MovieCard = ({ movie, index }: { movie: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="movie-card custom-shadow"
    style={{ width: '320px' }}
  >
    <Tilt>
      <div className="card bg-black h-100">
        <div className="position-relative">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="card-img-top"
            style={{ height: '450px', objectFit: 'cover' }}
          />
          <div className="movie-overlay position-absolute top-0 start-0 w-100 h-100">
            <div className="position-absolute bottom-0 p-4 w-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-danger">{movie.genre}</span>
                <small className="text-white">{movie.duration}</small>
              </div>
              <h3 className="text-white fw-bold mb-2">{movie.title}</h3>
              <p className="text-white-50 small mb-3">{movie.description}</p>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center text-white">
                  <BsStarFill className="text-danger me-1" />
                  <span className="fw-bold">{movie.rating}</span>
                </div>
                <small className="text-white-50">{movie.year}</small>
              </div>
              <motion.button 
                className="btn custom-btn w-100 d-flex align-items-center justify-content-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <BsFillPlayFill className="fs-5" />
                Watch Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  </motion.div>
);
<Navigation/>
const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <ParallaxProvider>
      <style>{styles}</style>
      <div className="bg-black min-vh-100">
        <Navigation />

        {/* Hero Section */}
        <div className="position-relative vh-100">
          <Parallax translateY={[-20, 20]} className="position-absolute w-100 h-100">
            <div 
              className="h-100 w-100"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5)'
              }}
            />
          </Parallax>

          <div className="hero-overlay position-absolute w-100 h-100" />

          <motion.div 
            className="position-absolute w-100 h-100 d-flex align-items-center"
            style={{ opacity }}
          >
            <div className="container">
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="display-4 fw-bold text-white mb-4">
                  Your Gateway to
                  <span className="text-gradient"> Cinematic Wonder</span>
                </h1>
                <p className="lead text-white-50 mb-4">
                  Dive into an ocean of entertainment with our curated collection of films and shows.
                </p>
                <div className="d-flex gap-3">
                  <motion.button 
                    className="btn custom-btn btn-lg px-4 d-flex align-items-center gap-2 red-glow"
                    whileHover={{ scale: 1.05 }}
                  >
                    <BsFillPlayFill className="fs-5" />
                    Watch Now
                  </motion.button>
                  <motion.button 
                    className="btn custom-outline-btn btn-lg px-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    Explore Library
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Featured Movies Section */}
        <section className="py-5 bg-gradient-dark">
          <div className="container">
            <h2 className="text-white mb-4 d-flex align-items-center gap-2">
              <HiTrendingUp className="text-danger" />
              Featured Today
            </h2>
            <div className="d-flex gap-4 overflow-auto pb-4 scroll-container">
              {featuredMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-5 bg-black">
          <div className="container">
            <h2 className="text-white mb-4">Browse Categories</h2>
            <div className="row g-4">
              {categories.map((category, index) => (
                <div key={index} className="col-md-3">
                  <motion.div 
                    className="category-card rounded-3 h-100 p-4 custom-shadow"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <category.icon className="text-danger fs-4" />
                      <h3 className="text-white fw-bold mb-0">{category.name}</h3>
                    </div>
                    <p className="text-white-50 mb-2">{category.description}</p>
                    <span className="badge bg-danger">{category.count} titles</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-5 bg-gradient-dark">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <h2 className="text-white mb-4">Stay in the Loop</h2>
                <p className="text-white-50 mb-4">
                  Get notified about new releases, exclusive content, and special events.
                </p>
                <div className="input-group mb-3">
                  <input 
                    type="email" 
                    className="form-control newsletter-input"
                    placeholder="Enter your email"
                  />
                  <motion.button 
                    className="btn custom-btn px-4 red-glow"
                    whileHover={{ scale: 1.05 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ParallaxProvider>
  );
};

export default Home;