import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AppointmentAdd() {
  const [nic, setNic] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the date in YYYY-MM-DD format
    const formattedDate = new Date(date).toISOString().split('T')[0];

    axios.post("http://localhost:3001/Addappo", { nic, title, date: formattedDate })
      .then(result => {
        console.log(result);
        navigate('/clinicdates');
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h3>Add Appointment</h3>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Appointment
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default AppointmentAdd;
