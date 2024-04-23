import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import Pnav from './Pnav';
import Layout from '../../components/Layout';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import login from '../images/login.json'
import Lottie from 'lottie-react'; // Import Lottie
import Homediv1 from './Homediv1';
import BloodSugarChart from '../../components/BloodSugarChart';
import Pdiv2 from './Pdiv2';
import wave from '../images/wave.json';






function PatientHome() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null); // State for handling errors

    useEffect(() => {
        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [nic]);

    // Display loading message while fetching patient data
    if (!patient && !error) {
        return <div>Loading...</div>;
    }

    // Display error message if there's an error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Layout>
                <Pnav />
                <Grid container spacing={2}>
    {/* Grid for patient info */}
    <Grid item xs={12} md={6}>
        <Card style={{ borderRadius: 10 , marginTop:10}}>
            <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" gutterBottom style={{ marginRight: '10px' }}>
        Welcome Back {patient.name}...........
    </Typography>
    <Lottie animationData={wave} style={{ width: 50, height: 50 }} />
</div>

                {/* Your content goes here */}
               
            </CardContent>
        </Card>
        
        <Card style={{ borderRadius: 10, marginTop: 10 }}>
            <CardContent>
                <Typography variant="body1" gutterBottom>
                   Next clinic date : 01/02/2024
                </Typography>
                
                
            </CardContent>
        </Card>
        <Homediv1/>
        <BloodSugarChart nic={patient.nic} />

      
        
    </Grid>
    
    {/* Grid for image */}
    <Grid item xs={12} md={6} >
      
      

        
        <Pdiv2/>
        
    </Grid>
    {/* Add more Grid items as needed */}
    
</Grid>

            </Layout>
        </div>
    );
}

export default PatientHome;
