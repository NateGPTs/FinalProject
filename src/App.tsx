import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.tsx";
import MovieList from "./pages/PostsPage.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signin from "./pages/auth/Login.tsx"
import Signup from "./pages/auth/Register.tsx"
import Profile from "./pages/user/Profile.tsx"
import './index.css'
import Navigation from './pages/Navigation.tsx';
import PostsPage from './pages/PostsPage.tsx';
import MovieDetail from './pages/movies/MovieDetail.tsx';


const App = () => {

  return (
      <Router>
        <div className="App">
          <Navigation/>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<PostsPage />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/Login" element={<Signin/>}/>
              <Route path="/Signup" element={<Signup/>}/>
              <Route path="/Profile" element={<Profile/>}/>
            </Routes>
          </main>
        </div>
      </Router>
  );
};

export default App;