import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../components/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ClinicDates() {
  const localizer = momentLocalizer(moment);
  const [appointments, setAppointments] = useState([]);

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

  // Transform appointments data into events format required by React Big Calendar
  const events = appointments.map(appointment => ({
    title: appointment.nic, // Display NIC as event title
    start: new Date(appointment.date),
    end: new Date(appointment.date), // Assuming the appointment duration is just one point in time
  }));

  return (

    <div>
   <Link to="/nursedash" style={{ textDecoration: 'none' }}>
      <IconButton aria-label="dashboard" color="primary">
        <ArrowBackIcon fontSize="large" />
      </IconButton></Link>
     
     
       <div style={{ height: 600 }}>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
      />
    </div>

    </div>
   
  );
}

export default ClinicDates;
