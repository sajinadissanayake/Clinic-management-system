import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Lottie from 'react-lottie'; // Import Lottie
import Swal from 'sweetalert2';

import calender from './images/calender.json';
import PageBody from '../components/PageBody';

function AppointmentAdd() {
  const [nic, setNic] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the nic from the URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const nicFromQuery = searchParams.get('nic');

  // Use the nicFromQuery if it exists, otherwise use the state
  const nicValue = nicFromQuery ? nicFromQuery : nic;

  useEffect(() => {
    // componentDidMount logic here
    // You can fetch data or perform side effects here
  }, []); // Empty dependency array to mimic componentDidMount behavior

  useEffect(() => {
    // componentDidUpdate logic here
    // You can update data or perform side effects based on state changes here
  });
// Inside the handleSubmit function
const handleSubmit = (e) => {
  e.preventDefault();

  // Check if date is empty
  if (!date) {
    // Show error alert using SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Please select a date',
      text: 'You must select a date before adding the appointment.',
    });
    return; // Exit the function early
  }

  // Format the date in YYYY-MM-DD format
  const formattedDate = new Date(date).toISOString().split('T')[0];
  let title = "Diabetic";

  axios.post("http://localhost:3001/Addappo", { nic: nicValue, title, date: formattedDate })
    .then(result => {
      console.log(result);
      // Show SweetAlert notification
      Swal.fire({
        icon: 'success',
        title: 'Clinic Date Added Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/clinicdates');
    })
    .catch(err => console.log(err));
}


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: calender, // Corrected the variable name to calender
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleContinueWithoutAdding = () => {
    // Navigate to the desired page when continuing without adding clinic date
    navigate('/desiredPage');
  }

  return (
    <div>
      <Navbar />
      <PageBody>
        <Typography variant='h4' align='center'>Next Clinic Date</Typography>

        <Card variant="outlined" style={{ width: '80%', margin: '0 auto', height: '600px', display: 'flex', alignItems: 'center', borderRadius: '8px' }}>
          <Grid container>
            <Grid item xs={6}>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="Date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: '100%', marginTop: '100px' }}
                    />
                  </Stack>
                </form>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <Lottie
                options={defaultOptions}
                height={480}
                width={480}
              />
              <Stack direction="row" justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>
                <Button variant="outlined" color="primary" onClick={handleContinueWithoutAdding}>
                  Continue Without Adding
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Add Appointment
                </Button>
              </Stack>
            </Grid>

          </Grid>
        </Card>
      </PageBody>
    </div>
  );
}

export default AppointmentAdd;
