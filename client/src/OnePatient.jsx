import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';

function OnePatient() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/getPatient/${id}`)
      .then(response => setPatient(response.data))
      .catch(error => console.error('Error fetching patient:', error));
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>{patient.name}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Name:</strong> {patient.name}</Typography>
          <Typography variant="body1"><strong>NIC:</strong> {patient.nic}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {patient.email}</Typography>
          <Typography variant="body1"><strong>Age:</strong> {patient.age}</Typography>
          <Typography variant="body1"><strong>Date of Birth:</strong> {patient.dob}</Typography>
          <Typography variant="body1"><strong>Gender:</strong> {patient.gender}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {patient.address}</Typography>
          <Typography variant="body1"><strong>Marital Status:</strong> {patient.maritial}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Phone Number:</strong> {patient.pnumber}</Typography>
          <Typography variant="body1"><strong>MOH:</strong> {patient.moh}</Typography>
          <Typography variant="body1"><strong>PHM:</strong> {patient.phm}</Typography>
          <Typography variant="body1"><strong>PHI:</strong> {patient.phi}</Typography>
          <Typography variant="body1"><strong>GND:</strong> {patient.gnd}</Typography>
          <Typography variant="body1"><strong>DSD:</strong> {patient.dsd}</Typography>
          <Typography variant="body1"><strong>Neighbour:</strong> {patient.neighbour}</Typography>
          <Typography variant="body1"><strong>Education:</strong> {patient.education}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1"><strong>Physical Condition:</strong> {patient.physical}</Typography>
          <Typography variant="body1"><strong>Tobacco Use:</strong> {patient.tobacco}</Typography>
          <Typography variant="body1"><strong>Tobacco Chewing:</strong> {patient.tobaccochew}</Typography>
          <Typography variant="body1"><strong>Alcohol Consumption:</strong> {patient.alcohol}</Typography>
          <Typography variant="body1"><strong>Other Details:</strong> {patient.other}</Typography>
          <Typography variant="body1"><strong>Snacks:</strong> {patient.snacks}</Typography>
          <Typography variant="body1"><strong>Diseases:</strong> {patient.diseases}</Typography>
          <Typography variant="body1"><strong>Allergies:</strong> {patient.allergies}</Typography>
          <Typography variant="body1"><strong>Registration Date:</strong> {patient.registrationDate}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OnePatient;
