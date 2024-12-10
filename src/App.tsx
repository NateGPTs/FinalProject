import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signin from "./pages/auth/Login.tsx"
import Signup from "./pages/auth/Register.tsx"
import Profile from "./pages/user/Profile.tsx"
import './index.css'
import Navigation from './pages/Navigation.tsx';
import PostsPage from './pages/PostsPage.tsx';
import MovieDetail from './pages/movies/MovieDetail.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import EditProfile from './pages/user/EditProfile.tsx';
import { HashRouter } from 'react-router-dom'; 
import AddPostPage from './pages/AddPostPage.tsx';
import SearchPage from './pages/SearchPage.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Navigation/>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<PostsPage />} />
              <Route path="/search/movies/:imdbId" element={<MovieDetail />} />
              <Route path="/Login" element={<Signin/>}/>
              <Route path="/Signup" element={<Signup/>}/>
              <Route path="/Profile" element={<Profile/>}/>
              <Route path="/Profile/:id" element={<Profile/>}/>
              <Route path="/EditProfile" element={<EditProfile/>}/>
              <Route path="/AddPost" element={<AddPostPage/>}/>
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default App;