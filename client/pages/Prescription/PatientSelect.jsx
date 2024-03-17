import React from 'react';
import Navbar from '../../components/Navbar';
import { Box, Breadcrumbs, Stack, Typography,TextField,Table,TableHead,TableBody, TableRow, TableCell,Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Announcements from '../../components/Announcements';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PageBody from '../../components/PageBody';
import Sidebar from '../../components/Sidebar';

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
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar/>
                <PageBody>
                    <TextField
                        label="Search by name or NIC"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div style={{ height: '70vh', overflowY: 'auto' }}>
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
                                                <Link style={{ textDecoration: 'none' }} to={`/prescpatient/${user._id}`}>Next</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PageBody>
                <Announcements />
            </Stack>
        </div>
    );
}

export default PatientSelect;
