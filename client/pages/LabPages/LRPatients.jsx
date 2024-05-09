import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import PharmacySidebar from '../../components/PharmacySidebar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Card, TextField, Grid, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';
import AddReportDialog from './AddReportDialog';
import Announcements from '../../components/Announcements';
import LabSidebar from '../../components/LabSidebar';
import Layout from '../../components/Layout';
import PageBody from '../../components/PageBody';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import { Link } from 'react-router-dom';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function LRPatients() {
  
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

    const getReportRequestsCount = async (nic) => {
        try {
            const response = await axios.get(`/getReportRequests/${nic}`);
            return response.data.length; // Length of pending report requests
        } catch (error) {
            console.error('Error fetching report requests count:', error);
            return 0;
        }
    };

    const fetchReportRequestsCount = async () => {
        const patientsWithReportRequestsCount = await Promise.all(patients.map(async (patient) => {
            const count = await getReportRequestsCount(patient.nic);
            return { ...patient, reportRequestsCount: count };
        }));
        setPatients(patientsWithReportRequestsCount);
    };

    useEffect(() => {
        fetchReportRequestsCount();
    }, [patients]);

    const filteredPatients = patients.filter(patient =>
        (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patient.nic && patient.nic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <Navbar pageTitle="requests" />
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
                                                <Link style={{ textDecoration: 'none' }} to={`/reports/${patient.nic}`}>
                                                    <Button variant='outlined' style={{ marginRight: '10px' }}>
                                                        View
                                                    </Button>
                                                </Link>
                                                <TextSnippetIcon /> {/* Display TextSnippetIcon */}
                                                {patient.reportRequestsCount > 0 && ( // Display badge if there are pending report requests
                                                    <span style={{ marginLeft: '5px', backgroundColor: 'red', color: 'white', padding: '2px 5px', borderRadius: '50%' }}>
                                                        {patient.reportRequestsCount}
                                                    </span>
                                                )}
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    </PageBody>
                    <Announcements />
                </Stack>
            </Layout>
        </div>
    );
}

export default LRPatients;
