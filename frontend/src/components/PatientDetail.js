import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PatientDetail.css';
import { apiService } from '../services/apiService';

const RecordCard = ({ record }) => (
  <div className="record-card">
    <div className="record-header">
      <span className={`record-type ${record.type ? record.type.toLowerCase() : ''}`}>{record.type || 'Unknown'}</span>
      <span className={`record-status ${record.status ? record.status.toLowerCase() : ''}`}>{record.status || 'Unknown'}</span>
    </div>
    <div className="record-title">{record.title || 'Untitled'}</div>
    {record.description && (
      <div className="record-description">{record.description}</div>
    )}
    <div className="record-meta">
      <div className="record-meta-item"><strong>Date:</strong> {record.date ? new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</div>
      <div className="record-meta-item"><strong>Doctor:</strong> {record.doctor || 'N/A'}</div>
      <div className="record-meta-item"><strong>Hospital:</strong> {record.hospital || 'N/A'}</div>
    </div>
    {record.blockchainHash && (
      <div className="record-meta-item" style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#667eea', wordBreak: 'break-all' }}>
        <strong>Blockchain Hash:</strong> {record.blockchainHash}
      </div>
    )}
  </div>
);

RecordCard.propTypes = {
  record: PropTypes.shape({
    type: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    doctor: PropTypes.string,
    hospital: PropTypes.string,
    blockchainHash: PropTypes.string,
  }).isRequired,
};

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchPatientData function
  // This should fetch both patient details and their records
  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const patientData = await apiService.getPatient(patientId);
        let patientRecords = await apiService.getPatientRecords(patientId);
        setPatient(patientData || {});
        setRecords(Array.isArray(patientRecords?.records) ? patientRecords.records : []);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (patientId) fetchPatientData();
  }, [patientId]);

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient details...</div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="patient-detail-container">
        <div className="error">Error loading patient: {error || 'Patient not found'}</div>
        <button onClick={onBack} className="back-btn">Back to List</button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <button onClick={onBack} className="back-btn">← Back to List</button>
      </div>
      <div className="patient-detail-content">
        <div className="patient-info-section">
          <h2>Patient Information</h2>
          <div className="patient-info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{patient.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{patient.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{patient.gender || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{patient.phone || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address</span>
              <span className="info-value">{patient.address || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Wallet Address</span>
              <span className="info-value wallet">{patient.walletAddress || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="patient-records-section">
          <h2>Medical Records ({records.length})</h2>
          {records.length === 0 ? (
            <div className="placeholder">
              <p>No medical records found.</p>
            </div>
          ) : (
            <div className="records-list">
              {records.map((record, idx) => (
                <RecordCard record={record} key={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PatientDetail.propTypes = {
  patientId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PatientDetail;


