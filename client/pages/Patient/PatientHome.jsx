import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests
import Pnav from './Pnav';
import Layout from '../../components/Layout';
import { Card, CardContent, Typography, Grid } from '@mui/material';

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
                <Grid >
                    <Grid item xs={12} sm={6} md={4} style={{ marginTop:10}}>
                        <Card style={{borderRadius:10}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Hello {patient.name}
                                </Typography>
                                {/* Your content goes here */}
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Add more Grid items as needed */}
                    <Grid item xs={12} sm={6} md={4} style={{ marginTop:10}}>
                        <Card style={{borderRadius:10}}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                   your next clinic date 
                             
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                  
                                    01/2/2024
                                </Typography>
                                {/* Your content goes here */}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Layout>
        </div>
    );
}

export default PatientHome;
