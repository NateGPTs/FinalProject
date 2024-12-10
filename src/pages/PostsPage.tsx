import Post from "./Post";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchSortedPosts } from "../store/slices/postSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    console.log('Fetching posts...');
    dispatch(fetchSortedPosts())
      .then((action) => {
        console.log('Posts response:', action);
      });
  }, [dispatch]);

  

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* Background overlay with animated gradient */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.85),
              rgba(20, 0, 0, 0.9)
            ),
            url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="position-relative container-fluid px-4 py-5" style={{ zIndex: 2 }}>
        <motion.div
          className="row justify-content-center g-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ paddingTop: "80px" }}
        >
          <div className="col-xl-8 col-lg-9">
            <div className="d-grid gap-4">
              <Link to="/AddPost" className="text-decoration-none">
                <button className="btn btn-danger btn-sm px-3">Add Post</button>
              </Link>
              {posts?.map((post: Post) => (
                <Post 
                  username={post.userId}
                  title={post.title}
                  description={post.description}
                  time={post.createdAt}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}