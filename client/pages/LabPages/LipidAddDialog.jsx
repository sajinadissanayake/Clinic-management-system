import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function LipidAddDialog({ open, handleCloseDialog}) { // Pass 'handleCloseDialog' as a prop
    const [nic, setNic] = useState('');
    const [total, setTotal] = useState('');
    const [hdl, setHdl] = useState('');
    const [ldl, setLdl] = useState('');
    const [tcd, setTcd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/Addlp", { nic, total, hdl, ldl, tcd })
            .then(result => {
                console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Lipid Profile Added',
                    text: 'Lipid Profile data has been successfully added.',
                }).then(() => {
                    handleCloseDialog(); // Call handleCloseDialog function to close the dialog
                    window.location.reload();
                });
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                });
            });
    };

    return (
        <Dialog open={open} onClose={handleCloseDialog}>{/* Pass open state and handleCloseDialog as props */}
            <DialogTitle>Add Lipid Profile</DialogTitle>
            <DialogContent>
                <TextField
                    id="nic"
                    label="NIC"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                />
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button> {/* Use handleCloseDialog */}
                <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LipidAddDialog;
