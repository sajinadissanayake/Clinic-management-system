import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/getStaff')
      .then(response => {
        console.log('Data received from backend:', response.data);
        setStaffList(response.data);
      })
      .catch(error => {
        console.error('Error fetching staff:', error);
        setError(error.message || 'An error occurred');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Staff List</h1>
      <table>
        <thead>
          <tr>
            <th>NIC</th>
            <th>User Type</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map(staff => (
            <tr key={staff._id}>
              <td>{staff.nic}</td>
              <td>{staff.utype}</td>
              <td>{staff.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;
