import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Stack, TextField, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Rightbar from '../components/Rightbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



function AppointmentAdd() {
  const [nic, setNic] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/Addappo", {nic, title, date, time})
    .then(result => {
        console.log(result)
        navigate('/')
    })
    .catch (err => console.log(err))
   }

 

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <PageBody>
        <h3>Add Appointment</h3>
          <form onSubmit={Submit}>
            <Stack direction="column" spacing={2}>
            <TextField
                label="nic"
                name="nic"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
             
              <TextField
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Date"
                type="date" 
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Time"
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 minutes
                }}
              />
              <Button variant="contained" color="primary" type="submit">
                Add Appointment
              </Button>
            </Stack>
          </form>
        </PageBody>
        <Rightbar />
      </Stack>
    </div>
  );
}

export default AppointmentAdd;
