import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar, Card, CardContent, Typography, Container, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import PharmacySidebar from '../../components/PharmacySidebar';
import { Announcement } from '@mui/icons-material';
import Announcements from '../../components/Announcements';

function AllPrescriptions() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // State to manage loading indicator
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => {
                setUsers(result.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                setError(err); // Set error state if request fails
                setLoading(false); // Set loading to false on error
            });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.nic && user.nic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <p>Loading...</p>; // Display loading indicator
    if (error) return <p>Error: {error.message}</p>; // Display error message if request fails

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <PharmacySidebar/>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                <Card sx={{ borderRadius: 6, width: '100%', maxWidth: 600 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Select Patient</Typography> {/* Add this line */}
                        <TextField
                            label="Search by name or NIC"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                            fullWidth
                            mb={2}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '6px',
                                },
                            }}
                        />

                        <div style={{ maxHeight: '60vh', overflowY: 'auto', marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>NIC</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                {/* Conditional rendering for Avatar based on gender */}
                                                <Avatar alt={user.name} src={user.gender === 'male' ? maleAvatar : femaleAvatar} />
                                            </TableCell>
                                            <TableCell>{user.nic}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>
                                                <Button variant='outlined' component={Link} to={`/Pprescriptions/${user.nic}`} style={{ marginLeft: '10px' }}>
                                                    Next
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </Container>
            <Announcements/>
            </Stack>
        </div>
    );
}

export default AllPrescriptions;
