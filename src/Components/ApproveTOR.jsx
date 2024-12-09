import React, { useState, useEffect } from "react";
import axios from "axios";

const ApproveTOR = () => {
  const [torRequests, setTorRequests] = useState([]);

  useEffect(() => {
    const fetchTORRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/Admin/TORRequests"
        );
        setTorRequests(response.data);
      } catch (error) {
        console.error("Error fetching TOR requests:", error);
      }
    };

    fetchTORRequests();
  }, []);

  const handleAction = async (requestID, action) => {
    try {
      await axios.post(
        `http://localhost:5001/api/Admin/TORRequests/${requestID}/${action}`
      );
      setTorRequests(torRequests.filter((tor) => tor.id !== requestID));
    } catch (error) {
      console.error("Error updating TOR request:", error);
    }
  };

  return (
    <div>
      <h3>Approve TORs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Request Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {torRequests.map((tor) => (
            <tr key={tor.id}>
              <td>{tor.employeeName}</td>
              <td>{tor.requestType}</td>
              <td>{new Date(tor.startDate).toLocaleDateString()}</td>
              <td>{new Date(tor.endDate).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleAction(tor.id, "approve")}
                  className="btn btn-success btn-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(tor.id, "reject")}
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

export default ApproveTOR;
