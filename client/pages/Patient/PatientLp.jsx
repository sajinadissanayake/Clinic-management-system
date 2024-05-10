import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Stack, Card, CardContent, Avatar, Typography, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, TableContainer, Paper } from '@mui/material';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


import AddCircleIcon from '@mui/icons-material/AddCircle';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';

import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

import Layout from '../../components/Layout';

import Pnav from './Pnav';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function PatientLp() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;
    const [lpData, setLpData] = useState(null);
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close

    useEffect(() => {
        axios.get(`http://localhost:3001/getLp/${nic}`)
            .then(response => {
                setLpData(response.data);
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
                                setLpData(response.data);
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
            // Handle success here, for example, log success message to console
            console.log('Lipid Profile Added successfully');
            // After successful submission, you might want to update the state or perform any other necessary actions
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
            // Handle error here, for example, log error message to console
            console.error('Error occurred while adding Lipid Profile:', err);
            // You can update state to display an error message on the UI if needed
          });
      };
      

    return (
        <div>
            
            <Pnav/>
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between"flex={4}>
                   
                <Box  flex={4} p={2}  boxShadow={3} borderRadius={3} >
                    

                       
                        <Card style={{ borderRadius: 30, marginTop: 20 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                <Button component={Link} to="/patienthome">
                                    <ArrowBackIcon sx={{ fontSize: 40, color: 'background.bg2' }} /></Button>
                                    <div style={{ textAlign: 'center', flexGrow: 1 }}>
                                        <Typography variant="h5">Lipid Profile</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                        <TableContainer component={Paper} style={{ marginBottom: '20px',marginTop: 20 }}>
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
                                        <TableCell>{lp.ldl}mg/dL</TableCell>
                                        <TableCell>{lp.hdl}mg/dL</TableCell>
                                        <TableCell>{lp.total}mg/dL</TableCell>
                                        <TableCell>{lp.tcd}mg/dL</TableCell>
                                        <TableCell>{new Date(lp.Recorddate).toLocaleDateString()}</TableCell>
                                        

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table></TableContainer>
              </Box>
                   
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

export default PatientLp;
