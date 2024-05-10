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

function PRecReq() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;
    const [pendingRecordRequests, setPendingRecordRequests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/getRecordRequests/${nic}`)
        .then(response => {
            setPendingRecordRequests(response.data.filter(request => request.status === "pending"));
        })
        .catch(error => console.error('Error fetching pending Record requests:', error));
    }, [nic]);

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
                                            <Typography variant="h5">Record Requests</Typography>
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <div style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '2%' }}>
                                <TableContainer component={Paper}>
                                    {pendingRecordRequests.length > 0 ? (
                                        <CardContent>
                                            <Typography variant="body1" marginBottom={2}>Pending Record Requests</Typography>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Type</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {pendingRecordRequests.map(request => (
                                                            <TableRow key={request._id}>
                                                                <TableCell>{request.type}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </CardContent>
                                    ) : (
                                        <CardContent>
                                            <Typography variant="body1">No pending record requests</Typography>
                                        </CardContent>
                                    )}
                                </TableContainer>
                            </div>
                        </Container>
                    </Box>
                </Stack>
            </Layout>
        </div>
    );
}

export default PRecReq;
