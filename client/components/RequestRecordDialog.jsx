// RequestRecordDialog.js

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function RequestRecordDialog({ open, onClose }) {
    const [reason, setReason] = useState('');

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleRequest = () => {
        // Handle the request action here
        // For example, you can send the reason for the request to the server
        // and close the dialog
        console.log('Requested record for reason:', reason);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Request Record</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="reason"
                    label="Reason for request"
                    fullWidth
                    value={reason}
                    onChange={handleReasonChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleRequest} color="primary">
                    Request
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RequestRecordDialog;
