import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:5001/api/Employee/Login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { message, userID, firstName, roleID } = response.data;

      console.log('Message:', message);
      console.log('UserID:', userID);
      console.log('FirstName:', firstName);
      console.log('RoleID:', roleID);

      localStorage.setItem('UserID', userID);
      localStorage.setItem('FirstName', firstName);
      localStorage.setItem('RoleID', roleID);

      if (roleID === 1) {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url('https://d6xcmfyh68wv8.cloudfront.net/learn-content/uploads/2023/11/Employee-Management-System-770x515.png')`,
        backgroundSize:  '1600px 950px', // Make the image cover the full screen
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent repetition of the image
        height: '50vh', // Ensure the image fills the viewport height
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: '400px',
          background: 'rgba(255, 255, 255, 0.85)', // Semi-transparent background for card
          borderRadius: '10px',
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
