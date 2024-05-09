import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Breadcrumbs, Stack, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Announcements from '../../components/Announcements';
import axios from 'axios';
import PageBody from '../../components/PageBody';
import Sidebar from '../../components/Sidebar';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import DoctorSidebar from '../../components/DoctorSidebar';
import Footer from  '../../components/Footer';
import Layout from '../../components/Layout';

function PatientSelect() {
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
            <Navbar pageTitle="Select The Patient" />
           <Layout>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <DoctorSidebar />
                <PageBody>
                    <TextField
                        label="Search by name or NIC"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        fullWidth
                    />
                    <div style={{ height: '76vh', overflowY: 'auto' }}>
                        <Table>
                            <TableHead>
                               
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user._id}>
                                      <TableCell >
                                            
                                            {/* Conditional rendering for Avatar based on gender */}
                                            <Avatar alt={user.name} src={user.gender === 'male' ? maleAvatar : femaleAvatar} />
                                        </TableCell>
                                        <TableCell>{user.nic}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                        <Link style={{ textDecoration: 'none' }} to={`/prescpatient/${user._id}`}>  <Button variant='outlined' style={{ marginLeft: '10px' }}>
                                                Next
                                            </Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PageBody>
                <Announcements />
            </Stack>

            </Layout>
          
           
        </div>
    );
}

export default PatientSelect;
