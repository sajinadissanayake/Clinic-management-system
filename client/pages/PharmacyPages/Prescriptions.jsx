import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Container } from '@mui/material';

function Prescriptions() {
    const { nic } = useParams(); // Retrieve NIC from URL params
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        // Fetch prescriptions related to the patient using the NIC
        axios.get(`/getPrescriptionsByNIC/${nic}`)
            .then(result => setPrescriptions(result.data))
            .catch(err => console.log(err));
    }, [nic]);

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    Prescriptions
                </Typography>
                <List>
                    {prescriptions.map(prescription => (
                        <ListItem key={prescription._id}>
                            <ListItemText
                                primary={prescription.prescription}
                                secondary={`Posted Date: ${new Date(prescription.PostedDate).toLocaleDateString()}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    );
}

export default Prescriptions;
