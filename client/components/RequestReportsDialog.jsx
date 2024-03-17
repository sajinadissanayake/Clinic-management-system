import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

function RequestReportsDialog({ open, onClose,patientNIC }) {



    
    const nic = patientNIC;
    const [type, setType] = useState('');
    const status =  "pending";

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddReportRequest", { nic, type,status})
            .then(result => {
                console.log(result);
                onClose()
            })
            .catch(err => console.log(err));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Request Reports</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="type"
                    label="Enter your request message"
                    fullWidth
                    multiline
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit Request</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RequestReportsDialog;
