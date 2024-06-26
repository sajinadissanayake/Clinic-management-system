import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, InputAdornment, Stack, } from '@mui/material';
import { Search, Description as DescriptionIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Navbar from '../components/Navbar';
import Rightbar from '../components/Rightbar';

function ReportsView() {
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
      <Navbar/>
       <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar/>
            <PageBody>
            <h3>Reports View</h3>
     
      <TextField
        label="Search by NIC"
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
              <TableCell>NIC</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Patient Report</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map(report => (
              <TableRow key={report._id}>
                <TableCell>{report.nic}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>
                  <IconButton href={`http://localhost:3001/reports/${report.patientReport}`} target="_blank" rel="noopener noreferrer">
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{new Date(report.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/updateReport/${report._id}`}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(report._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </PageBody>
            <Rightbar/>
            </Stack>
    </div>
  );
}

export default ReportsView;
