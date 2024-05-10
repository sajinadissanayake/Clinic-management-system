import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Stack, TextField, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import NurseLeftbar from './NurseLeftbar';
import Announcements from '../../components/Announcements';
import PageBody from '../../components/PageBody';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2';

function ClinicCancel() {
  const [oldDate, setOldDate] = useState('');
  const [newDate, setNewDate] = useState('');
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const countAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getNumAppointments', {
          params: {
            date: oldDate
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error counting appointments:', error);
        return 0;
      }
    };

    countAppointments().then(setAppointmentCount);
  }, [oldDate]);

  const handleDateChange = async () => {
    try {
      const response = await axios.post('http://localhost:3001/updateAppointmentDates', {
        oldDate: oldDate,
        newDate: newDate
      });
      // Display SweetAlert after successful update
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Appointment dates updated successfully!',
      });
    } catch (error) {
      console.error('Error updating appointments:', error);
      // Display SweetAlert for error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update appointment dates. Please try again.',
      });
    }
  };

  console.log("oldDate:", oldDate);
  console.log("newDate:", newDate);

  return (
    <div>
      <Navbar pageTitle="Clinic Cancellation " />
      <Layout>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <NurseLeftbar />
          <PageBody>
            <Stack direction="column" spacing={2} alignItems={'center'}>
              <Typography variant='h5'>Select the date you want to change</Typography><br />
              <TextField
                id="date"
                label="Select Date"
                type="date"
                value={oldDate}
                onChange={(val) => { setOldDate(val.currentTarget.value); }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ minWidth: '40%' }}
              />
              <Typography>{` ${appointmentCount} Patients Selected`}</Typography>
              <Typography variant='h5'>Select the new date</Typography><br />
              <TextField
                id="newdate"
                label="new Date"
                type="date"
                value={newDate}
                onChange={(val) => { setNewDate(val.currentTarget.value); }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ minWidth: '40%' }}
              />

              <Button onClick={handleDateChange}>Change date</Button>
            </Stack>

          </PageBody>
          <Announcements />
        </Stack>
      </Layout>
    </div>
  )
}

export default ClinicCancel;
