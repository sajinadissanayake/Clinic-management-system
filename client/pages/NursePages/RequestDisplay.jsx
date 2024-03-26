import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map(request => (
                                <TableRow key={request._id}>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell>{new Date(request.requestedDate).toLocaleString()}</TableCell>
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
