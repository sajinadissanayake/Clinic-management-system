import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function ReportsUpdateDialog({ open, onClose, reportId }) {
    const [reportData, setReportData] = useState({});
    const [nic, setNic] = useState("");
    const [type, setType] = useState("");
    const [patientReport, setPatientReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open && reportId) {
            axios.get(`http://localhost:3001/getReports/${reportId}`)
                .then(response => {
                    setReportData(response.data);
                    setNic(response.data.nic || "");
                    setType(response.data.type || "");
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching report:', error);
                });
        }
    }, [open, reportId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nic', nic);
        formData.append('type', type);
        formData.append('patientReport', patientReport);
        axios.put(`http://localhost:3001/updateReport/${reportId}`, formData)
            .then(result => {
                console.log(result);
                onClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Report Updated Successfully',
                    showConfirmButton: true, // Show the "OK" button
                    timer: 1500
                }).then(() => {
                    window.location.reload(); // Refresh the page after clicking "OK"
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    showConfirmButton: true // Show the "OK" button
                });
            });
    };
    
    const handleCancel = () => {
        onClose();
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Update Report</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <TextField
                            label="NIC"
                            placeholder="Enter NIC"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Type"
                            placeholder="Enter Report Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div>
                        <label htmlFor="report">Patient report</label>
                        <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
                    </div>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ReportsUpdateDialog;
