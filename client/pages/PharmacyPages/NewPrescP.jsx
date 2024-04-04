import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Typography } from '@mui/material';
import moment from 'moment';
import Navbar from '../../components/Navbar';
import PharmacyDash from '../PharmacyDash';
import PharmacySidebar from '../../components/PharmacySidebar';
import Layout from '../../components/Layout';

function NewPrescP() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getPrescriptions')
      .then(response => {
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });
  }, []);

  useEffect(() => {
    // Filter prescriptions based on search query and status
    setFilteredPrescriptions(prescriptions.filter(prescription => prescription.status === 'pending' && prescription.nic.includes(searchQuery)));
  }, [searchQuery, prescriptions]);

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD'); // Format the date as desired
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleMarkAsIssued = () => {
    // Update the status of the selected prescription to "issued"
    axios.put(`http://localhost:3001/updatePrescriptionStatus/${selectedPrescription._id}`, { status: 'issued' })
      .then(response => {
        console.log('Prescription status updated successfully');
        // Refresh the list of prescriptions
        axios.get('http://localhost:3001/getPrescriptions')
          .then(response => {
            setPrescriptions(response.data);
          })
          .catch(error => {
            console.error('Error fetching prescriptions:', error);
          });
      })
      .catch(error => {
        console.error('Error updating prescription status:', error);
      });
    // Close the dialog
    setOpenDialog(false);
  };

  return (
    <div>
       <Navbar pageTitle="Prescriptions" />
            <Layout>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PharmacySidebar />
        <div style={{ margin: 'auto', textAlign: 'center' }}>
         
          <Typography variant='h4'> New prescriptions</Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
            <TextField
              label="Search by NIC"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Typography variant="body1">{`Total Pending Prescriptions: ${filteredPrescriptions.length}`}</Typography>
          </Stack>
          
          <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
  <TableContainer component={Paper} style={{ minWidth: '1000px', margin: 'auto', borderRadius: 6 }}>
    <Table size="large">
      <TableHead>
        <TableRow>
          <TableCell>NIC</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Posted Date</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      
      <TableBody>
        {filteredPrescriptions.map(prescription => (
          <TableRow key={prescription._id}>
            <TableCell>{prescription.nic}</TableCell>
            <TableCell>{prescription.status}</TableCell>
            <TableCell>{formatDate(prescription.PostedDate)}</TableCell>
            <TableCell>
              <Button variant='outlined' onClick={() => handleViewPrescription(prescription)}>View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>

        </div>

        <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ borderRadius: 8 }}>
          <DialogTitle>Prescription Details Of Patient NIC: {selectedPrescription?.nic}</DialogTitle>
          <DialogContent>
            {selectedPrescription?.prescription.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </DialogContent>

          <DialogActions>
            <Button variant='outlined' onClick={handleCloseDialog}>Close</Button>
            <Button variant='contained' onClick={handleMarkAsIssued}>Mark as Issued</Button>
          </DialogActions>
        </Dialog>

      </Stack></Layout>
    </div>
  );
}

export default NewPrescP;
