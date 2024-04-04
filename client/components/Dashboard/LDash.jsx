import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function LDash() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [medicalCount, setMedicalCount] = useState(0);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [labRequestsCount, setLabRequestsCount] = useState(0);
  const [pendingLabRequestsCount, setPendingLabRequestsCount] = useState(0);
  const [currentMonthReportsCount, setCurrentMonthReportsCount] = useState(0); // New state variable
  const [appointmentsCount, setAppointmentsCount] = useState({ startTime: '', endTime: '' });
  const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);

  useEffect(() => {
    fetchPatientsCount();
    fetchReportsCount();
    fetchMedicalCount();
    fetchPrescriptionsCount();
    fetchLabRequestsCount();
    fetchPendingLabRequestsCount();
    fetchCurrentMonthReportsCount(); // Fetch current month reports count
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
    // Fetch all reports count from the backend
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

  const fetchLabRequestsCount = () => {
    // Fetch all lab requests count from the backend
    fetch('http://localhost:3001/getLabRequests')
      .then(response => response.json())
      .then(data => {
        setLabRequestsCount(data.length);
      })
      .catch(error => console.error('Error fetching lab requests count:', error));
  };

  const fetchPendingLabRequestsCount = () => {
    // Fetch pending lab requests count from the backend
    fetch('http://localhost:3001/getLabRequests?status=pending')
      .then(response => response.json())
      .then(data => {
        setPendingLabRequestsCount(data.length);
      })
      .catch(error => console.error('Error fetching pending lab requests count:', error));
  };
  

  const fetchCurrentMonthReportsCount = () => {
    // Fetch reports for the current month from the backend
    fetch('http://localhost:3001/getReports')
      .then(response => response.json())
      .then(data => {
        // Get the current date
        const currentDate = new Date();
        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // Get the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
        // Filter reports for the current month
        const currentMonthReports = data.filter(report => {
          const reportDate = new Date(report.uploadDate); // Assuming the uploadDate property exists in the report object
          // Check if the report date falls within the current month
          return reportDate >= firstDayOfMonth && reportDate <= lastDayOfMonth;
        });
        setCurrentMonthReportsCount(currentMonthReports.length);
      })
      .catch(error => console.error('Error fetching current month reports count:', error));
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Patients
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{patientsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Reports
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{reportsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Report Requests
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{labRequestsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={4}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Pending Requests
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{pendingLabRequestsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              This Month Reports
            </Typography>
            <Typography variant="h4" color={'background.bg2'}>{currentMonthReportsCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LDash;
