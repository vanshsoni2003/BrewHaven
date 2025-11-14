// @ts-ignore
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link from react-router-dom
import './AuthForm.css';
import { login } from '../../api';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear any previous errors
      setError('');

      const response = await login("login", {
        email: formData.email,
        password: formData.password
      });

      // Assuming the API returns a 200 status for successful login
      // @ts-ignore
      if (response.status === 200) {
        // Save the token or any necessary data here
        // @ts-ignore
        localStorage.setItem('authToken', response.data.token);
        navigate('/');  // Redirect to home page
      } else {
        // @ts-ignore
        setError(response.data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        {error && <div className="auth-form-error">{error}</div>}
        <button type="submit" className="auth-form-button">Login</button>
      </form>
      <p className="auth-form-footer">
        Don't have an account?{' '}
        <Link to="/register" className="auth-form-link">Register here</Link>  {/* Use Link instead of <a> */}
      </p>
    </div>
  );
};

export default LoginForm;
