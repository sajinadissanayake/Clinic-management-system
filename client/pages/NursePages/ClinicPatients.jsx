import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Stack, TextField, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import NurseLeftbar from './NurseLeftbar';
import Announcements from '../../components/Announcements';
import PageBody from '../../components/PageBody';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';

function ClinicPatients() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchNIC, setSearchNIC] = useState('');

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

  // Filter appointments based on selected date and NIC
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.toDateString() === selectedDate.toDateString() &&
      appointment.nic.toLowerCase().includes(searchNIC.toLowerCase())
    );
  });

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleNICChange = (event) => {
    setSearchNIC(event.target.value);
  };

  return (
    <div>
      <Navbar pageTitle="Clinic Patients " />
      <Layout>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <NurseLeftbar />
          <PageBody>
            <div>
              <TextField
                id="date"
                label="Select Date"
                type="date"
                defaultValue={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="nic"
                label="Search by NIC"
                value={searchNIC}
                onChange={handleNICChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginLeft: '20px' }} 
              />

              <Button component={Link} to="/cliniccancel"variant='outlined' sx={{ marginLeft: '20px',marginTop : '10px'}}> Cancel Clinic</Button>


              <div style={{ width: '100%', overflowX: 'auto' }}>
                <Table style={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>NIC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map(appointment => (
                      <TableRow key={appointment._id}>
                        <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(appointment.date).toLocaleTimeString()}</TableCell>
                        <TableCell>{appointment.nic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </PageBody>
          <Announcements />
        </Stack></Layout>
    </div>
  );
}

export default ClinicPatients;
