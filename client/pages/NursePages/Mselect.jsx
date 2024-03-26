import React, { useState, useEffect } from 'react';
import { Box, Stack, TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import NurseLeftbar from './NurseLeftbar';
import Navbar from '../../components/Navbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import AddChartIcon from '@mui/icons-material/AddChart';
import RequestDisplay from './RequestDisplay'; // Import the RequestDisplay component

function Mselect() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [recordRequestsCounts, setRecordRequestsCounts] = useState({}); // State to store record requests counts

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => {
                setPatients(result.data);
                fetchRecordRequestsCounts(result.data); // Fetch record requests counts for each patient
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenRequestsDialog = (patientNIC) => {
        setSelectedPatient(patientNIC);
    };

    const handleCloseRequestsDialog = () => {
        setSelectedPatient(null);
    };

    // Function to fetch record requests counts for each patient
    const fetchRecordRequestsCounts = async (patients) => {
        const counts = {};
        for (const patient of patients) {
            try {
                const response = await axios.get(`http://localhost:3001/getRecordRequests/${patient.nic}`);
                // Filter the record requests with status "pending"
                const pendingRecordRequests = response.data.filter(record => record.status === "pending");
                counts[patient.nic] = pendingRecordRequests.length;
            } catch (error) {
                console.error(`Error fetching record requests count for ${patient.nic}:`, error);
                counts[patient.nic] = 0;
            }
        }
        setRecordRequestsCounts(counts);
    };

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar />
                <PageBody>
                    <TextField
                        label="Search by name or NIC"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        fullWidth
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>NIC</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow key={patient._id}>
                                    <TableCell>
                                        <Avatar alt={patient.name} src={patient.gender === 'male' ? maleAvatar : femaleAvatar} />
                                    </TableCell>
                                    <TableCell>{patient.nic}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>
                                    <Button variant='outlined' style={{ marginRight: '10px' }}>
                                                    <Link style={{ textDecoration: 'none' }} to={`/medicals/${patient.nic}`}>Checkups </Link>
                                                </Button>
                                                <Button variant='outlined' style={{ marginRight: '10px' }}>
                                                    <Link style={{ textDecoration: 'none' }} to={`/bstable/${patient.nic}`}>Blood Sugar</Link>
                                                </Button>
                                        <IconButton onClick={() => handleOpenRequestsDialog(patient.nic)}>
                                            <Badge badgeContent={recordRequestsCounts[patient.nic]} color="primary">
                                                <AddChartIcon />
                                            </Badge>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PageBody>
                <Announcements />
            </Stack>
            <RequestDisplay open={selectedPatient !== null} onClose={handleCloseRequestsDialog} patientNIC={selectedPatient} />
        </div>
    );
}

export default Mselect;
