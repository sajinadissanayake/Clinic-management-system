import React, { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Stack, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import NurseLeftbar from '../NursePages/NurseLeftbar';
import Announcements from '../../components/Announcements';
import PageBody from '../../components/PageBody';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import LabSidebar from '../../components/LabSidebar';
import Layout from '../../components/Layout';

function PReportSelect() {
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
            
            <Navbar pageTitle="Reports" />
            <Layout>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <LabSidebar/>
                <PageBody>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <TextField
                            label="Search by name or NIC"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                            fullWidth
                            style={{width: '250px'}} // Adjust width here
                        />
                        <Typography variant="subtitle1">{filteredPatients.length} Results</Typography>
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
                                            <Link style={{ textDecoration: 'none' }} to={`/reports/${patient.nic}`}> <Button variant='outlined' style={{ marginRight: '10px' }}>
                                                    View
                                                </Button></Link>
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

export default PReportSelect;
