import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import PharmacySidebar from '../../components/PharmacySidebar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Card, TextField, Grid } from '@mui/material';
import axios from 'axios';
import AddReportDialog from './AddReportDialog';
import Announcements from '../../components/Announcements';
import LabSidebar from '../../components/LabSidebar';

function LabRequestsPage() {
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [recordNic, setRecordNic] = useState('');
    const [recordType, setRecordType] = useState('');

    const fetchRecords = () => {
        axios.get('http://localhost:3001/getLabRequests')
            .then(response => {
                setRecords(response.data);
            })
            .catch(error => {
                console.error('Error fetching records:', error);
            });
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const filteredRecords = records.filter(record => record.status === 'pending' && record.nic.includes(searchQuery));
    const totalRequests = filteredRecords.length;

    const handleOpenDialog = (record) => {
        setSelectedRecord(record);
        setRecordNic(record.nic);
        setRecordType(record.type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <LabSidebar/>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Typography variant="h4" sx={{marginTop:8}}>Lab Requests</Typography>
                    <Card style={{ borderRadius: 6 }}>
                        <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    label="Search by NIC"
                                    variant="outlined"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    sx={{marginLeft:2,marginTop:2}}
                                />
                            </Grid>
                            <Grid item xs={9} container justifyContent="flex-start"> {/* Changed justifyContent to flex-start */}
                                <Typography variant="body1" sx={{marginLeft:2,marginTop:2,color:"#415a77"}}> {totalRequests}  Results</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>NIC</TableCell>
                                                <TableCell>Type</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Requested Date</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredRecords.map(record => (
                                                <TableRow key={record._id}>
                                                    <TableCell>{record.nic}</TableCell>
                                                    <TableCell>{record.type}</TableCell>
                                                    <TableCell>{record.status}</TableCell>
                                                    <TableCell>
                                                    {record.requestedDate ? new Date(record.requestedDate).toLocaleDateString() : 'Invalid Date'}

                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant='outlined' onClick={() => handleOpenDialog(record)}>Add Report</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Card>
                </Stack>
                <AddReportDialog open={openDialog} onClose={handleCloseDialog} selectedRecord={selectedRecord} />
                <Announcements />
            </Stack>
        </div>
    );
}

export default LabRequestsPage;
