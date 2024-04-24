import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function LipidAdd() {

    const [nic, setNic] = useState('');
    const [total, setTotal] = useState('');
    const [hdl, setHdl] = useState('');
    const [ldl, setLdl] = useState('');
    const [tcd, setTcd] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to control when to show the alert
  
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/Addlp", { nic, total, hdl, ldl, tcd })
            .then(result => {
                console.log(result);
                setShowAlert(true); // Set showAlert to true to display the alert
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

    const handleAlertClose = () => {
        setShowAlert(false); // Close the alert
        window.location.reload(); // Reload the page after closing the alert
    };

    return (
        <div>
            <form>
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
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
            {showAlert && (
                <SweetAlert
                    icon="success"
                    title="Lipid Profile Added"
                    text="Lipid Profile data has been successfully added."
                    onConfirm={handleAlertClose}
                />
            )}
        </div>
    );
}

export default LipidAdd;
