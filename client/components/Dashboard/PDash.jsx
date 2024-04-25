import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function PDash() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [medicalCount, setMedicalCount] = useState(0);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState({ startTime: '', endTime: '' });
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);
  const [pendingPrescriptionsCount, setPendingPrescriptionsCount] = useState(0);

  useEffect(() => {
    fetchPatientsCount();
    fetchReportsCount();
    fetchMedicalCount();
    fetchPrescriptionsCount();
    fetchAppointmentsCount();
    fetchTodayAppointmentCount();
    fetchPendingPrescriptionsCount();
  }, []);

  const fetchPatientsCount = () => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => setPatientsCount(data.length))
      .catch(error => console.error('Error fetching patients count:', error));
  };

  const fetchReportsCount = () => {
    fetch('http://localhost:3001/getReports')
      .then(response => response.json())
      .then(data => setReportsCount(data.length))
      .catch(error => console.error('Error fetching reports count:', error));
  };

  const fetchMedicalCount = () => {
    fetch('http://localhost:3001/getmedicals')
      .then(response => response.json())
      .then(data => setMedicalCount(data.length))
      .catch(error => console.error('Error fetching medical count:', error));
  };

  const fetchPrescriptionsCount = () => {
    fetch('http://localhost:3001/getPrescriptions')
      .then(response => response.json())
      .then(data => setPrescriptionsCount(data.length))
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
    fetch('http://localhost:3001/getAppointments')
      .then(response => response.json())
      .then(data => {
        const today = new Date().setHours(0, 0, 0, 0);
        const appointmentsToday = data.filter(appointment => new Date(appointment.date).setHours(0, 0, 0, 0) === today);
        setTodayAppointmentCount(appointmentsToday.length);
      })
      .catch(error => console.error('Error fetching today\'s appointment count:', error));
  };

  const fetchPendingPrescriptionsCount = () => {
    fetch('http://localhost:3001/getPrescriptions?status=pending') // Filter by status "pending"
      .then(response => response.json())
      .then(data => setPendingPrescriptionsCount(data.length))
      .catch(error => console.error('Error fetching pending prescriptions count:', error));
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
      <Grid item xs={12} sm={6}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Pending Prescriptions
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{pendingPrescriptionsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
     

      <Grid item xs={12} sm={6}>
        <Card sx={{ borderRadius: 5, textAlign: 'center' }}>
          <CardContent style={{ alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              Today's Patients
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>
              {todayAppointmentCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
  <Card sx={{ borderRadius: 5, textAlign: 'center' }}>
    <CardContent style={{ alignItems: 'center' }}>
      <Typography variant="h6" component="div">
        Estimated Clinic Time
      </Typography>
      {appointmentsCount.message ? ( // Check if appointmentsCount contains a message
        <Typography variant="h6" color={'background.bg2'}>
          {appointmentsCount.message} {/* Display the message */}
        </Typography>
      ) : (
        <Typography variant="h4" color={'background.bg2'}>
          {`${appointmentsCount.startTime} - ${appointmentsCount.endTime}`} {/* Display the estimated clinic time */}
        </Typography>
      )}
    </CardContent>
  </Card>
</Grid>
      
    </Grid>
  );
}

export default PDash;
