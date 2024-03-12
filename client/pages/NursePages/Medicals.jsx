import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Stack, Card, CardContent, Typography, TableRow, TableCell, TableHead, Grid, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Rightbar from '../../components/Rightbar';
import Sidebar from '../../components/Sidebar';
import PageBody from '../../components/PageBody';

function Medicals() {
  const { nic } = useParams();
  const [medicalExaminations, setMedicalExaminations] = useState([]);

  useEffect(() => {
    // Fetch medical examination records for the patient NIC
    axios
      .get(`http://localhost:3001/getMedicalExaminations/${nic}`)
      .then((response) => setMedicalExaminations(response.data))
      .catch((error) =>
        console.error('Error fetching medical examinations:', error)
      );
  }, [nic]);

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <PageBody>
          <Grid container spacing={2}>
            {medicalExaminations.map((exam, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>{new Date(exam.ExaminationDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableRow hover>
                      <TableCell>Age</TableCell>
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
                       <Link style={{ textDecoration: 'none' }} to={`/updatepatient/${exam._id}`}>Update</Link></Button>
                        </TableCell>
                      <TableCell>

                      <Button variant='outlined' color='error' onClick={() => handleDelete(exam._id)}>
                        Delete
                      </Button>
                      </TableCell>
                    </TableRow>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </PageBody>
        <Rightbar />
      </Stack>
    </div>
  );
}

export default Medicals;
