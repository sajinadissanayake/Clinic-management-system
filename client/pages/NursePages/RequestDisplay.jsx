import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom'; 
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

  
    const handleAddButtonClick = (requestType, requestId) => {
      
        switch (requestType) {
            case 'checkup':
                window.location.href = `/medicals/${patientNIC}`; 
                break;
            case 'blood sugar':
                window.location.href = `/bstable/${patientNIC}`; 
                break;
            case 'blood pressure':
                window.location.href = `/bpressure/${patientNIC}`; 
                break;
            case 'lipid profile':
                window.location.href = `/nlipid/${patientNIC}`;
                break;
          
            default:
                console.log('Invalid request type');
        }

        // After redirection, delete the record request
        deleteRecordRequest(requestId);
    };

    // Function to delete the record request
    const deleteRecordRequest = (requestId) => {
        axios.delete(`http://localhost:3001/deleteRecordRequest/${requestId}`)
            .then(response => {
                console.log(response.data); // Log success message
                // After successful deletion, update the requests state
                setRequests(requests.filter(request => request._id !== requestId));
            })
            .catch(error => {
                console.error('Error deleting record request:', error);
            });
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
                                        <Button variant='contained' onClick={() => handleAddButtonClick(request.type, request._id)}>Add</Button>
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
