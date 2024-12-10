import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(register(formData)).unwrap();
      if (result) {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-black min-vh-100 d-flex align-items-center justify-content-center" 
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.5)'
      }}
    >
      <div
        className={`container p-4 p-sm-5 rounded-4 bg-white shadow-lg`}
        style={{
          maxWidth: '450px',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          filter: 'brightness(1.0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#FF0000'
            }}
          >
            <i className="bi bi-person-fill text-white fs-4"></i>
          </div>
          <h2 className="text-black mb-2">Become a Movie Critic</h2>
          <p className="text-muted">Create your account</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-person text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-lg border-start-0 ps-0"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control form-control-lg border-start-0 ps-0"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-3 mb-3 rounded-3"
            style={{
              backgroundColor: '#FF0000',
              border: 'none',
              transition: 'all 0.3s ease'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign up'}
          </button>

          <div className="text-center">
            <p className="text-muted">
              Already have an account?{' '}
              <a href="/login" className="text-decoration-none" style={{ color: '#FF0000' }}>
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}