import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../../components/Navbar';
import Rightbar from '../../components/Rightbar';
import Sidebar from '../../components/Sidebar';
import PageBody from '../../components/PageBody';
import NurseLeftbar from './NurseLeftbar';

function Medicals() {
  const { nic } = useParams();
  const [medicalExaminations, setMedicalExaminations] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch medical examination records for the patient NIC
    axios
      .get(`http://localhost:3001/getMedicalExaminations/${nic}`)
      .then((response) => {
        setMedicalExaminations(response.data);
        // Extract unique years from the medical examination records
        const uniqueYears = Array.from(new Set(response.data.map((exam) => new Date(exam.ExaminationDate).getFullYear())));
        setYears(uniqueYears);
      })
      .catch((error) => console.error('Error fetching medical examinations:', error));
  }, [nic]);

  // Filter medical examination records by selected year
  const filteredExaminations = selectedYear ? medicalExaminations.filter((exam) => new Date(exam.ExaminationDate).getFullYear() === selectedYear) : medicalExaminations;

  // Calculate the number of columns each grid item should take
  const gridItemSize = filteredExaminations.length >= 3 ? 4 : 12 / filteredExaminations.length;

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <NurseLeftbar />
        
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Dropdown to filter by year */}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <FormControl fullWidth sx={{ maxWidth: 200 }}>
                  <InputLabel id="year-select-label">Filter by Year</InputLabel>
                  <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    sx={{ width: '100%', minWidth: 120 }}
                  >
                    <MenuItem value="">All Records</MenuItem>
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Link style={{ textDecoration: 'none' }} to={`/MEform/${nic}`} >
                <Fab color="primary" aria-label="add" size="small">
                  
                    <AddIcon />
                  
                </Fab></Link>
              </Stack>
            </Grid>
            
            {filteredExaminations.map((exam, index) => (
              <Grid item xs={12} sm={gridItemSize} md={gridItemSize} key={index}>
                <Card style={{ backgroundColor: '#f3f3f3', marginBottom: '20px' }}>
                  <CardContent>
                    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>{new Date(exam.ExaminationDate).toLocaleDateString()}</TableCell>
                          </TableRow>
                        </TableHead>
                        <tbody>
                          <TableRow hover>
                            <TableCell style={{ fontSize: '14px' }}>Age</TableCell>
                            <TableCell>{exam.age}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Weight</TableCell>
                            <TableCell>{exam.weight}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>BMI</TableCell>
                            <TableCell>{exam.bmi}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Ideal Body Weight</TableCell>
                            <TableCell>{exam.ibw}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Waist Circumference</TableCell>
                            <TableCell>{exam.wc}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Blood Pressure</TableCell>
                            <TableCell>{exam.bpressure}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Oral Examination</TableCell>
                            <TableCell>{exam.oexam}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>Special Notes</TableCell>
                            <TableCell>{exam.specialNotes}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell>
                              <Button variant='outlined' style={{ marginRight: '10px' }}>
                                <Link style={{ textDecoration: 'none' }} to={`/medicalupdat/${exam._id}`}>Update</Link>
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button variant='outlined' color='error' onClick={() => handleDelete(exam._id)}>
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        </tbody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        
        
      </Stack>
    </div>
  );
}

export default Medicals;