import React, { useState, useEffect } from 'react';

import { Box, Breadcrumbs, Stack, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

import axios from 'axios';

import maleAvatar from '../images/male.png'
import femaleAvatar from '../images/female.png'
import NurseLeftbar from './NurseLeftbar';
import Navbar from '../../components/Navbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';




function BsSelect() {
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
            <Navbar pageTitle="Select Patient " />
            <Layout>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar/>
                <PageBody>
                    <TextField
                        label="Search by name or NIC"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        fullWidth
                    />
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
                                        <Button variant='outlined' style={{ marginRight: '10px' }}>
                        <Link style={{ textDecoration: 'none' }} to={`/bstable/${patient.nic}`}>Blood Sugar</Link>
                      </Button>
                     

                                              </Stack>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PageBody>
                <Announcements/>
            </Stack></Layout>
        </div>
    );
}

export default BsSelect;
