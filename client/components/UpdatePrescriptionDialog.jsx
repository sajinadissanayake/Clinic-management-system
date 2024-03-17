import React, { useState, useEffect } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Container, TextField, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UpdatePrescriptionDialog({ prescriptionId, handleClose }) {
    const [prescription, setPrescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/getPrescription/${prescriptionId}`)
            .then(response => {
                setPrescription(response.data.prescription);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching prescription:', error));
    }, [prescriptionId]);

    const handleUpdate = () => {
        axios.put(`http://localhost:3001/updatePrescription/${prescriptionId}`, { prescription })
            .then(response => {
                console.log(response);
                handleClose();
            })
            .catch(error => console.error('Error updating prescription:', error));
    };

    return (
        <Dialog open={true} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Update Prescription
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <form onSubmit={handleUpdate} style={{ padding: '20px' }}>
                    <TextField
                        multiline
                        rows={6}
                        label="Update Prescription"
                        variant="outlined"
                        fullWidth
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </form>
            </Container>
        </Dialog>
    );
}

export default UpdatePrescriptionDialog;
