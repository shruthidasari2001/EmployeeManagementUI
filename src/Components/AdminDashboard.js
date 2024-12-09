import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logout from '../Components/Logout.js';
import ApproveTOR from './ApproveTOR.jsx'; // Admin feature for TOR approvals
import ApproveAvailability from './ApproveAvailability.jsx'; // Admin feature for Availability approvals
import EmployeeDetails from './EmployeeDetails.jsx'; // Admin feature for employee details

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState('tor'); // Default feature
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const userID = localStorage.getItem('UserID');
      if (!userID) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5001/api/Admin/${userID}`);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const renderFeature = () => {
    switch (selectedFeature) {
      case 'tor':
        return <ApproveTOR />;
      case 'availability':
        return <ApproveAvailability />;
      case 'employees':
        return <EmployeeDetails />;
      default:
        return <p>Please select an option from the menu.</p>;
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-dark border-end vh-100 ${isSidebarOpen ? 'd-block' : 'd-none'}`}
        style={{ width: '250px' }}
      >
        <div className="p-3 bg-dark">
          <h4>Admin Menu</h4>
          <ul className="list-group">
            <li
              className={`list-group-item ${
                selectedFeature === 'tor' ? 'white text-black' : 'bg-dark text-white'
              }`}
              onClick={() => setSelectedFeature('tor')}
            >
              Approve TORs
            </li>
            <li
              className={`list-group-item ${
                selectedFeature === 'availability' ? 'white text-black' : 'bg-dark text-white'
              }`}
              onClick={() => setSelectedFeature('availability')}
            >
              Approve Availability
            </li>
            <li
              className={`list-group-item ${
                selectedFeature === 'employees' ? 'white text-black' : 'bg-dark text-white'
              }`}
              onClick={() => setSelectedFeature('employees')}
            >
              View Employees
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
          <button
            className="btn btn-light btn-sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h2 className="m-0">Admin Dashboard</h2>
          {adminData && <h4>Welcome, {adminData.firstName}!!</h4>}
          <Logout />
        </header>

        {/* Main Content */}
        <main className="p-4">
          {adminData ? <>{renderFeature()}</> : <p>Loading...</p>}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
