import React from 'react';
import { Typography, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'; // Import social media icons
import nutri from  './images/nutri.jpeg';
import Diet from './images/diet.jpeg';
import Smoke from  './images/smoke.jpg';
import Mental from './images/mental.jpg';

function Div4() {
    const whiteBoxStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background with transparency
        backdropFilter: 'blur(10px)', // Blur effect
        height: '1020px',
        padding: '20px',
        zIndex: 2, // Ensure the white box appears above the overlay
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
        borderRadius: '15px', // Adding border radius
    };
    

    const contactDetailsStyle = {
        width: '40%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
        color: 'white', // White font color
        borderRadius: '15px',
    };

    return (
        <div style={whiteBoxStyle}>
            <Typography variant='h2' align='center'>Contact Us</Typography>
            <div style={cardContainerStyle}>
                {/* Feedback Form */}
                <Card style={contactFormStyle}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Feedback Form
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <Button variant="contained" color="secondary" fullWidth>
                            Send
                        </Button>
                    </CardContent>
                </Card>

                {/* Contact Details */}
                <Card style={contactDetailsStyle}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Contact Details
                        </Typography><br/>
                        <Typography variant="body1" gutterBottom>
                            Phone: +123456789
                        </Typography><br/>
                        <Typography variant="body1" gutterBottom>
                            Email: example@example.com
                        </Typography><br/>
                        <Typography variant="body1" gutterBottom>
                            Address: 123 Example St, City, Country
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
