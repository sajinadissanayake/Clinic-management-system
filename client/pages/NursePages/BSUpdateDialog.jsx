import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function BSUpdateDialog({ open, onClose, recordId }) {
  const [recordData, setRecordData] = useState({
    nic: '',
    rbs: '',
    type: '',
    Recorddate: '', // Initialize with an empty string
    specialNotes: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && recordId) {
      axios.get(`/api/bloodsugars/${recordId}`)
        .then(response => {
          setRecordData(response.data);
        })
        .catch(error => {
          console.error('Error fetching record:', error);
          setError(error.message || 'Failed to fetch record data');
        });
    }
  }, [open, recordId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecordData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    axios.put(`/api/bloodsugars/${recordId}`, recordData)
      .then(response => {
        console.log('Record updated successfully:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error updating record:', error);
        setError(error.message || 'Failed to update record');
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Blood Sugar Record</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          label="NIC"
          name="nic"
          value={recordData.nic || ''} // Ensure the value is never undefined
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="RBS"
          name="rbs"
          value={recordData.rbs || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          name="type"
          value={recordData.type || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BSUpdateDialog;
