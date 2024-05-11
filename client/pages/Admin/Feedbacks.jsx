import React, { useEffect, useState } from 'react';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import axios from 'axios';
import Rightbar from '../../components/Rightbar';

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3001/getfeed")
            .then(response => {
                // Sort feedbacks by date in descending order
                const sortedFeedbacks = response.data.sort((a, b) => {
                    return new Date(b.Date) - new Date(a.Date);
                });
                setFeedbacks(sortedFeedbacks);
            })
            .catch(error => {
                console.error('Error fetching feedbacks:', error);
            });
    }, []);

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Change date format as per your requirement
    };

    // Function to handle search
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    // Filter feedbacks based on searchValue
    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div>
            <Navbar pageTitle="Feedbacks" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <AdminLeftbar />
                    <PageBody>
                        {/* Search input */}
                        <TextField
                            label="Search by name"
                            variant="outlined"
                            value={searchValue}
                            onChange={handleSearch}
                            fullWidth
                            style={{ marginBottom: '20px' }}
                        />
                        {/* Feedbacks table */}
                        <div style={{ overflowX: 'auto', height: '400px' }}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Comment</TableCell>
                                            <TableCell>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredFeedbacks.map(feedback => (
                                            <TableRow key={feedback._id}>
                                                <TableCell>{feedback.name}</TableCell>
                                                <TableCell>{feedback.email}</TableCell>
                                                <TableCell style={{ maxWidth: '700px' }}>{feedback.comment}</TableCell>
                                                <TableCell>{formatDate(feedback.Date)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </PageBody>
                    <Rightbar/>
                </Stack>
            </Layout>
        </div>
    );
}

export default Feedbacks;
