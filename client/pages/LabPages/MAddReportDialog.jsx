import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MAddReportDialog({ open, onClose, nic }) {
  const [type, setType] = useState('');
  const [patientReport, setPatientReport] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nic', nic);
    formData.append('type', type);
    formData.append('patientReport', patientReport);

    axios.post('http://localhost:3001/AddReports', formData)
      .then(result => {
        console.log(result);
        onClose(); 
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Report</DialogTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogContent>
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Type"
                  placeholder="enter type"
                  variant="outlined"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MAddReportDialog;
