import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import PharmacySidebar from '../../components/PharmacySidebar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import AddReportDialog from './AddReportDialog'; // Import the dialog component

function LabRequestsPage() {
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
    const [selectedRecordId, setSelectedRecordId] = useState(null); // State to hold the ID of the selected record

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

    const filteredRecords = records.filter(record => record.nic.includes(searchQuery));

    const handleOpenDialog = (recordId) => {
        setSelectedRecordId(recordId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <PharmacySidebar />
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
                                    <TableCell>{new Date(record.requestedDate).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button variant='outlined' onClick={() => handleOpenDialog(record._id)}>Add Report</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddReportDialog open={openDialog} onClose={handleCloseDialog} recordId={selectedRecordId} />
            </Stack>
        </div>
    );
}

export default LabRequestsPage;
