import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Breadcrumbs, Grid, Stack, Typography, Button, Container } from '@mui/material'; // Import Container from MUI
import PageBody from '../components/PageBody';
import PRightbar from '../components/PRightbar';
import { TextareaAutosize } from '@mui/material'; // Import TextareaAutosize
import PrescLeftbar from '../components/PrescLeftbar';

function Prescriptionadd() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const status = "pending";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getPatient/${id}`)
      .then(response => setPatient(response.data))
      .catch(error => console.error('Error fetching patient:', error));
  }, [id]);

  const [prescription, setPrescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/AddPrescription", { prescription, nic: patient.nic, status })
      .then(result => {
        console.log(result);
        navigate(`/AppointmentAdd?nic=${patient.nic}`); // Navigate to AppointmentAdd with nic as a query parameter
      })
      .catch(err => console.log(err));
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PrescLeftbar patientNIC={patient.nic} />
        <PageBody>
          <Container maxWidth="xl"> {/* Adjusted Container width */}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <br />
              <Typography variant="h5">Prescription</Typography><br />
              <Typography variant="body1">patient Name: {patient.name}</Typography><br />
              <Typography variant="body1">Age: {patient.age}</Typography><br />

              <TextareaAutosize
                minRows={10}
                placeholder="Write prescription Here"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 6 }}
              /><br /><br />

              <Grid container justifyContent="center" paddingTop={2}>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </form>
          </Container>
        </PageBody>
        <PRightbar patientNIC={patient.nic} />
      </Stack>
    </div>
  );
}

export default Prescriptionadd;
