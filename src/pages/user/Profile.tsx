import React from 'react';
import { motion } from 'framer-motion';
import { BsPencilSquare, BsShare, BsStarFill, BsPeopleFill, BsPersonCheckFill } from 'react-icons/bs';

const styles = `
.bg-gradient-dark {
  background: linear-gradient(180deg, #000000 0%, #1a0000 100%);
}

.movie-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 100%);
}

.custom-shadow {
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.15);
}

.red-glow {
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
}

.profile-card {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.custom-btn {
  background: #E31837;
  border: none;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background: #CC0000;
  transform: translateY(-2px);
}

.custom-outline-btn {
  border: 2px solid #E31837;
  color: #E31837;
  transition: all 0.3s ease;
}

.custom-outline-btn:hover {
  background: rgba(227, 24, 55, 0.1);
  transform: translateY(-2px);
}

.activity-card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.activity-item {
  background: transparent;
  border-bottom: 1px solid rgba(255, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(255, 0, 0, 0.1);
}
`;

export default function Profile() {
  return (
    <div 
      className="min-vh-100 bg-black"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'brightness(0.7)'
      }}
    >
      <style>{styles}</style>
      <div className="movie-overlay position-fixed w-100 h-100" />
      
      <div className="container py-5 position-relative">
        <motion.div 
          className="row mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="col-md-3 text-center">
            <motion.img
              src="/profile-placeholder.jpg"
              className="rounded-circle mb-3 custom-shadow"
              alt="Profile"
              style={{
                width: "180px", 
                height: "180px", 
                objectFit: "cover",
                border: "3px solid #E31837"
              }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div className="col-md-9 text-white">
            <h2 className="display-4 fw-bold mb-2 "style={{ paddingTop: "120px" }}>John Doe</h2>
            <p className="text-white mb-3">@johndoe</p>
            <p className="text-white mb-4">Film enthusiast & reviewer</p>
            <motion.button 
              className="btn custom-btn me-3 px-4"
              whileHover={{ scale: 1.05 }}
            >
              <BsPencilSquare className="me-2" />
              Edit Profile
            </motion.button>
            <motion.button 
              className="btn custom-outline-btn px-4"
              whileHover={{ scale: 1.05 }}
            >
              <BsShare className="me-2" />
              Share Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="row mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { icon: BsStarFill, count: "150", label: "Reviews" },
            { icon: BsPeopleFill, count: "2.1k", label: "Followers" },
            { icon: BsPersonCheckFill, count: "450", label: "Following" }
          ].map((stat, index) => (
            <div key={index} className="col-md-4">
              <motion.div 
                className="profile-card rounded-3 p-4 text-center custom-shadow"
                whileHover={{ scale: 1.03 }}
              >
                <stat.icon className="text-danger mb-3 fs-3" />
                <h3 className="text-white mb-2">{stat.count}</h3>
                <p className="text-white-50 mb-0">{stat.label}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="activity-card rounded-3 custom-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-4 border-bottom border-danger">
            <h4 className="text-white mb-0">Recent Posts</h4>
          </div>
          <div className="p-0">
            <div className="list-group list-group-flush">
              {[
                {
                  title: "Reviewed Inception",
                  time: "2 days ago",
                  description: "A mind-bending masterpiece..."
                },
              ].map((activity, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="activity-item list-group-item list-group-item-action p-4 text-white"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-1">{activity.title}</h6>
                    <small className="text-danger">{activity.time}</small>
                  </div>
                  {activity.description && (
                    <p className="text-white-50 mb-0">{activity.description}</p>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}