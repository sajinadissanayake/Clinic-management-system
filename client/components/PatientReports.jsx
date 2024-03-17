import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Search, Description as DescriptionIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Assuming you're using Material-UI icons
import { Link } from 'react-router-dom';
function PatientReports() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch reports data from the server
    axios.get('http://localhost:3001/getReports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteReport/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReports = reports.filter(report =>
    report.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Reports View</h3>
      <TextField
        label="Search by type"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Type</TableCell>
              <TableCell>Patient Report</TableCell>
              <TableCell>Date</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map(report => (
              <TableRow key={report._id}>
               
                <TableCell>{report.type}</TableCell>
                <TableCell>
                  <IconButton href={`http://localhost:3001/reports/${report.patientReport}`} target="_blank" rel="noopener noreferrer">
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{new Date(report.uploadDate).toLocaleDateString()}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PatientReports;
