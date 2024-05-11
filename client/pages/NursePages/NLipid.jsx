import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Stack, Card, CardContent, Avatar, Typography, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import LabSidebar from '../../components/LabSidebar';
import PageBody from '../../components/PageBody';

import Layout from '../../components/Layout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';

import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import MedicalMenu from './MedicalMenu';
import NurseLeftbar from './NurseLeftbar';


function NLipid() {
    const { nic } = useParams();
    const [lpData, setLpData] = useState(null);
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close

    useEffect(() => {
        axios.get(`http://localhost:3001/getLp/${nic}`)
            .then(response => {
                // Sort the data in descending order based on record date
                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                setLpData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching LP data:', error);
            });

        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [nic]);

    const deleteRecord = (id) => {
        // Display a confirmation prompt before deleting the record
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You are about to delete this record. This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms, proceed with deletion
                axios.delete(`http://localhost:3001/deletelp/${id}`)
                    .then(response => {
                        console.log(response);
                        // Display a success message using a toast or alert
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Record deleted successfully',
                        });
                        // After successful deletion, fetch updated LP data
                        axios.get(`http://localhost:3001/getLp/${nic}`)
                            .then(response => {
                                // Sort the data again after deletion
                                const sortedData = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
                                setLpData(sortedData);
                            })
                            .catch(error => {
                                console.error('Error fetching LP data:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error deleting record:', error);
                        // Display an error message using a toast or alert
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to delete record',
                        });
                    });
            }
        });
    };


    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const [total, setTotal] = useState('');
    const [hdl, setHdl] = useState('');
    const [ldl, setLdl] = useState('');
    const [tcd, setTcd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/Addlp", { nic, total, hdl, ldl, tcd })
            .then(result => {
                console.log(result);
                
                console.log('Lipid Profile Added successfully');
                
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
    
                console.error('Error occurred while adding Lipid Profile:', err);
              
            });
    };


    return (
        <div>
            <Navbar pageTitle="Lipid Profile" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <NurseLeftbar />
                    <PageBody>
                        <h2>Lipid Profile Data</h2>

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
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>LDL</TableCell>
                                    <TableCell>HDL</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>TCD</TableCell>
                                    <TableCell>Record Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lpData && lpData.map(lp => (
                                    <TableRow key={lp._id}>
                                        <TableCell>{lp.ldl} mg/dL</TableCell>
                                        <TableCell>{lp.hdl} mg/dL</TableCell>
                                        <TableCell>{lp.total} mg/dL</TableCell>
                                        <TableCell>{lp.tcd} mg/dL</TableCell>
                                        <TableCell>{new Date(lp.Recorddate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <IconButton color='error' onClick={() => deleteRecord(lp._id)}>
                                                <DeleteIcon />
                                            </IconButton>

                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </PageBody>
                    <MedicalMenu pageName="Lipid" nic={nic} />
                </Stack>
            </Layout>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Lipid Profile Data</DialogTitle>
                <DialogContent>
                    <form>

                        <TextField
                            id="total"
                            label="Total"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            type="number"
                        />
                        <TextField
                            id="hdl"
                            label="HDL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={hdl}
                            onChange={(e) => setHdl(e.target.value)}
                            type="number"
                        />
                        <TextField
                            id="ldl"
                            label="LDL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={ldl}
                            onChange={(e) => setLdl(e.target.value)}
                            type="number"
                        />
                        <TextField
                            id="triglyceride"
                            label="Triglyceride"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={tcd}
                            onChange={(e) => setTcd(e.target.value)}
                            type="number"
                        />

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NLipid;
