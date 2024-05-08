import React, { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Stack, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import maleAvatar from '../pages/images/male.png';
import femaleAvatar from '../pages/images/female.png';
import Navbar from '../components/Navbar';

import PageBody from '../components/PageBody';
import Announcements from '../components/Announcements';
import NurseLeftbar from '../pages/NursePages/NurseLeftbar';
// Import AddCircleIcon
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Layout from '../components/Layout';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setPatients(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPatients = patients.filter(patient =>
        (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patient.nic && patient.nic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <Navbar />
            <Layout>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar/>
                <PageBody>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <TextField
                            label="Search by name or NIC"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                            fullWidth
                        />
                        {/* Add AddCircleIcon */}
                        <Link style={{ textDecoration: 'none' }} to={`/addpatient`}><AddCircleIcon  style={{ cursor: 'pointer', fontSize: 40, color: '#778da9' }} /></Link>
                    </Stack>
                    <div style={{ height: '70vh', overflowY: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>NIC</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient._id}>
                                        <TableCell>
                                            <Avatar alt={patient.name} src={patient.gender === 'male' ? maleAvatar : femaleAvatar} />
                                        </TableCell>
                                        <TableCell>{patient.nic}</TableCell>
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                            <Link style={{ textDecoration: 'none' }} to={`/patient/${patient._id}`}> <Button variant='outlined' style={{ marginRight: '10px' }}>
                                                    View
                                                </Button></Link>
                                                <Button variant='outlined' color='error' onClick={() => handleDelete(patient._id)}>
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PageBody>
                <Announcements />
            </Stack></Layout>
        </div>
    );
}

export default PatientList;
