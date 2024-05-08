import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

function RequestDisplay({ open, onClose, patientNIC }) {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (open) {
            axios.get(`http://localhost:3001/getRecordRequests/${patientNIC}`)
                .then(result => {
                    setRequests(result.data);
                })
                .catch(err => console.log(err));
        }
    }, [open, patientNIC]);

    // Function to handle clicking the "Add" button
    const handleAddButtonClick = (requestType) => {
        // Redirect based on the request type
        // You can replace '/addPage' with your actual routes
        switch (requestType) {
            case 'checkup':
                window.location.href = `/medicals/${patientNIC}`; // Corrected template literal
                break;
            case 'blood sugar':
                window.location.href = `/bstable/${patientNIC}`; // Example redirection
                break;
            case 'blood pressure':
                    window.location.href = `/bpressure/${patientNIC}`; // Example redirection
                    break;
            case 'lipid profile':
                        window.location.href = `/lipid/${patientNIC}`; // Example redirection
                        break;
            // Add more cases as needed
            default:
                console.log('Invalid request type');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Record Requests</DialogTitle>
            <DialogContent>
                {requests.length === 0 ? (
                    <p>No Requests... </p>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type </TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Requested Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map(request => (
                                <TableRow key={request._id}>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell>{new Date(request.requestedDate).toLocaleString()}</TableCell>
                                    {/* Use a Link component for navigation */}
                                    <TableCell>
                                        <Button variant='contained' onClick={() => handleAddButtonClick(request.type)}>Add</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RequestDisplay;
