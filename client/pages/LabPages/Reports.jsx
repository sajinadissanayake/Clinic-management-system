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
import MAddReportDialog from './MAddReportDialog';
import ReportsUpdateDialog from './ReportsUpdateDialog'; // Import the dialog component
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Swal from 'sweetalert2'
import SideReq from './SideReq';

function Reports() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addDialogOpen, setAddDialogOpen] = useState(false); // Separate state for Add Report dialog
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false); // Separate state for Update Report dialog
    const [selectedReportId, setSelectedReportId] = useState(null);
    const { nic } = useParams();

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleOpenUpdateDialog = (reportId) => {
        setSelectedReportId(reportId);
        setUpdateDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
        setSelectedReportId(null);
    };

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

    const handleDeleteReport = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this report!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/deleteReport/${id}`)
                    .then(response => {
                        setReports(reports.filter(report => report._id !== id));
                        setFilteredReports(filteredReports.filter(report => report._id !== id));
                        Swal.fire('Deleted!', 'Your report has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting report:', error);
                        Swal.fire('Error!', 'An error occurred while deleting the report.', 'error');
                    });
            }
        });
    };

    return (
        <div>
            <Navbar pageTitle="Reports" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <LabSidebar />
                    <PageBody>
                      
                            <CardContent>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="h5" sx={{ mb: 2 }}>Reports for NIC: {nic}</Typography>
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
                                            <IconButton color="primary" onClick={handleOpenAddDialog}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                                <TableContainer component={Paper} sx={{ maxHeight: '450px', overflow: 'auto' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ minWidth: 150 }}>Report Type</TableCell>
                                                <TableCell style={{ minWidth: 150 }}>Upload Date</TableCell>
                                                <TableCell style={{ minWidth: 150 }}>PDF Report</TableCell>
                                                <TableCell style={{ minWidth: 100 }}>Edit</TableCell>
                                                <TableCell style={{ minWidth: 100 }}>Delete</TableCell>
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
                                                    <TableCell>
                                                        <IconButton onClick={() => handleOpenUpdateDialog(report._id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton color='error' onClick={() => handleDeleteReport(report._id)}>
                                                            <DeleteIcon />
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
                     
                    </PageBody>
                    <SideReq nic={nic} />
                </Stack>
            </Layout>
            <MAddReportDialog open={addDialogOpen} onClose={handleCloseAddDialog} nic={nic} />
            <ReportsUpdateDialog open={updateDialogOpen} onClose={handleCloseUpdateDialog} reportId={selectedReportId} />
        </div>
    );
}

export default Reports;
