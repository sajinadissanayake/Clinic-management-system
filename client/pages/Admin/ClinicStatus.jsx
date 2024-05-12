
import BarChart1 from './BarChart1';
import React, { useEffect, useState } from 'react';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import AdminLeftbar from './AdminLeftbar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';
import Layout from '../../components/Layout';
import axios from 'axios';
import Rightbar from '../../components/Rightbar';


function ClinicStatus() {
   

  return (
    <div>
        <Navbar pageTitle="Clinic Status" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <AdminLeftbar />
                    <PageBody>
                        <Typography variant='h5'>Patinet Attendance</Typography>
                        <BarChart1 />
                        </PageBody>
                    <Rightbar/>
                </Stack>
            </Layout>
      
    </div>
  )
}

export default ClinicStatus


