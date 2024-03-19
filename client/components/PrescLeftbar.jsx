import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Dialog, AppBar, Toolbar, IconButton, Slide, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdatePrescriptionDialog from './UpdatePrescriptionDialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PrescLeftbar({ patientNIC }) {
    const [open, setOpen] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [lastPrescription, setLastPrescription] = useState(null);
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
    const [pendingReportRequests, setPendingReportRequests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/getPrescriptions/${patientNIC}`)
            .then(response => {
                setPrescriptions(response.data);
                if (response.data.length > 0) {
                    setLastPrescription(response.data[response.data.length - 1]);
                }
            })
            .catch(error => console.error('Error fetching prescriptions:', error));

        axios.get(`http://localhost:3001/getReportRequests/${patientNIC}`)
            .then(response => {
                setPendingReportRequests(response.data.filter(request => request.status === "pending"));
            })
            .catch(error => console.error('Error fetching pending report requests:', error));
    }, [patientNIC]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateClick = (prescriptionId) => {
        setSelectedPrescriptionId(prescriptionId);
        setOpen(true);
    };

    const handleDelete = (prescriptionId) => {
        axios.delete(`http://localhost:3001/deletePrescription/${prescriptionId}`)
            .then(response => {
                console.log(response);
                // Refresh prescription list after deletion
                axios.get(`http://localhost:3001/getPrescriptions/${patientNIC}`)
                    .then(response => {
                        setPrescriptions(response.data);
                    })
                    .catch(error => console.error('Error fetching prescriptions:', error));
            })
            .catch(error => console.error('Error deleting prescription:', error));
    };

    const handleCancelReportRequest = (requestId) => {
        // Implement cancellation of report request
        console.log('Cancel report request with ID:', requestId);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    

    return (
        <div>
            <Link to="/pselect" style={{ textDecoration: 'none' }}>
            <Card sx={{ marginBottom: 2 , marginTop:3, borderRadius:6}}>
            <CardContent sx={{ display: 'flex' }}>
            <Button  startIcon={<ArrowBackIcon />}>
                Back
            </Button>
        </CardContent>
            </Card></Link>

            {lastPrescription && (
                <Card sx={{ marginBottom: 2 , borderRadius:6}}>
                    <CardContent>
                        <Typography variant="h6" marginBottom={2}>Last Prescription</Typography>
                        {lastPrescription.prescription.split('\n').map((line, index) => (
                            <Typography key={index} variant="body1">{line}</Typography>
                        ))}
                        <Typography variant="body2">Posted Date: {formatDate(lastPrescription.PostedDate)}</Typography>
                        <Button size="small" color="primary" onClick={handleClickOpen}>More</Button>
                    </CardContent>
                </Card>
            )}

            {pendingReportRequests.length > 0 && (
                <Card sx={{ marginBottom: 2 , borderRadius:6}}>
                    <CardContent>
                        <Typography variant="h6" marginBottom={2}>Pending Report Requests</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Report Type</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pendingReportRequests.map(request => (
                                        <TableRow key={request._id}>
                                            <TableCell>{request.type}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small" // Set size to small
                                                    onClick={() => handleCancelReportRequest(request._id)}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            All Prescriptions
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box p={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Prescription</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prescriptions.map(prescription => (
                                    <TableRow key={prescription._id}>
                                        <TableCell>
                                            {prescription.prescription.split('\n').map((line, index) => (
                                                <Typography key={index} variant="body1">{line}</Typography>
                                            ))}
                                        </TableCell>
                                        <TableCell>{formatDate(prescription.PostedDate)}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant='outlined' 
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handleUpdateClick(prescription._id)}
                                                disabled={prescription.status !== "pending"} // Disable if status is not pending
                                            >
                                                Update
                                            </Button>
                                            <Button 
                                                variant='outlined' 
                                                color="error"
                                                onClick={() => handleDelete(prescription._id)}
                                                disabled={prescription.status !== "pending"} // Disable if status is not pending
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Dialog>
            {selectedPrescriptionId && (
                <UpdatePrescriptionDialog
                    prescriptionId={selectedPrescriptionId}
                    handleClose={() => setSelectedPrescriptionId(null)}
                />
            )}
        </div>
    );
}

export default PrescLeftbar;
