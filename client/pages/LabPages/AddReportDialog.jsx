// AddReportDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddReportDialog({ open, onClose, selectedRecord }) {
    const [patientReport, setPatientReport] = useState(null); // New state for patient image
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRecord || !selectedRecord.nic || !selectedRecord.type) {
            console.error('Selected record is null or missing required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('nic', selectedRecord.nic); // Append the NIC of the record
        formData.append('type', selectedRecord.type); // Append the type of the record
        formData.append('patientReport', patientReport); // Append the patient image file

        try {
            const response = await axios.post('http://localhost:3001/AddReports', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);

            // Update the status of the report request to "added"
            await axios.put(`http://localhost:3001/updateReportRequest/${selectedRecord._id}`, { status: 'added' });

            navigate('/reports');
        } catch (error) {
            console.error('Error uploading report:', error);
        }
    };

    if (!selectedRecord) {
        // Handle the case where selectedRecord is null
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} sx={{borderRadius:8}}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <DialogTitle>Add Report</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <p>NIC: {selectedRecord.nic}</p> {/* Display NIC as text */}
                        </Grid>
                        <Grid item xs={12}>
                            <p>Type: {selectedRecord.type}</p> {/* Display type as text */}
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
