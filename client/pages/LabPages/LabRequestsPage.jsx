// LabRequestsPage.jsx
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

    const filteredRecords = records.filter(record => record.nic.includes(searchQuery));

    const handleOpenDialog = (recordId, nic, type) => {
        setSelectedRecordId(recordId);
        setRecordNic(nic); // Set the NIC of the selected record
        setRecordType(type); // Set the type of the selected record
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
                                        <Button variant='outlined' onClick={() => handleOpenDialog(record._id, record.nic, record.type)}>Add Report</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddReportDialog open={openDialog} onClose={handleCloseDialog} recordId={selectedRecordId} nic={recordNic} type={recordType} />
            </Stack>
        </div>
    );
}

export default LabRequestsPage;
