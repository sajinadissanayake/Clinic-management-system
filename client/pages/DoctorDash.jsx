import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Box, Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import rep from './images/report.jpg';
import annoucement from './images/annoucement.jpg';
import cinic from './images/cinic.jpg';
import blood from './images/sugar.jpg';
import { Link } from 'react-router-dom';
import hospital from './images/hospital.jpg';
import DoctorSidebar from '../components/DoctorSidebar';
import Layout from '../components/Layout';
import Calendar from 'react-calendar'; // Importing the calendar component

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

function DoctorDash() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = currentDateTime.getHours();
    let greetingMessage = '';

    if (hour >= 5 && hour < 12) {
      greetingMessage = 'Good Morning Doctor...!';
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = 'Good Afternoon Doctor...!';
    } else if (hour >= 18 && hour < 22) {
      greetingMessage = 'Good Evening Doctor...!';
    } else {
      greetingMessage = 'Good Night Doctor ....!';
    }

    setGreeting(greetingMessage);
  }, [currentDateTime]);

  return (
    <div>
      <Navbar pageTitle="Doctor Dashboard" />
      <Layout>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <DoctorSidebar />
          <Grid container spacing={2} justifyContent="left">
            {/* New Card */}
            <Grid item xs={12} md={8}>
              <Card sx={{ margin: 'auto', marginBottom: 2, borderRadius: 8, marginTop:3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                    <Typography variant="body2" component="span" style={{ float: 'right' }}>
                      {currentDateTime.toLocaleTimeString()}
                    </Typography>
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={6} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Welcome
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {greeting}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={hospital}
                        alt="Welcome Image"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Calendar Card */}
            <Grid item xs={12} md={4}>
              <Card sx={{ margin: 'auto', marginBottom: 2, borderRadius: 8, marginTop:3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                    <Typography variant="body2" component="span" style={{ float: 'right' }}>
                      Calendar
                    </Typography>
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      <Calendar />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Stack>
      </Layout>
    </div>
  );
}

export default DoctorDash;
