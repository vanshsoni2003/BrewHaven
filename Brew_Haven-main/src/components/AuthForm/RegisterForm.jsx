import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link
import Alert from '../Alert/Alert';
import './AuthForm.css';
import { register } from '../../api';


function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 4) {
      setAlert({ message: 'Password must be at least 4 characters long.', type: 'error' });
      return;
    }

    if (formData.password !== formData.cpassword) {
      setAlert({ message: "Passwords don't match!", type: 'error' });
      return;
    }

    register('reg', {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      cpassword: formData.cpassword
    })
      .then((response) => {
        // @ts-ignore
        if (response.status === 201) {
          setFormData({
            username: '',
            email: '',
            password: '',
            cpassword: ''
          });
          setAlert({ message: 'Registration successful!', type: 'success' });
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          setAlert({ message: 'Registration failed. Please try again.', type: 'error' });
        }
      })
      .catch((error) => {
        setAlert({ message: error.response?.data?.message || 'An error occurred. Please try again.', type: 'error' });
      });
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Register</h2>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter Username"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter Email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter Password"
        />
        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          required
          placeholder="Enter Confirm Password"
        />
        <button type="submit" className="auth-form-button">Register</button>
      </form>
      <p className="auth-form-footer">
        Already have an account?{' '}
        <Link to="/login" className="auth-form-link">Login here</Link>  {/* Updated Link */}
      </p>
    </div>
  );
}

export default RegisterForm;
