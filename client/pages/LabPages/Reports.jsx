import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reports({ nic }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/getReports/${nic}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setReports(response.data);
        } else {
          console.error('Invalid data format received from server:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, [nic]);

  return (
    <div>
      <h2>Reports for NIC: {nic}</h2>
      <div>
        {/* Render reports if it's an array */}
        {Array.isArray(reports) && reports.map(report => (
          <div key={report._id}>
            <div>Report Type: {report.type}</div>
            <div>Upload Date: {new Date(report.uploadDate).toLocaleDateString()}</div>
            {/* Render PDF report as an icon or link */}
            {/* Assuming the report file is stored on the server and accessible via URL */}
            <a href={`http://localhost:3001/reports/${report.patientReport}`} target="_blank" rel="noopener noreferrer">
              PDF Report
            </a>
          </div>
        ))}
        {/* Show a message if there are no reports */}
        {reports.length === 0 && <div>No reports found</div>}
      </div>
    </div>
  );
}

export default Reports;
