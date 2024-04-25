import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Breadcrumbs, Grid, Stack, Typography, Button, Container } from '@mui/material'; 
import PageBody from '../components/PageBody';
import PRightbar from '../components/PRightbar';
import { TextareaAutosize } from '@mui/material'; 
import PrescLeftbar from '../components/PrescLeftbar';
import Layout from '../components/Layout';

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
    axios.post("http://localhost:3001/AddPrescription", { prescription, nic: patient.nic,email:patient.email, status })
      .then(result => {
        console.log(result);
        navigate(`/appointmentAdd?nic=${patient.nic}&email=${patient.email}`);
         // Pass email as query parameter
      })
      .catch(err => console.log(err));
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Navbar pageTitle=" Create Prescription" />
       <Layout>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PrescLeftbar patientNIC={patient.nic} />
        <PageBody>
          <Container maxWidth="xl"> 
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
      </Stack></Layout>
    </div>
  );
}

export default Prescriptionadd;
