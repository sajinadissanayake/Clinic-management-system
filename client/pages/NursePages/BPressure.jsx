import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, Card, CardContent, Avatar } from '@mui/material'; // Import Dialog components
import NurseLeftbar from './NurseLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';
import Config from '../../config/config';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import BPadd from './BPadd';
import Swal from 'sweetalert2';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import MedicalMenu from './MedicalMenu';

function BPressure() {
    const { nic } = useParams();
    const [bloodPressureData, setBloodPressureData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch blood pressure data based on NIC
        axios.get(`${Config().getBaseServerUrl}/getBloodpressure/${nic}`)
            .then(response => {
                // Sort the data array in descending order based on the record date
                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                setBloodPressureData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching blood pressure data:', error);
            });

        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [nic]);

    // Function to format date and time
    // Function to format date (without time)
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };


    // Function to handle opening the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteRecord = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed deletion, proceed with deletion
                axios.delete(`${Config().getBaseServerUrl}/deleteBloodpressure/${id}`)
                    .then(response => {
                        console.log('Record deleted successfully');
                        // Refresh blood pressure data
                        axios.get(`${Config().getBaseServerUrl}/getBloodpressure/${nic}`)
                            .then(response => {
                                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                                setBloodPressureData(sortedData);
                            })
                            .catch(error => {
                                console.error('Error fetching blood pressure data:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error deleting record:', error);
                    });
            }
        });
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Navbar pageTitle="Blood Pressure" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <NurseLeftbar />
                    <PageBody>
                        <Container>
                            <Card sx={{ borderRadius: 5, backgroundColor: 'background.bg1' }}>
                                <CardContent>
                                    <Avatar alt={patient ? patient.name : ''} src={patient && patient.gender === 'male' ? maleAvatar : femaleAvatar} />
                                    <Typography variant="h6">{patient ? patient.name : 'Loading...'}: {nic}</Typography>
                                </CardContent>
                            </Card>
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                                <IconButton onClick={handleOpenDialog}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Toolbar>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Adjust the maxHeight to your preference */}

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Systolic</TableCell>
                                                <TableCell>Diastolic</TableCell>
                                                <TableCell>Record Date</TableCell>
                                                <TableCell>Action</TableCell> {/* Add column for actions */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bloodPressureData.map((data) => (
                                                <TableRow key={data._id}>
                                                    <TableCell>{data.systolic}</TableCell>
                                                    <TableCell>{data.diastolic}</TableCell>
                                                    <TableCell>{formatDate(data.Recorddate)}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="error" // Set color to "error" for red color
                                                            onClick={() => handleDeleteRecord(data._id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Container>

                    </PageBody>
                    <MedicalMenu pageName="Blood Pressure" nic={nic} />

                </Stack>
            </Layout>

            {/* Dialog for adding blood pressure data */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Blood Pressure</DialogTitle>
                <DialogContent>
                    {/* Render your BPadd component here */}
                    <BPadd handleCloseDialog={handleCloseDialog} nic={nic} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default BPressure;
