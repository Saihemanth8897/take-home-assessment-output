import React, { useState, useEffect } from "react";
import "./PatientList.css";
import { apiService } from "../services/apiService";

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // TODO: Implement the fetchPatients function
  // This function should:
  // 1. Call apiService.getPatients with appropriate parameters (page, limit, search)
  // 2. Update the patients state with the response data
  // 3. Update the pagination state
  // 4. Handle loading and error states
  const fetchPatients = async () => {
    // Your implementation here
    setLoading(true);
    try {
      // TODO: Call API and update state
      apiService.getPatients(currentPage, 10, searchTerm).then((data) => {
        setPatients(data.patients);
        setPagination(data.pagination);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm]);

  // TODO: Implement search functionality
  // Add a debounce or handle search input changes
  const handleSearch = (e) => {
    // Your implementation here
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
   };

  if (loading) {
    return (
      <div className="patient-list-container">
        <div className="loading">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-list-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        {/* TODO: Add search input field */}
        <input
          type="text"
          placeholder="Search patients..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* TODO: Implement patient list display */}
      {/* Map through patients and display them */}
      {/* Each patient should be clickable and call onSelectPatient with patient.id */}
      <div className="patient-list">
        {/* Your implementation here */}
        {/* <div className="placeholder"></div> */}
        {patients.map((patient) => {
          return (
          <div
            key={patient.id}
            className="patient-card"
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="patient-card-header">
              <div>
                <div className="patient-name">{patient.name}</div>
                <div className="patient-id">{patient.patientId}</div>
              </div>
              <div className="patient-id">{patient.id}</div>
            </div>
            <div className="patient-info">
              <div className="patient-info-item">
                <strong>Date of Birth:</strong> {patient.dob}
              </div>
              <div className="patient-info-item">
                <strong>Gender:</strong> {patient.gender}
              </div>
              <div className="patient-info-item">
                <strong>Email:</strong> {patient.email}
              </div>
              <div className="patient-info-item">
                <strong>Phone:</strong> {patient.phone}
              </div>
              <div className="patient-info-item">
                <strong>Address:</strong> {patient.address}
              </div>
            </div>
            <div className="patient-wallet">
              <strong>Wallet Address:</strong>{" "}
              {patient.walletAddress}
            </div>
            <div
              className="patient-info-item"
              style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                color: "#999",
              }}
            >
              <strong>Created At:</strong> {patient.createdAt}
            </div>
          </div>
          );
        }) }
        
      </div>

      {/* TODO: Implement pagination controls */}
      {/* Show pagination buttons if pagination data is available */}
      {pagination && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, pagination.totalPages)
              )
            }
            disabled={currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientList;
