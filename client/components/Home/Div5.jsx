import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'; // Import social media icons
import nutri from  './images/nutri.jpeg';
import Diet from './images/diet.jpeg';
import Smoke from  './images/smoke.jpg';
import Mental from './images/mental.jpg';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert library

function Div4() {
    const whiteBoxStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background with transparency
        backdropFilter: 'blur(10px)', // Blur effect
        height: '1020px',
        padding: '20px',
        zIndex: 2, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        color: 'white'
    };
    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '80px', // Adjust spacing between cards
    };

    const contactFormStyle = {
        width: '40%',
        marginRight: '20px', // Adjust spacing between form and contact details
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
        color: 'white', // White font color
        borderRadius: '15px', 
    };
    

    const contactDetailsStyle = {
        width: '40%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
        color: 'white', // White font color
        borderRadius: '15px',
    };

    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment,setComment] = useState('');
 
    
   
   

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/Addfeed", { name, email, comment })
            .then(result => {
                console.log(result);
                // Display SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Your Feedback submitted  Successfully',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Refresh the page
                    window.location.reload();
                });
            })
            .catch(err => {
                console.log(err);
                // Display error SweetAlert if necessary
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            });
    };

    return (
        <div style={whiteBoxStyle}>
            <Typography variant='h2' align='center'>Contact Us</Typography>
            <div style={cardContainerStyle}>
                {/* Feedback Form */}
                
                <Card style={contactFormStyle}>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Feedback Form
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Comment"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="secondary" fullWidth>
                            Send
                        </Button>
                    </CardContent></form>
                </Card>

                {/* Contact Details */}
                <Card style={contactDetailsStyle}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Contact Details
                        </Typography><br/>
                        <Typography variant="body1" gutterBottom>
                            Phone: 011-2211199
                        </Typography><br/>
                        <Typography variant="body1" gutterBottom>
                            Email: clinichealthylifestyle@gmail.com
                        </Typography><br/>
                        <Typography variant="body1" gutterBottom>
                            Address: Main Street, Base hospital,Colombo 
                        </Typography><br/><br/><br/><br/>
                        {/* Social Media Icons */}
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Facebook />
                            </Grid>
                            <Grid item>
                                <Twitter />
                            </Grid>
                            <Grid item>
                                <Instagram />
                            </Grid>
                            <Grid item>
                                <LinkedIn />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Div4;
