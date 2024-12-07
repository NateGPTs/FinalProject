import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.tsx";
import MovieList from "./pages/movies/MovieList.tsx";
import MovieDetail from "./pages/movies/MovieDetail.tsx";


const App = () => {

  return (
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
};

export default App;