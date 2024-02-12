import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReportsView() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports data from the server
    axios.get('http://localhost:3001/getReports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteReport/'+id)
    .then(res => {console.log(res)
   window.location.reload()})
    .catch(err => console.log(err))
}

  return (
    <div>
      <h2>Reports View</h2>
      <Link to="/addreports">Add Reports </Link><br></br>
      <table>
        <thead>
          <tr>
            <th>NIC</th>
            <th>Patient Report</th>
            <th>Date</th>
            
            <th>update</th>
            
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report._id}>
              <td>{report.nic}</td>
              

              <td>
                <a href={`http://localhost:3001/reports/${report.patientReport}`} target="_blank" rel="noopener noreferrer">
                  View Report
                  
                </a>
                
              </td>
              <td>{report.uploadDate}</td>
              <td><Link to={`/updateReport/${report._id}`} >Update</Link></td>
              <td> <button onClick={(e) => handleDelete(report._id)}>Delete</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsView;
