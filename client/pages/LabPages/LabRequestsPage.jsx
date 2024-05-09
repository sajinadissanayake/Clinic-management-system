import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import LabSidebar from '../../components/LabSidebar';
import Layout from '../../components/Layout';
import PageBody from '../../components/PageBody';
import { Stack, Typography, Card, Grid, TextField, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import AddReportDialog from './AddReportDialog';
import Announcements from '../../components/Announcements';
import { useParams } from 'react-router-dom';

function LabRequestsPage() {
    const { nic } = useParams();
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [recordNic, setRecordNic] = useState('');
    const [recordType, setRecordType] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecords = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/getLabRequests`);
                setRecords(response.data.filter(record => record.nic === nic));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching records:', error);
                setLoading(false);
            }
        };
        fetchRecords();
    }, [nic]);

    const filteredRecords = records.filter(record => 
        record.status === 'pending' && 
        (record.nic.includes(searchQuery) || record.type.includes(searchQuery))
    );
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
            <Navbar pageTitle="Reports" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <LabSidebar />
                    <PageBody>
                        <Stack direction="column" alignItems="center" spacing={2}>
                            <Typography variant="h4" sx={{ marginTop: 8 }}>Lab Requests</Typography>
                            <Card style={{ borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20 }}>
                                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                                    <Grid item xs={9}>
                                        <TextField
                                            label="Search by Type"
                                            variant="outlined"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={3} container justifyContent="flex-end">
                                        <Typography variant="body1" sx={{ color: "#415a77" }}>{totalRequests} Requests</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                            {loading ? (
                                <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
                                    <CircularProgress />
                                </Grid>
                            ) : totalRequests === 0 ? (
                                <Typography variant="body1" sx={{ marginTop: 2, color: "#FF0000", textAlign: 'center' }}>
                                    No results found
                                </Typography>
                            ) : (
                                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                              
                                                <TableCell>Type</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Requested Date</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredRecords.map(record => (
                                                <TableRow key={record._id}>
                                                   
                                                    <TableCell>{record.type}</TableCell>
                                                    <TableCell>{record.status}</TableCell>
                                                    <TableCell>{record.requestedDate ? new Date(record.requestedDate).toLocaleDateString() : 'Invalid Date'}</TableCell>
                                                    <TableCell>
                                                        <Button variant='outlined' onClick={() => handleOpenDialog(record)}>Add Report</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Stack>
                    </PageBody>
                    <AddReportDialog open={openDialog} onClose={handleCloseDialog} selectedRecord={selectedRecord} />
                    <Announcements />
                </Stack>
            </Layout>
        </div>
    );
}

export default LabRequestsPage;
