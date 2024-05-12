import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function ADash() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [medicalCount, setMedicalCount] = useState(0);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState({ startTime: '', endTime: '' });
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);

  useEffect(() => {
    fetchPatientsCount();
    fetchReportsCount();
    fetchMedicalCount();
    fetchPrescriptionsCount();
    fetchAppointmentsCount();
    fetchTodayAppointmentCount();
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
    fetch('http://localhost:3001/getAppointments')
      .then(response => response.json())
      .then(data => {
        const today = new Date().setHours(0, 0, 0, 0);
        const appointmentsToday = data.filter(appointment => new Date(appointment.date).setHours(0, 0, 0, 0) === today);
        
        if (appointmentsToday.length === 0) {
          // Set message if no appointments for today
          setAppointmentsCount({ message: 'Today is not a clinic date' });
          return; // Stop further execution
        }
        
        const sortedAppointments = appointmentsToday.sort((a, b) => new Date(a.date) - new Date(b.date));
        const startTime = new Date(today).setHours(7, 30, 0, 0);
        let lastAppointmentTime = startTime;
        if (sortedAppointments.length > 0) {
          const lastAppointment = sortedAppointments[sortedAppointments.length - 1];
          lastAppointmentTime = new Date(lastAppointment.date).getTime();
        }
        const endTime = new Date(lastAppointmentTime + (6 * 60 * 1000));
        const formatTime = (time) => {
          const date = new Date(time);
          let hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          return `${hours}:${minutes} ${ampm}`;
        };
        setAppointmentsCount({
          startTime: formatTime(startTime),
          endTime: formatTime(endTime)
        });
      })
      .catch(error => console.error('Error fetching appointments count:', error));
  };
  const fetchTodayAppointmentCount = () => {
    // Fetch today's appointment count from the backend
    fetch('http://localhost:3001/getAppointments')
      .then(response => response.json())
      .then(data => {
        // Filter appointments for today
        const today = new Date().setHours(0, 0, 0, 0);
        const appointmentsToday = data.filter(appointment => new Date(appointment.date).setHours(0, 0, 0, 0) === today);
        setTodayAppointmentCount(appointmentsToday.length);
      })
      .catch(error => console.error('Error fetching today\'s appointment count:', error));
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
              Staff
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>10</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Feedbacks
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>11</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
             Blog posts
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>4</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Clinic time range card */}
      <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: 5, textAlign: 'center' }}>
                <CardContent style={{ alignItems: 'center' }}>
                
                </CardContent>
            </Card>
            </Grid>
      {/* Today's appointment count card */}
      <Grid item xs={12} sm={6}>
        <Card sx={{ borderRadius: 5, textAlign: 'center' }}>
          <CardContent style={{ alignItems: 'center' }}>
           
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ADash;
