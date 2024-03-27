import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Avatar, Stack, Card, CardContent, Button } from '@mui/material';
import Rightbar from '../components/Rightbar';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import BloodSugarChart from '../components/BloodSugarChart';
import PRightbar from '../components/PRightbar';
import PatientReports from '../components/PatientReports';
import NurseLeftbar from '../pages/NursePages/NurseLeftbar';
import Announcements from '../components/Announcements';

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
  
  let surgicalHistoryItems = null;
  if (patient.sh) {
    surgicalHistoryItems = patient.sh.split('\n').map((item, index) => (
      <Typography key={index} variant="body1">
        {item}
      </Typography>
    ));
  }

  

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
       <NurseLeftbar/>
        <PageBody>
        <div style={{ maxHeight: '700px', overflowY: 'scroll' }}> 
          <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
              <Typography variant="h5">{patient.name}</Typography>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar alt={patient.name} src={patient.avatarUrl} sx={{ width: 120, height: 120, marginBottom: 2 }} />
               
              </Grid>
              <Button variant='outlined' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                <Link style={{ textDecoration: 'none' }} to={`/updatepatient/${patient._id}`}>
                    Update
                </Link>
              </Button>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Typography variant="h6">Personal Details</Typography>
                        <Typography variant="body1"><strong>Name:</strong> <br/>{patient.name}</Typography>
                        <Typography variant="body1"><strong>NIC:</strong>  <br/>{patient.nic}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> <br/> {patient.email}</Typography>
                        <Typography variant="body1"><strong>Age at Registration:</strong> <br/> {patient.age}</Typography>
                        <Typography variant="body1"><strong>Date of Birth:</strong> <br/>{new Date(patient.dob).toLocaleDateString()}</Typography>

                        <Typography variant="body1"><strong>Gender:</strong> <br/> {patient.gender}</Typography>
                        <Typography variant="body1"><strong>Address:</strong> <br/> {patient.address}</Typography>
                        <Typography variant="body1"><strong>Marital Status:</strong>  <br/>{patient.maritial}</Typography>
                        <Typography variant="body1"><strong>Phone Number:</strong> <br/> {patient.pnumber}</Typography>
                       
                      </CardContent>
                    </Card>
                  </Grid>


                  <Grid item xs={12} sm={6}>
                    <Card sx={{ width: '100%' }}>
                      <CardContent>
                        <Typography variant="h6">Health Details</Typography>
                        <Typography variant="body1"><strong>Physical Condition:</strong> <br/>{patient.physical}</Typography>
                        <Typography variant="body1"><strong>Tobacco Use:</strong>  <br/>{patient.tobacco}</Typography>
                        <Typography variant="body1"><strong>Tobacco Chewing:</strong>  <br/>{patient.tobaccochew}</Typography>
                        <Typography variant="body1"><strong>Alcohol Consumption:</strong> <br/> {patient.alcohol}</Typography>
                        <Typography variant="body1"><strong>Other Details:</strong>  <br/>{patient.other}</Typography>
                        <Typography variant="body1"><strong>Snacks:</strong> <br/> {patient.snacks}</Typography>
                        <Typography variant="body1"><strong>Diseases:</strong> <br/> {patient.diseases}</Typography>
                        <Typography variant="body1"><strong>Allergies:</strong>  <br/>{patient.allergies}</Typography>
                        <Typography variant="body1"><strong>Registration Date:</strong> <br/> {new Date(patient.registrationDate).toLocaleDateString()}</Typography>

                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="body1"><strong>MOH Area:</strong>  {patient.moh}</Typography>
                    <Typography variant="body1"><strong>PHM Area:</strong>{patient.phm}</Typography>
                    <Typography variant="body1"><strong>PHI Area:</strong>  {patient.phi}</Typography>
                    <Typography variant="body1"><strong>GN Division </strong>  {patient.gnd}</Typography>
                 </CardContent></Card>

                  </Grid>


                  <Grid item xs={12} sm={6}>
                  <Card sx={{ width: '100%' }}>
                  <CardContent>
                  <Typography variant="body1"><strong>DS Division:</strong>  {patient.dsd}</Typography>
                    <Typography variant="body1"><strong>Neighbour:</strong>  <br/>{patient.neighbour}</Typography>
                    <Typography variant="body1"><strong>Education:</strong>  {patient.education}</Typography>
                    
                    
                    
                    
                    </CardContent></Card></Grid>
                    <Grid item xs={12} sm={12}>

                  <Card sx={{ width: '100%' }}>
                  <CardContent>
                  <CardContent>
                  <Typography variant="body1"><strong>Surgical History</strong></Typography>
                        {surgicalHistoryItems}
                      </CardContent>
                    </CardContent></Card></Grid>


                    

                    
                  
                 
                  
                 

                </Grid>
              </Grid>
            </Grid>

          </Container>
        </div>
        </PageBody>
        <Announcements/>

      </Stack>
    </div>
  );
}

export default OnePatient;
