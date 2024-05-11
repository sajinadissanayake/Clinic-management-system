import React, { useState } from 'react';

import { Stack, Select, MenuItem, Button, FormControl, InputLabel, Typography, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';

import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import Rightbar from '../../components/Rightbar';



function AllUsers() {


  return (
    <div>
       <Navbar pageTitle=" Users" />
       <Layout>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <AdminLeftbar/>
        <PageBody>






       
        </PageBody>
    <Rightbar/>
      </Stack></Layout>
    </div>
  );
}

export default AllUsers;
