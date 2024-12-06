import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TimeOffRequest() {
  const [employeeID, setEmployeeID] = useState(4); // Example employee ID
  const [requestType, setRequestType] = useState("select"); // Default request type
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [torData, setTorData] = useState([]);

  // Fetch the employee's previous TORs from the correct endpoint
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/TimeOff/employee/${employeeID}`)
      .then((response) => setTorData(response.data))
      .catch((err) => alert(err));
  }, [employeeID]);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }

    // Prepare payload
    const newTOR = {
      employeeID,
      requestType,
      startDate: new Date(startDate).toISOString(), // Convert date to ISO format
      endDate: new Date(endDate).toISOString(), // Convert date to ISO format
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/TimeOff",
        newTOR
      );
      const addedTOR = {
        requestID: response.data.requestID,
        startDate: newTOR.startDate,
        endDate: newTOR.endDate,
        requestType: newTOR.requestType,
      };
      alert("TOR added successfully!");
      setTorData([...torData, addedTOR]);
      console.log("Added TOR is ", addedTOR);

      setStartDate(""); // Reset after adding
      setEndDate(""); // Reset after adding
      setRequestType(""); // Reset after adding
    } catch (error) {
      console.error("Error adding TOR:", error);
      alert(
        `Failed to add TOR: ${error.response?.data?.Error || error.message}`
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
      }}
    >
      {/* Left Section - Form to Submit Request */}
      <div
        style={{
          width: "48%",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>Time Off Request</h2>

        {/* Form to submit new TOR */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="startDate"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="endDate"
              style={{ display: "block", marginBottom: "5px" }}
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="requestType"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Request Type
            </label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="select" disabled>
                --Select--
              </option>
              <option value="Vacation">Vacation</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
            </select>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginTop: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Employee's TOR Data */}
      <div
        style={{
          width: "48%",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Previous Time Off Requests</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Request Type
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Start Date
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            {torData.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "8px" }}>
                  No previous requests found
                </td>
              </tr>
            ) : (
              torData.map((tor, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {tor.requestType}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {new Date(tor.startDate).toLocaleDateString()}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {new Date(tor.endDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
