import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/Admin/Employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const fetchEmployeeDetails = async (employeeID) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/Admin/Employees/${employeeID}`
      );
      setSelectedEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <div>
      <h3>Employee Details</h3>
      <div className="row">
        {/* Employee List */}
        <div className="col-md-4">
          <ul className="list-group">
            {employees.map((employee) => (
              <li
                key={employee.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => fetchEmployeeDetails(employee.id)}
                style={{ cursor: "pointer" }}
              >
                {employee.firstName} {employee.lastName}
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Employee Details */}
        <div className="col-md-8">
          {selectedEmployee ? (
            <div>
              <h4>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h4>
              <p>
                <strong>Email:</strong> {selectedEmployee.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedEmployee.phone}
              </p>
              <p>
                <strong>Department:</strong> {selectedEmployee.department}
              </p>
              <p>
                <strong>Role:</strong> {selectedEmployee.role}
              </p>
              <h5>Recent Requests</h5>
              <ul>
                {selectedEmployee.requests.map((req, index) => (
                  <li key={index}>
                    {req.type}: {new Date(req.date).toLocaleDateString()} (
                    {req.status})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Select an employee to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
