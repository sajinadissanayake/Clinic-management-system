import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Avatar, Stack, Card, CardContent, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import PageBody from '../../components/PageBody';
import PatientReports from '../../components/PatientReports';
import BloodSugarChart from '../../components/BloodSugarChart';
import PRightbar from '../../components/PRightbar';
import { red } from '@mui/material/colors';
import PrescLeftbar from '../../components/PrescLeftbar';

function PrescProfile() {
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
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <PrescLeftbar patientNIC={patient.nic} />
                <PageBody>
                    <Container maxWidth="md" sx={{ marginTop: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                               
                                <Avatar alt={patient.name} src={patient.avatarUrl} sx={{ width: 120, height: 120, marginBottom: 2 }} />
                                <Typography variant="h5">{patient.name}</Typography>
                                <Typography variant="h6" style={{ color: 'red' }}>Blood Type: {patient.blood}</Typography>

                                <Button variant='outlined' style={{ marginTop: 10 }}>
                                    <Link style={{ textDecoration: 'none' }} to={`/updatepatient/${patient._id}`}>
                                        Update
                                    </Link>
                                </Button>
                                <Button variant='outlined' style={{ marginTop: 10 }}>
                                    <Link style={{ textDecoration: 'none' }} to={`/addpresc/${patient._id}`}>
                                        add prescription
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">Personal Details</Typography>
                                        <Typography variant="body1"><strong>Name:</strong><br/> {patient.name}</Typography>
                                        <Typography variant="body1"><strong>NIC:</strong> <br/>{patient.nic}</Typography>
                                        <Typography variant="body1"><strong>Email:</strong><br/> {patient.email}</Typography>
                                        <Typography variant="body1"><strong>Age:</strong> {patient.age}</Typography>
                                        <Typography variant="body1"><strong>Education up to:</strong> {patient.education}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">Health Details</Typography>
                                        <Typography variant="body1"><strong>Physical Condition:</strong> {patient.physical}</Typography>
                                        <Typography variant="body1"><strong>Tobacco Use:</strong> {patient.tobacco}</Typography>
                                        <Typography variant="body1"><strong>Tobacco Chewing:</strong> {patient.tobaccochew}</Typography>
                                        <Typography variant="body1"><strong>Alcohol Consumption:</strong> {patient.alcohol}</Typography>
                                        <Typography variant="body1"><strong>Other Drugs:</strong> {patient.other}</Typography>
                                        <Typography variant="body1"><strong>Snacks:</strong> {patient.snacks}</Typography>
                                        <Typography variant="body1"><strong>Diseases:</strong> {patient.diseases}</Typography>
                                        <Typography variant="body1"><strong>Allergies:</strong> {patient.allergies}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">Blood Sugar Levels</Typography>
                                        <BloodSugarChart nic={patient.nic} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">Reports</Typography>
                                        <PatientReports nic={patient.nic}  />

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </PageBody>
                <PRightbar patientNIC={patient.nic} />
            </Stack>
        </div>
    )
}

export default PrescProfile;
