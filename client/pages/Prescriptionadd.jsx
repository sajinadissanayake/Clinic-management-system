import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Breadcrumbs, Grid, Stack, Typography, Button } from '@mui/material';
import PageBody from '../components/PageBody';
import PRightbar from '../components/PRightbar';
import { TextareaAutosize } from '@mui/material'; // Import TextareaAutosize
import PrescLeftbar from '../components/PrescLeftbar';
function Prescriptionadd() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getPatient/${id}`)
      .then(response => setPatient(response.data))
      .catch(error => console.error('Error fetching patient:', error));
  }, [id]);

  const [prescription, setPrescription] = useState('');

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/AddPrescription", { prescription,nic:patient.nic })
      .then(result => {
        console.log(result);
        navigate('/pselect');
      })
      .catch(err => console.log(err));
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: '20px 0', width: '100%' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Dashboard
          </Link>
          <Link underline="hover" color="inherit" href="/">
            Patient profile
          </Link>
          <Typography color="text.primary">create prescription</Typography>
        </Breadcrumbs>
      </div>

      <Stack direction="row" spacing={2} justifyContent="space-between">
      <PrescLeftbar patientNIC={patient.nic} />
        <PageBody>
          <form onSubmit={Submit}>
            <br />
            <Typography variant="h5">Prescription</Typography><br />
            <Typography variant="body1">patient name: {patient.name}</Typography><br />

            <TextareaAutosize
              minRows={5}
              placeholder="prescription"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              style={{ width: '100%', padding: '10px' }}
            /><br /><br />

            <Grid container justifyContent="center" paddingTop={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </form>
        </PageBody>
        <PRightbar patientNIC={patient.nic} />
      </Stack>
    </div>
  );
}

export default Prescriptionadd;