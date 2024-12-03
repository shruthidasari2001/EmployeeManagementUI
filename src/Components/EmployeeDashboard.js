import React from 'react';
import Logout from '../Components/Logout.js'; // Import the Logout component

const EmployeeDashboard = () => {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>Welcome, {localStorage.getItem('FirstName')}!</p>

      {/* Logout button */}
      <Logout />
    </div>
  );
};

export default EmployeeDashboard;
