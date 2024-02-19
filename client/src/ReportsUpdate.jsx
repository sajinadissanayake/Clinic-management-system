import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Stack } from '@mui/material';
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import PageBody from "../components/PageBody";
import Navbar from "../components/Navbar";

function ReportsUpdate() {
    const { id } = useParams(); // Get the report ID from the URL params
    const [reportData, setReportData] = useState({});
    const [nic, setNic] = useState(""); // Ensure it's initialized with an empty string
    const [patientReport, setPatientReport] = useState(null); // New state for patient image
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch report data from the server
        axios.get(`http://localhost:3001/getReports/${id}`)
            .then(response => {
                setReportData(response.data);
                setNic(response.data.nic || ""); // Ensure nic is initialized or set it to an empty string
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching report:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nic', nic);
        formData.append('patientReport', patientReport);

        axios.put(`http://localhost:3001/updateReport/${id}`, formData)
            .then(result => {
                console.log(result);
                navigate('/ReportsView');
            })
            .catch(err => console.log(err));
    };

    if (loading) {
        return <CircularProgress />; // Handle case when report data is still being fetched
    }

    return (
        <div>




<Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar/>
            <PageBody>
            <Typography variant="h3">Update Reports</Typography>
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
                    <label htmlFor="report">Patient report</label>
                    <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
            </PageBody>
            <Rightbar/>
            </Stack>
        </div>
    );
}

export default ReportsUpdate;
