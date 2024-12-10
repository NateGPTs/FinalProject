import { motion } from "framer-motion";
import { MdLocalMovies } from "react-icons/md";
import { BsSearch } from "react-icons/bs";  // Add this import for search icon
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-3" style={{ background: 'rgba(0, 0, 0, 0.95)' }}>
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} className="d-flex align-items-center gap-2">
                        <MdLocalMovies className="text-danger fs-3" />
                        <span className="fw-bold text-white">MovieVerse</span>
                    </motion.div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item px-3">
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="nav-link text-white" to="/search">
                                <div className="d-flex align-items-center gap-2">
                                    <BsSearch />
                                    Search
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="nav-link text-white" to="/movies">Posts page</Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="nav-link text-white" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link to="/login">
                                <motion.button
                                    className="btn btn-danger px-4 rounded-pill red-glow text-white"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Sign In
                                </motion.button>
                            </Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link to="/signup">
                                <motion.button
                                    className="btn btn-danger px-4 rounded-pill red-glow text-white"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Sign up
                                </motion.button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}