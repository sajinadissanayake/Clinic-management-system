import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Grid } from '@mui/material';
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Rightbar from '../../components/Rightbar';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this user!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3001/deletestaffuser/${id}`);
                // Filter out the deleted staff member from the list
                const updatedStaffList = staffs.filter(staff => staff._id !== id);
                setStaffList(updatedStaffList);

                Swal.fire(
                    'Deleted!',
                    'The user has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
            Swal.fire(
                'Error!',
                'An error occurred while deleting the user.',
                'error'
            );
        }
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
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStaffs.map(staff => (
                                    <TableRow key={staff._id}>
                                        <TableCell>{staff.nic}</TableCell>
                                        <TableCell>{staff.utype}</TableCell>
                                        <TableCell style={{ maxWidth: '700px' }}>{staff.email}</TableCell>
                                        <TableCell>
                                            <IconButton component={Link} to={`/edit/${staff._id}`} >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color='error' onClick={() => handleDelete(staff._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
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
