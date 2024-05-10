import React, { useState } from 'react';
import { Stack, Select, MenuItem, Button, FormControl, InputLabel, Typography, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';
import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';



function Feedbacks() {
  


  return (
    <div>
       <Navbar pageTitle=" Users" />
       <Layout>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <AdminLeftbar/>
        <PageBody>






       
        </PageBody>
    <Announcements/>
      </Stack></Layout>
    </div>
  );
}

export default Feedbacks;
