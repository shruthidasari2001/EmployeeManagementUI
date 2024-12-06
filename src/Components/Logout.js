import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();


  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.clear();

    // Redirect to the login page
     navigate('/login');
  };

  return (
    <button className = "btn btn-light" onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
