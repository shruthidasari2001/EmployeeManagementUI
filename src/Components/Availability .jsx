import React, { useState, useEffect } from "react";
import axios from "axios";

const Availability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const employeeID = localStorage.getItem("UserID"); // Assume employeeID is stored in localStorage

  // Fetch availability on component mount
  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/Availability/employee/${employeeID}`
        );
        setAvailabilities(response.data);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailabilities();
  }, [employeeID]);

  // Add availability
  const handleAddAvailability = async () => {
    if (!startDate || !endDate || !availabilityStatus) {
      alert("Start date, End date, and Status are required!");
      return;
    }

    const newAvailability = {
      employeeID: employeeID,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      availabilityStatus,
    };

    console.log("Payload:", newAvailability);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/Availability",
        newAvailability
      );
      const addedAvailability = {
        availabilityID: response.data.availabilityID,
        startDate: newAvailability.startDate,
        endDate: newAvailability.endDate,
        availabilityStatus: newAvailability.availabilityStatus,
      };
      alert("Availability added successfully!");
      setAvailabilities([...availabilities, addedAvailability]);
      console.log("Added Availability is ", addedAvailability);

      setStartDate(""); // Reset after adding
      setEndDate(""); // Reset after adding
      setAvailabilityStatus(""); // Reset after adding
    } catch (error) {
      console.error("Error adding availability:", error);
      alert(
        `Failed to add availability: ${
          error.response?.data?.Error || error.message
        }`
      );
    }
  };

  // Delete availability
  const handleDeleteAvailability = async (availabilityID) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/Availability/${availabilityID}`
      );
      setAvailabilities(
        availabilities.filter((a) => a.availabilityID !== availabilityID)
      );
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Availability</h2>

      {/* Add Availability Form */}
      <div className="card p-4 mb-4">
        <h5>Add Availability</h5>
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <label className="form-label">Start Time</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">End Time</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="availabilityStatus" className="form-label">
              Availability Status
            </label>
            <select
              id="availabilityStatus"
              className="form-select"
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="col-md-auto d-flex align-items-end mt-5">
            <button className="btn btn-primary" onClick={handleAddAvailability}>
              Add Availability
            </button>
          </div>
        </div>
      </div>

      {/* Availability List */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h5>Your Availability</h5>
        </div>
        <div className="card-body">
          {availabilities.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {availabilities.map((availability) => (
                  <tr key={availability.availabilityID}>
                    {/* Format the date to show only date */}
                    <td>
                      {new Date(availability.startDate).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(availability.endDate).toLocaleDateString()}
                    </td>
                    <td>{availability.availabilityStatus}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-md"
                        onClick={() =>
                          handleDeleteAvailability(availability.availabilityID)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No availability records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Availability;
