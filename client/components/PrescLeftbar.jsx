import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Dialog, AppBar, Toolbar, IconButton, Slide, List, ListItemButton, ListItemText, Divider, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PrescLeftbar({ patientNIC }) {
    const [open, setOpen] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [lastPrescription, setLastPrescription] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/getPrescriptions/${patientNIC}`)
            .then(response => {
                setPrescriptions(response.data);
                if (response.data.length > 0) {
                    setLastPrescription(response.data[response.data.length - 1]);
                }
            })
            .catch(error => console.error('Error fetching prescriptions:', error));
    }, [patientNIC]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            {lastPrescription && (
                <Card sx={{ marginBottom: 2 }}>
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
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box p={2}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Prescription</TableCell>
                                    <TableCell> Date</TableCell>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Dialog>
        </div>
    );
}

export default PrescLeftbar;
