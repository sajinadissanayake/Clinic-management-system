import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AllPrescriptions() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.nic && user.nic.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <Navbar />
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}> {/* Adjusted height to consider the height of the Navbar */}
                <Card sx={{ borderRadius: 6, width: '100%', maxWidth: 600 }}> {/* Added width and maxWidth for responsiveness */}
                    <CardContent>
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


                        <div style={{ maxHeight: '60vh', overflowY: 'auto', marginTop: '20px' }}> {/* Adjusted maxHeight */}
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>NIC</TableCell>
                                        <TableCell>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                <Avatar alt={user.name} src={user.avatarUrl} />
                                            </TableCell>
                                            <TableCell>{user.nic}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>
                                                <Button variant='outlined' style={{ marginLeft: '10px' }}>
                                                <Link style={{ textDecoration: 'none' }} to={`/prescriptions/${user.nic}`}>Next</Link>

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
        </div>
    );
}

export default AllPrescriptions;
