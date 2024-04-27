import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, IconButton, Dialog, DialogTitle, DialogContent, Card, CardContent, Typography, Paper } from '@mui/material';
import { MdAddCircle, MdDelete } from 'react-icons/md'; // Assuming you're using Material Design icons

import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import DoctorSidebar from '../../components/DoctorSidebar';
import PageBody from '../../components/PageBody';
import DoctorR from '../../components/DoctorR';
import AnnouncementAdd from './Annoucementadd';

function Announcements() {
    const [anns, setAnn] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/getAnnouncement')
            .then(result => {
                console.log(result.data); // Log the fetched data to check its structure
                setAnn(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteAnnouncement = (id) => {
        // Logic to delete the announcement with the given id
        // This can be done using axios or any other method for sending delete requests to your backend
        console.log("Delete announcement with ID:", id);
    };

    return (
        <div>
            <Navbar pageTitle="Announcements" />
            <Layout>
                <Grid container justifyContent="space-between" spacing={2}>
                    <Grid item>
                        <DoctorSidebar />
                    </Grid>
                    <Grid item xs={8}> {/* Adjust xs value according to your layout */}
                        <PageBody>
                            <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}> {/* Adjust xs value according to your layout */}
                                        <Grid container justifyContent="flex-end">
                                            <IconButton
                                                color="primary"
                                                aria-label="add announcement"
                                                onClick={handleClickOpen}
                                                sx={{ fontSize: 32 }} // Adjust the size as per your requirement
                                            >
                                                <MdAddCircle />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {anns.map((ann) => (
                                        <Grid item xs={12} key={ann._id}> {/* Adjust xs value according to your layout */}
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        {ann.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {ann.announcement}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Doctor: {ann.doctor}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Date: {ann.Date}
                                                    </Typography>
                                                    <IconButton aria-label="delete" color='error' onClick={() => handleDeleteAnnouncement(ann._id)} style={{ marginLeft: 'auto' }}>
                                                        <MdDelete />
                                                    </IconButton>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid></Paper>
                        </PageBody>
                    </Grid>
                    <Grid item>
                        <DoctorR />
                    </Grid>
                </Grid>
            </Layout>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Announcement</DialogTitle>
                <DialogContent>
                    <AnnouncementAdd handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Announcements;
