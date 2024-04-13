import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import hospital from '../images/hospital.jpg'; // Adjust the path for the hospital image
import { Calendar } from 'antd'; // Adjust the path for antd if necessary
import 'antd/dist/reset.css'; // Adjust the path for antd CSS if necessary
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import Dash from '../../components/Dashboard/Dash';
import AdminLeftbar from './AdminLeftbar';
import admin from '../images/admin.json';
import Lottie from 'lottie-react'; // Import Lottie
import ADash from '../../components/Dashboard/ADash';

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

function AdminDash() {
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
      greetingMessage = 'Good Morning...!';
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = 'Good Afternoon ...!';
    } else if (hour >= 18 && hour < 22) {
      greetingMessage = 'Good Evening ..!';
    } else {
      greetingMessage = 'Good Night  ....!';
    }

    setGreeting(greetingMessage);
  }, [currentDateTime]);

  return (
    <div>
      <Navbar pageTitle="Admin Dashboard" />
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={1.5}>
            <AdminLeftbar/>
          </Grid>
          <Grid item xs={7.5}>
            <Card sx={{ margin: 'auto', marginBottom: 2, borderRadius: 8, marginTop: 3 }}>
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
                    {/* Display the Lottie animation */}
                    <Lottie animationData={admin} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Dash Component */}
          <ADash/>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ margin: 'auto', marginBottom: 2, borderRadius: 8, marginTop: 3, maxHeight: '600px', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" component="div" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <Typography variant="body2" component="span" style={{ float: 'right' }}>
                    Calendar
                  </Typography>
                </Typography>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <Calendar style={{ height: '100%' }} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
}

export default AdminDash;
