import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Stack } from '@mui/material';
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import PageBody from "../components/PageBody";

function AddReports() {
    const [nic, setNic] = useState('');
    const [type, setType] = useState('');
    const [patientReport, setPatientReport] = useState(null); // New state for patient image
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nic', nic);
        formData.append('type', type);
        formData.append('patientReport', patientReport); // Append the patient image file

        axios.post('http://localhost:3001/AddReports', formData)
            .then(result => {
                console.log(result);
                navigate('/reports');
            })
            .catch(err => console.log(err));
    };

    return (
        


        <div>
             <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar/>
            <PageBody> <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Add Report</Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="NIC"
                            placeholder="Enter NIC"
                            variant="outlined"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Type"
                            placeholder="enter type"
                            variant="outlined"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
                    
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            upload
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        </PageBody>
            <Rightbar/>
            </Stack>
            
        </div>
       
    );
}

export default AddReports;
