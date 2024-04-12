import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Stack, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import NurseLeftbar from './NurseLeftbar';
import Announcements from '../../components/Announcements';
import PageBody from '../../components/PageBody';
import Layout from '../../components/Layout';

function ClinicUpdate() {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState(0);

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

  useEffect(() => {
    // Calculate appointment count for the selected date
    const countAppointments = appointments.filter(appointment => {
      // Parse the appointment.date into a Date object
      const appointmentDate = new Date(appointment.date);
      // Check if the appointment date matches the selected date
      return appointmentDate.toDateString() === new Date(selectedDate).toDateString();
    }).length;
    setAppointmentCount(countAppointments);
  }, [selectedDate, appointments]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <Navbar pageTitle="Clinic update" />
      <Layout>
        <Stack direction="row" spacing={2} justifyContent="space-between" >
          <NurseLeftbar />
          <PageBody>
           
            <Stack direction="column" spacing={2} alignItems={'center'}>
             <Typography variant='h5'>Select the date you want to change</Typography><br />
              <TextField
                id="date"
                label="Select Date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{minWidth: '40%'}}
              />
              <Typography>{` ${appointmentCount} Patients Selected`}</Typography>
              <Typography variant='h5'>Select the new date</Typography><br />
              <TextField
                id="newdate"
                label="new Date"
                type="date"
              
               
                InputLabelProps={{
                  shrink: true,
                }}
                style={{minWidth: '40%'}}
              />
            </Stack>
           
          </PageBody>
          <Announcements />
        </Stack>
      </Layout>
    </div>
  )
}

export default ClinicUpdate;
