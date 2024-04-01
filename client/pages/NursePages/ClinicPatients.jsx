import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Stack, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import NurseLeftbar from './NurseLeftbar';
import Announcements from '../../components/Announcements';
import PageBody from '../../components/PageBody';

function ClinicPatients() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Filter appointments based on selected date
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === selectedDate.toDateString();
  });

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div>
        <Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <NurseLeftbar />
            <PageBody>
                <div>
                  <Typography variant="h6">Clinic Patients</Typography>
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
                  <div style={{ width: '100%', overflowX: 'auto' }}> {/* Added wrapping div with width and overflow styling */}
                    <Table style={{ minWidth: 650 }}> {/* Applied style to the Table component */}
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
            <Announcements/>
        </Stack>
    </div>
  );
}

export default ClinicPatients;
