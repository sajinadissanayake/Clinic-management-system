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

function ClinicHistory() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;
    const [bloodPressureData, setBloodPressureData] = useState([]);

    useEffect(() => {
        // Fetch blood pressure data based on NIC
        axios.get(`${Config().getBaseServerUrl}/getAppointments/${nic}`)
            .then(response => {
                // Sort the data array in descending order based on the appointment date
                const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBloodPressureData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching blood pressure data:', error);
            });

    }, [nic]);

    // Function to format date (without time)
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div>
            <Navbar pageTitle="Blood Pressure" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Box flex={4} p={2} borderRadius={3}>
                        <Container>
                            <Card style={{ borderRadius: 30, marginTop: 20 }}>
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button component={Link} to="/patienthome">
                                            <ArrowBackIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                                        </Button>
                                        <div style={{ textAlign: 'center', flexGrow: 1 }}>
                                            <Typography variant="h5">Clinic History</Typography>
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <div style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '2%' }}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Clinic Type</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bloodPressureData.map((data) => (
                                                <TableRow key={data._id}>
                                                    <TableCell>{data.title}</TableCell>
                                                    <TableCell>{formatDate(data.date)}</TableCell>
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

export default ClinicHistory;
