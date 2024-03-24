// AddReportDialog.jsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddReportDialog({ open, onClose, recordId, nic, type }) {
    const [patientReport, setPatientReport] = useState(null); // New state for patient image
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nic', nic); // Append the NIC of the record
        formData.append('type', type); // Append the type of the record
        formData.append('patientReport', patientReport); // Append the patient image file

        try {
            const response = await axios.post('http://localhost:3001/AddReports', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/reports');
        } catch (error) {
            console.error('Error uploading report:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <DialogTitle>Add Report</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <p>NIC: {nic}</p> {/* Display NIC as text */}
                        </Grid>
                        <Grid item xs={12}>
                            <p>Type: {type}</p> {/* Display type as text */}
                        </Grid>
                        <Grid item xs={12}>
                            <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Upload</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddReportDialog;
