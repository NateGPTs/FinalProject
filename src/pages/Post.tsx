import { motion } from "framer-motion";
import { useState } from "react";
import Comment from "./user/Comments"

interface PostProps {
  username: string;
  title: string;
  description: string;
  time: string;
}
export default function Post({username, title, description, time}: PostProps) {
  const [showList, setShowList] = useState(false);
  const toggleList = () => setShowList(!showList);

  return (
    <motion.div
      className="rounded-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      style={{
        background: 'linear-gradient(145deg, rgba(25,25,25,0.9), rgba(15,15,15,0.95))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,0,0,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <div 
            className="rounded-circle me-3" 
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #ff0000, #ff4444)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}
          >
            U
          </div>
          <div>
            <h6 className="mb-0 text-danger">{username}</h6>
            <small className="text-muted">{time}</small>
          </div>
        </div>

        {/* Content */}
        <h4 className="text-white mb-3">{title}</h4>
        <p className="text-light opacity-75 mb-4">
          {description}
        </p>

        {/* Actions */}
        <div className="d-flex gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm px-3"
            style={{
              background: 'linear-gradient(45deg, #ff0000, #ff4444)',
              border: 'none',
              color: 'white'
            }}
          >
            Add
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline-danger btn-sm px-3"
            onClick={toggleList}
          >
            {showList ? 'Hide' : 'Show'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline-danger btn-sm px-3"
          >
            Delete
          </motion.button>
        </div>

        {/* Expandable List */}
        <motion.div
          initial={false}
          animate={{ height: showList ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="mt-4">
            {['Aliens', 'Terminator', 'Blade Runner', 'Lord of the Rings', 'Star Wars'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="py-2 px-3 mb-2 rounded text-white"
                style={{
                  background: index === 0 ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.05)',
                  borderLeft: index === 0 ? '3px solid #ff0000' : '3px solid transparent'
                }}
              >
                <Comment username="John" content={item}/>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}