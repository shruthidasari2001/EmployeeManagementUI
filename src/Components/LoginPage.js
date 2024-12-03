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

    // Create a URLSearchParams object to encode form data
    const formData = new URLSearchParams();
    formData.append('email', email);  // Send 'email' as the key
    formData.append('password', password);  // Send 'password' as the key

    try {
      // Send POST request with form data (application/x-www-form-urlencoded)
      const response = await axios.post('http://localhost:5001/api/Employee/Login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct content type
        },
      });
console.log('Raw response data:', response.data);

    // Now destructure and log each property
    const { message, userID, firstName, roleID } = response.data;

    // Log each value
    console.log('Message:', message);  // Login successful
    console.log('UserID:', userID);    // 5
    console.log('FirstName:', firstName); // caroline
    console.log('RoleID:', roleID);  // 1

    // Store user info in localStorage (or Context API / Redux for state management)
    localStorage.setItem('UserID', userID);
    localStorage.setItem('FirstName', firstName);
    localStorage.setItem('RoleID', roleID);

    // Redirect user to respective dashboard based on their role
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
