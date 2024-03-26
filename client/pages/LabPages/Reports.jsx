import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Stack, Card, CardContent, Box, Typography, InputAdornment, TextField } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../../components/Navbar';
import LabSidebar from '../../components/LabSidebar';
import PageBody from  '../../components/PageBody';
import Announcements from '../../components/Announcements';
import MAddReportDialog from './MAddReportDialog';

function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
  const { nic } = useParams();
  
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  useEffect(() => {
    axios.get(`http://localhost:3001/getReports/nic/${nic}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setReports(response.data);
          setFilteredReports(response.data);
        } else {
          console.error('Invalid data format received from server:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, [nic]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report =>
        report.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  }, [searchTerm, reports]);

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <LabSidebar />
        <Card sx={{ borderRadius: 8 }}>
          <CardContent>
            <h2>Reports for NIC: {nic}</h2>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <TextField
                label="Search by Report Type"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Total Reports: {filteredReports.length}
                </Typography>
                <IconButton color="primary" onClick={handleOpenDialog}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
            </Box>
            <TableContainer component={Paper} style={{ maxHeight: '600px'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: 150 }}>Report Type</TableCell>
                    <TableCell style={{ minWidth: 150 }}>Upload Date</TableCell>
                    <TableCell style={{ minWidth: 150 }}>PDF Report</TableCell>
                    <TableCell style={{ minWidth: 100 }}>Edit</TableCell>
                    <TableCell style={{ minWidth: 100 }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {Array.isArray(filteredReports) && filteredReports.map(report => (
                    <TableRow key={report._id}>
                      <TableCell>
                        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{report.type}</Typography>
                      </TableCell>
                      <TableCell>{new Date(report.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton
                          href={`http://localhost:3001/reports/${report.patientReport}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SummarizeIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton component={Link} to={`/updateReport/${report._id}`}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredReports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>No reports found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Announcements />
      </Stack>
      <MAddReportDialog open={dialogOpen} onClose={handleCloseDialog} nic={nic}      />
    </div>
  );
}

export default Reports;

