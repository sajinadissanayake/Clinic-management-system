import React, { useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function MAddReportDialog({ open, onClose, nic }) {
  const [type, setType] = useState('');
  const [patientReport, setPatientReport] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setPatientReport(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = () => {
    setPatientReport(null);
  };

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
                <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', height:'300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p style={{ display: 'flex', alignItems: 'center', }}><CloudUploadIcon fontSize="large" htmlColor="primary" /> </p> :
                      <p style={{ display: 'flex', alignItems: 'center',  }}><CloudUploadIcon fontSize="large" htmlColor="primary" /> Drag and drop reports or click to browse the Reports</p>
                  }
                  {patientReport && (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <InsertDriveFileIcon />
                      <span>{patientReport.name}</span>
                      <Button variant="outlined" color="error" onClick={handleRemoveFile} style={{ marginLeft: '10px' }}>Remove</Button>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
          <Button onClick={onClose} variant="outlined" >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MAddReportDialog;
