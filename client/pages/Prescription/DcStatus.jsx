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
import BarChart1 from '../Admin/BarChart1';
import Rightbar from '../../components/Rightbar';

function DcStatus() {
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
                           
                        <Typography variant='h5'>Patinet Attendance</Typography>
                           <BarChart1/>
                        </PageBody>
                    </Grid>
                    <Grid item>
                      <Rightbar/>
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

export default DcStatus;
