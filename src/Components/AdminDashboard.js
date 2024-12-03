import React from 'react';
import Logout from '../Components/Logout.js'; // Import the Logout component

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {localStorage.getItem('FirstName')}!</p>

      {/* Logout button */}
      <Logout />
    </div>
  );
};

export default AdminDashboard;
