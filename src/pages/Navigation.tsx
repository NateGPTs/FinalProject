import { motion } from "framer-motion";
import { MdLocalMovies } from "react-icons/md";

export default function Navigation(){
    return(    <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-3" style={{ background: 'rgba(0, 0, 0, 0.95)' }}>
        <div className="container">
          <motion.a className="navbar-brand d-flex align-items-center gap-2" whileHover={{ scale: 1.05 }}>
            <MdLocalMovies className="text-danger fs-3" />
            <span className="fw-bold text-white">MovieVerse</span>
          </motion.a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item px-3">
                <a className="nav-link text-white" href="/">Home</a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link text-white" href="/movies">MoviesList</a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link text-white" href="/Profile">Profile</a>
              </li>


              <li className="nav-item px-3">
                <a href="/Login">
                <motion.button 
                  className="btn btn-danger px-4 rounded-pill red-glow text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign In
                </motion.button>
                </a>
              </li>
              <li className="nav-item px-3">
                <a href="/Signup">
                <motion.button 
                  className="btn btn-danger px-4 rounded-pill red-glow text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Sign up
                </motion.button>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>)
}

 