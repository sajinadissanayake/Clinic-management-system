import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Breadcrumbs, Grid, Stack, Typography, Button, Container } from '@mui/material';
import PageBody from '../components/PageBody';
import PRightbar from '../components/PRightbar';
import { TextareaAutosize } from '@mui/material';
import PrescLeftbar from '../components/PrescLeftbar';
import Layout from '../components/Layout';
import presc from './images/presc.json';
import Lottie from 'lottie-react';

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/AddPrescription", {
        prescription,
        nic: patient.nic,
        email: patient.email,
        status
      });
      console.log(result);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Prescription added successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
       
        navigate(`/appointmentAdd?nic=${patient.nic}&email=${patient.email}`);
        

      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add prescription. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar pageTitle="Create Prescription" />
      <Layout>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <PrescLeftbar patientNIC={patient.nic} />
          <PageBody>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Container>
                  <form onSubmit={handleSubmit}>
                    <br />
                    <Typography variant="h5">Prescription</Typography><br />
                    <Typography variant="body1">Patient Name: {patient.name}</Typography><br />
                    <Typography variant="body1">Age: {patient.age}</Typography><br />

                    <TextareaAutosize
                      minRows={18}
                      placeholder="Write prescription here"
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: 6 }}
                    />
                    <br /><br />


                    <Grid container justifyContent="center">
                      <Button type="submit" variant="contained" color="primary">
                        Create
                      </Button>
                    </Grid>
                  </form>
                </Container>
              </Grid>
              <Grid item xs={6}>
                <Container>
                  <Lottie animationData={presc} />
                </Container>
              </Grid>
            </Grid>
          </PageBody>
          <PRightbar patientNIC={patient.nic} />
        </Stack>
      </Layout>
    </div>
  );
}

export default Prescriptionadd;
