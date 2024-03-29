import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClinicDates() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getAppointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>All Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>NIC</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{new Date(appointment.date).toLocaleTimeString()}</td>
              <td>{appointment.nic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClinicDates;
