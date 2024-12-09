import React, { useState, useEffect } from "react";
import axios from "axios";

const ApproveAvailability = () => {
  const [availabilityRequests, setAvailabilityRequests] = useState([]);

  useEffect(() => {
    const fetchAvailabilityRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/Admin/AvailabilityRequests"
        );
        setAvailabilityRequests(response.data);
      } catch (error) {
        console.error("Error fetching availability requests:", error);
      }
    };

    fetchAvailabilityRequests();
  }, []);

  const handleAction = async (requestID, action) => {
    try {
      await axios.post(
        `http://localhost:5001/api/Admin/AvailabilityRequests/${requestID}/${action}`
      );
      setAvailabilityRequests(
        availabilityRequests.filter((req) => req.id !== requestID)
      );
    } catch (error) {
      console.error("Error updating availability request:", error);
    }
  };

  return (
    <div>
      <h3>Approve Availability Requests</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Availability Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilityRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.employeeName}</td>
              <td>{new Date(request.date).toLocaleDateString()}</td>
              <td>{request.status}</td>
              <td>
                <button
                  onClick={() => handleAction(request.id, "approve")}
                  className="btn btn-success btn-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(request.id, "reject")}
                  className="btn btn-danger btn-sm"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveAvailability;
