import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';

function Pprescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nic = useParams();
    // Extracting the NIC from the route parameters
    useEffect(() => {
        console.log('NIC:', nic); // Log the NIC value
        axios.get(`http://localhost:3001/getPrescriptions/${nic}`)
            .then(response => {
                console.log('Response:', response); // Log the response
                setPrescriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching prescriptions:', error);
                setError(error);
                setLoading(false);
            });
    }, [nic]);
    
    // Fetch prescriptions whenever NIC changes

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MMMM dd, yyyy');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Prescription</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prescriptions.map(prescription => (
                            <TableRow key={prescription._id}>
                                <TableCell>
                                    {prescription.prescription.split('\n').map((line, index) => (
                                        <Typography key={index} variant="body1">{line}</Typography>
                                    ))}
                                </TableCell>
                                <TableCell>{formatDate(prescription.PostedDate)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Pprescriptions;
