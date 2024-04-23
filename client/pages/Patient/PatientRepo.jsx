import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Card, CardContent, Box, Typography, InputAdornment, TextField, Button } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../../components/Navbar';
import LabSidebar from '../../components/LabSidebar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';

import Layout from '../../components/Layout';
import Swal from 'sweetalert2'
import Pnav from './Pnav';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PatientRepo() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
   
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;



    useEffect(() => {
        axios.get(`http://localhost:3001/getReports/nic/${nic}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    const sortedReports = response.data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                    setReports(sortedReports);
                    setFilteredReports(sortedReports);
                } else {
                    console.error('Invalid data format received from server:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching reports:', error);
            });
    }, [nic]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredReports(reports);
        } else {
            const filtered = reports.filter(report =>
                report.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredReports(filtered);
        }
    }, [searchTerm, reports]);

   
    return (
        <div>
           <Pnav/>
                       <Layout>
                <Stack direction="row" spacing={2} justifyContent="center">
                   
                   <Card style={{borderRadius:'5%'}}>
                            <CardContent>
                                <Box sx={{ mb: 2 }}>
                                <Button component={Link} to="/patienthome">
                                        <ArrowBackIcon sx={{ fontSize: 40, color: 'background.bg2' }} /></Button>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TextField
                                            label="Search by Report Type"
                                            variant="outlined"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body1" sx={{ mr: 2 }}>
                                                Total Reports: {filteredReports.length}
                                            </Typography>
                                            
                                        </Box>
                                    </Box>
                                </Box>
                                <TableContainer component={Paper} sx={{ maxHeight: '500px', overflow: 'auto' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ minWidth: 150 }}>Report Type</TableCell>
                                                <TableCell style={{ minWidth: 150 }}>Uploaded Date</TableCell>
                                                <TableCell style={{ minWidth: 150 }}>PDF Report</TableCell>
                                              
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Array.isArray(filteredReports) && filteredReports.map(report => (
                                                <TableRow key={report._id}>
                                                    <TableCell>
                                                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{report.type}</Typography>
                                                    </TableCell>
                                                    <TableCell>{new Date(report.uploadDate).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            href={`http://localhost:3001/reports/${report.patientReport}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <SummarizeIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                   
                                                </TableRow>
                                            ))}
                                            {filteredReports.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={5}>No reports found</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                     
                            </Card>
                    
                </Stack>
            </Layout>
          
        </div>
    );
}

export default PatientRepo;
