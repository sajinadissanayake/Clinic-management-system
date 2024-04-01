import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Lottie from 'react-lottie'; 
import Swal from 'sweetalert2';
import PageBody from '../components/PageBody';
import calender from './images/calender.json';

function AppointmentAdd() {
  const [nic, setNic] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState(''); // State to store email
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromQuery = searchParams.get('email'); 
    const nicFromQuery = searchParams.get('nic'); // Retrieve email from query parameter
    setEmail(emailFromQuery); // Set email state
    setNic(nicFromQuery); // Set NIC state
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      Swal.fire({
        icon: 'error',
        title: 'Please select a date',
        text: 'You must select a date before adding the appointment.',
      });
      return;
    }
    const formattedDate = new Date(date).toISOString().split('T')[0];
    let title = "Diabetic";

    axios.post("http://localhost:3001/Addappo", { nic, title, date: formattedDate, email })
      .then(result => {
        console.log(result);
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
    animationData: calender, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleContinueWithoutAdding = () => {
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
