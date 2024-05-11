import React, { useState } from 'react';

import { Stack, Select, MenuItem, Button, FormControl, InputLabel, Typography, TextField } from '@mui/material';
import Navbar from '../../components/Navbar';

import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import Rightbar from '../../components/Rightbar';



function AllUsers() {

  useEffect(() => {
    axios.get('http://localhost:3001/getStaff')
        .then(result => {
            setUsers(result.data);
            setLoading(false); // Set loading to false when data is fetched
        })
        .catch(err => {
            setError(err); // Set error state if request fails
            setLoading(false); // Set loading to false on error
        });
}, []);
  


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
