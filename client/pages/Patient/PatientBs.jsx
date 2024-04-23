import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Config from '../../config/config';
import Navbar from '../../components/Navbar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, RadioGroup, Radio, FormControlLabel, Button, Toolbar, Typography, IconButton, Card, CardContent, Avatar, Box } from '@mui/material';

import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Swal from 'sweetalert2'; 
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import DeleteIcon from '@mui/icons-material/Delete';
import Pnav from './Pnav';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PatientBs() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;

    const [bloodSugarData, setBloodSugarData] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [openDialog, setOpenDialog] = useState(false);
    const [patient, setPatient] = useState(null); // Define patient state
    const [error, setError] = useState(null); // Define error state

    useEffect(() => {
        axios.get(`${Config().getBaseServerUrl}/getBloodSugarData/${nic}`)
            .then(response => {
                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                setBloodSugarData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching blood sugar data:', error);
            });
        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [nic]);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const deleteRecord = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this record. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Config().getBaseServerUrl}/deletebs/${id}`)
                    .then(response => {
                        setBloodSugarData(bloodSugarData.filter(entry => entry._id !== id));
                        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting record:', error);
                        Swal.fire('Error!', 'An error occurred while deleting the record.', 'error');
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'The record deletion has been cancelled.', 'info');
            }
        });
    };

    const filteredData = filterType === 'all' ? bloodSugarData : bloodSugarData.filter(entry => entry.type === filterType);

    return (
        <div>
            <Pnav/>
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between"flex={4}>
                   
                <Box  flex={4} p={2}  boxShadow={3} borderRadius={3} >



                        {patient && ( // Check if patient is defined
                            <Card style={{ borderRadius: 30, marginTop: 20 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                <Button component={Link} to="/patienthome">
                                    <ArrowBackIcon sx={{ fontSize: 40, color: 'background.bg2' }} /></Button>
                                    <div style={{ textAlign: 'center', flexGrow: 1 }}>
                                        <Typography variant="h5">Blood Sugar</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                        )}
                        <RadioGroup row aria-label="filter" name="filter" value={filterType} onChange={handleFilterChange}>
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="random" control={<Radio />} label="Random" />
                            <FormControlLabel value="fasting" control={<Radio />} label="Fasting" />
                        </RadioGroup>
                        <div style={{ overflowX: 'auto',maxHeight: '400px' }}> {/* Wrap TableContainer with a div and apply CSS for scrolling */}
                            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Blood Sugar Records
                                    </Typography>
                                    
                                </Toolbar>
                                <Table>
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell>Record Date</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Value</TableCell>
                                            <TableCell>Special Notes</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.map((entry, index) => (
                                            <TableRow hover key={index}>
                                                <TableCell>{new Date(entry.Recorddate).toLocaleDateString()}</TableCell>
                                                <TableCell>{entry.type}</TableCell>
                                                <TableCell>{entry.rbs}</TableCell>
                                                <TableCell>{entry.specialNotes}</TableCell>
                                               
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        </Box>
                  
                   
                </Stack>
            </Layout>
        </div>
    );
}

export default PatientBs;
