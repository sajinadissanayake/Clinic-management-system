import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function Dash() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [medicalCount, setMedicalCount] = useState(0);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  useEffect(() => {
    fetchPatientsCount();
    fetchReportsCount();
    fetchMedicalCount();
    fetchPrescriptionsCount();
    fetchAppointmentsCount();
  }, []);

  const fetchPatientsCount = () => {
    // Fetch patients count from the backend
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
        setPatientsCount(data.length);
      })
      .catch(error => console.error('Error fetching patients count:', error));
  };

  const fetchReportsCount = () => {
    // Fetch reports count from the backend
    fetch('http://localhost:3001/getReports')
      .then(response => response.json())
      .then(data => {
        setReportsCount(data.length);
      })
      .catch(error => console.error('Error fetching reports count:', error));
  };

  const fetchMedicalCount = () => {
    // Fetch medical count from the backend
    fetch('http://localhost:3001/getmedicals')
      .then(response => response.json())
      .then(data => {
        setMedicalCount(data.length);
      })
      .catch(error => console.error('Error fetching medical count:', error));
  };

  const fetchPrescriptionsCount = () => {
    // Fetch prescriptions count from the backend
    fetch('http://localhost:3001/getPrescriptions')
      .then(response => response.json())
      .then(data => {
        setPrescriptionsCount(data.length);
      })
      .catch(error => console.error('Error fetching prescriptions count:', error));
  };

  const fetchAppointmentsCount = () => {
    // Fetch appointments count for today from the backend
    fetch('http://localhost:3001/getAppointments')
      .then(response => response.json())
      .then(data => {
        // Filter appointments for today
        const today = new Date().setHours(0, 0, 0, 0);
        const appointmentsToday = data.filter(appointment => new Date(appointment.date).setHours(0, 0, 0, 0) === today);
        setAppointmentsCount(appointmentsToday.length);
      })
      .catch(error => console.error('Error fetching appointments count:', error));
  };


  return (
<Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Patients
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{patientsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Reports
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{reportsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Medicals
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{medicalCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Prescriptions
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{prescriptionsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* New Card for displaying appointments count */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ borderRadius: 5, textAlign: 'center'}}>
          <CardContent style={{alignItems: 'center'}}>
            <Typography variant="h6" component="div">
              Today Clinic Patients Count 
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{appointmentsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dash;
