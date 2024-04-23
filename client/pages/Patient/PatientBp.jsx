import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, Card, CardContent, Avatar, Box } from '@mui/material'; // Import Dialog components

import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';

import Config from '../../config/config';



import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function PatientBp() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;
    const [bloodPressureData, setBloodPressureData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch blood pressure data based on NIC
        axios.get(`${Config().getBaseServerUrl}/getBloodpressure/${nic}`)
            .then(response => {
                // Sort the data array in descending order based on the record date
                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                setBloodPressureData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching blood pressure data:', error);
            });

        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [nic]);

    // Function to format date and time
    // Function to format date (without time)
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };


    // Function to handle opening the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

   

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Navbar pageTitle="Blood Pressure" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    
                <Box  flex={4} p={2}  borderRadius={3} >
                        <Container>
                        <Card style={{ borderRadius: 30, marginTop: 20 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                <Button component={Link} to="/patienthome">
                                    <ArrowBackIcon sx={{ fontSize: 40, color: 'background.bg2' }} /></Button>
                                    <div style={{ textAlign: 'center', flexGrow: 1 }}>
                                        <Typography variant="h5">Blood Pressure</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                            
                            <div style={{ maxHeight: '400px', overflowY: 'auto',marginTop:'2%' }}> {/* Adjust the maxHeight to your preference */}

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Value</TableCell>
                                              
                                                <TableCell>Record Date</TableCell>
                                              
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bloodPressureData.map((data) => (
                                                <TableRow key={data._id}>
                                                    <TableCell>{data.systolic}-{data.diastolic}</TableCell>
                                                  
                                                    <TableCell>{formatDate(data.Recorddate)}</TableCell>
                                                    
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Container>

                    </Box>
          
                </Stack>
            </Layout>

          
        </div>
    );
}

export default PatientBp;
