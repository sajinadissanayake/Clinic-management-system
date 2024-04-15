import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Config from '../../config/config';
import Navbar from '../../components/Navbar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, RadioGroup, Radio, FormControlLabel, Button, Toolbar, Typography, IconButton } from '@mui/material';
import NurseLeftbar from './NurseLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BsAddDialog from './BsAddDialog';
import Swal from 'sweetalert2'; // Import SweetAlert

function BsTable() {
    const { nic } = useParams();
    const [bloodSugarData, setBloodSugarData] = useState([]);
    const [filterType, setFilterType] = useState('all'); // 'all' by default
    const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close

    useEffect(() => {
        // Fetch blood sugar data based on NIC
        axios.get(`${Config().getBaseServerUrl}/getBloodSugarData/${nic}`)
            .then(response => {
                // Sort the data array in descending order based on the record date
                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                setBloodSugarData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching blood sugar data:', error);
            });
    }, [nic]);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const deleteRecord = (id) => {
        // Show SweetAlert confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this record. This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, delete the record
                axios.delete(`${Config().getBaseServerUrl}/deletebs/${id}`)
                    .then(response => {
                        // Remove the deleted record from bloodSugarData state
                        setBloodSugarData(bloodSugarData.filter(entry => entry._id !== id));
                        // Show success message
                        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting record:', error);
                        // Show error message
                        Swal.fire('Error!', 'An error occurred while deleting the record.', 'error');
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // If cancelled, do nothing
                Swal.fire('Cancelled', 'The record deletion has been cancelled.', 'info');
            }
        });
    };

    const filteredData = filterType === 'all' ? bloodSugarData : bloodSugarData.filter(entry => entry.type === filterType);

    return (
        <div>
            <Navbar pageTitle="Blood Sugar " />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <NurseLeftbar />
                    <PageBody>
                        
                        <Typography variant='h5'>Blood Sugar Data for patient NIC: {nic}</Typography>
                        <RadioGroup row aria-label="filter" name="filter" value={filterType} onChange={handleFilterChange}>
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="random" control={<Radio />} label="Random" />
                            <FormControlLabel value="fasting" control={<Radio />} label="Fasting" />
                        </RadioGroup>
                        <TableContainer component={Paper} style={{ backgroundColor: '#f3f3f3', marginBottom: '20px' }}>
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Blood Sugar Records
                                </Typography>
                                <IconButton onClick={() => setOpenDialog(true)}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Toolbar>
                            <Table>
                                <TableHead>
                                    <TableRow hover>
                                        <TableCell>Record Date</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Value</TableCell>
                                        <TableCell>Special Notes</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.map((entry, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell>{new Date(entry.Recorddate).toLocaleDateString()}</TableCell>
                                            <TableCell>{entry.type}</TableCell>
                                            <TableCell>{entry.rbs}</TableCell>
                                            <TableCell>{entry.specialNotes}</TableCell>
                                            <TableCell>
                                                <Button variant='outlined' color='error' onClick={() => deleteRecord(entry._id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </PageBody>
                    <Announcements />
                    {/* Pass the 'nic' prop to BsAddDialog */}
                    <BsAddDialog open={openDialog} onClose={() => setOpenDialog(false)} nic={nic} />
                </Stack>
            </Layout>
        </div>
    );
}

export default BsTable;
