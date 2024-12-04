import Logout from '../Components/Logout.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Availability from './Availability .jsx';
import TimeOffRequest from './TimeOffRequest.jsx';
const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState('tasks'); // Default feature
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const userID = localStorage.getItem('UserID');
      if (!userID) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5001/api/Employee/${userID}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const renderFeature = () => {
    switch (selectedFeature) {
      case 'tasks':
        return (
          <div>
            <h2>Your Tasks</h2>
            <ul>
              {employeeData?.tasks?.length > 0 ? (
                employeeData.tasks.map((task) => <li key={task.id}>{task.name}</li>)
              ) : (
                <p>No tasks assigned.</p>
              )}
            </ul>
          </div>
        );
      case 'availability':
        return (
         <Availability/>
        );
      case 'tor':
        return (
<TimeOffRequest/>
          
        );
      default:
        return <p>Please select an option from the menu.</p>;
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-light border-end vh-100 ${isSidebarOpen ? 'd-block' : 'd-none'}`}
        style={{ width: '250px' }}
      >
        <div className="p-3">
          <h4>Menu</h4>
          <ul className="list-group">
            <li
              className={`list-group-item ${selectedFeature === 'tasks' ? 'active' : ''}`}
              onClick={() => setSelectedFeature('tasks')}
            >
              Tasks
            </li>
            <li
              className={`list-group-item ${selectedFeature === 'availability' ? 'active' : ''}`}
              onClick={() => setSelectedFeature('availability')}
            >
              Availability
            </li>
            <li
              className={`list-group-item ${selectedFeature === 'tor' ? 'active' : ''}`}
              onClick={() => setSelectedFeature('tor')}
            >
              Time Off Requests
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
          <button
            className="btn btn-light btn-sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h1 className="m-0">Employee Dashboard</h1>
          <Logout />
        </header>

        {/* Main Content */}
        <main className="p-4">
          {employeeData ? (
            <>
              <p>Welcome, {employeeData.firstName}!</p>
              {renderFeature()}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
