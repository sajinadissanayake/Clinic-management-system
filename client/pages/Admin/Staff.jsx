import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Grid } from '@mui/material';
import { Stack, Select, MenuItem, Button, FormControl, InputLabel, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Rightbar from '../../components/Rightbar';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

function Staff() {
    const [staffs, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchEmail, setSearchEmail] = useState('');
    const [filteredStaffs, setFilteredStaffs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getStaff")
            .then(response => {
                setStaffList(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchEmail.trim() === '') {
            setFilteredStaffs(staffs);
        } else {
            setFilteredStaffs(
                staffs.filter(staff =>
                    staff.email.toLowerCase().includes(searchEmail.toLowerCase())
                )
            );
        }
    }, [searchEmail, staffs]);

    const handleSearchChange = (event) => {
        setSearchEmail(event.target.value);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Navbar pageTitle="Users" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <AdminLeftbar />
                    <PageBody>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={6}>
                                <TextField
                                    label="Search by Email"
                                    variant="outlined"
                                    value={searchEmail}
                                    onChange={handleSearchChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'right' }}>
                                <IconButton component={Link} to="/register" >
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>NIC</TableCell>
                                    <TableCell>User Type</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStaffs.map(staff => (
                                    <TableRow key={staff._id}>
                                        <TableCell>{staff.nic}</TableCell>
                                        <TableCell>{staff.utype}</TableCell>
                                        <TableCell style={{ maxWidth: '700px' }}>{staff.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </PageBody>
                    <Rightbar />
                </Stack>
            </Layout>
        </div>
    );
}

export default Staff;
