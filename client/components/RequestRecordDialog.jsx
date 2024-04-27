import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';

function RequestRecordDialog({ open, onClose, patientNIC }) {
    const nic = patientNIC;
    const [type, setType] = useState('');
    const [status, setStatus] = useState('pending'); // Move status to state
    const [selectedType, setSelectedType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddRecordRequest", { nic, type: selectedType, status })
            .then(result => {
                console.log(result);
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Request Records</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="record-type"
                        name="record-type"
                        value={selectedType}
                        onChange={handleTypeChange}
                    >
                        <FormControlLabel value="blood sugar" control={<Radio />} label="Blood Sugar" />
                        <FormControlLabel value="blood pressure" control={<Radio />} label="Blood Pressure" />
                        <FormControlLabel value="lipid profile" control={<Radio />} label="Lipid Profile" />
                        <FormControlLabel value="checkup" control={<Radio />} label="Checkup" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Submit Request</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RequestRecordDialog;
