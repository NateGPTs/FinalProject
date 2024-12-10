import { motion } from "framer-motion";
import { useState } from "react";

// Define proper interface for props
interface CommentProps {
  username: string;
  content: string;
}

export default function Comment({ username, content }: CommentProps) {
  const [showList, setShowList] = useState(false);
  
  const toggleList = () => {
    setShowList(!showList);
  };

  const styles = `
    .movie-card {
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 0, 0, 0.1);
      box-shadow: 0 4px 20px rgba(255, 0, 0, 0.15);
    }

    .movie-card:hover {
      transform: translateY(-10px);
      border-color: rgba(255, 0, 0, 0.3);
    }

    .custom-shadow {
      box-shadow: 0 4px 20px rgba(255, 0, 0, 0.15);
    }

    .card-header {
      background: rgba(255, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 0, 0, 0.2);
    }

    .list-group-item {
      background: rgba(255, 0, 0, 0.1);
      border: 1px solid rgba(255, 0, 0, 0.2);
      color: white;
      transition: all 0.3s ease;
    }

    .list-group-item:hover {
      background: rgba(255, 0, 0, 0.15);
      transform: translateX(5px);
    }

    .list-group-item.active {
      background: #ff0000;
      border-color: #cc0000;
    }

    .btn {
      transition: all 0.3s ease;
      margin-left: 10px;
      margin-bottom: 10px;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 10px rgba(255, 0, 0, 0.2);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <motion.div
        className="card mx-auto bg-black movie-card custom-shadow "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 * 0.1 }}
      >
        <p className="card-header text-danger">{username}</p>
        <p className="card-body text-white">{content}</p>
      </motion.div>
    </>
  );
}