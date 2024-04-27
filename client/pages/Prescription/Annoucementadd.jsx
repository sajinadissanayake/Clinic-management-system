import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

function AnnouncementAdd({ handleClose }) { // Accept handleClose prop
    const doctor = "doctor1";
    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddAnnoucement", { announcement, title, doctor })
            .then(result => {
                console.log(result);
                // Display SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Announcement Added!',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Close the dialog using the prop
                handleClose();
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                // Display SweetAlert for error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.'
                });
            });
    };

    return (
        <div>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Announcement"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default AnnouncementAdd;
