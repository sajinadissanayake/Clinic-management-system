import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

function MEDialog({ open, handleClose, patientNIC }) {
  const theme = useTheme();
  const [medicalExaminations, setMedicalExaminations] = useState([]);

  useEffect(() => {
    // Fetch medical examination records for the patient NIC
    axios.get(`http://localhost:3001/getMedicalExaminations/${patientNIC}`)
      .then(response => setMedicalExaminations(response.data))
      .catch(error => console.error('Error fetching medical examinations:', error));
  }, [patientNIC]);

  return (
    <Dialog onClose={handleClose} open={open} fullScreen>
      <DialogTitle sx={{ backgroundColor: theme.palette.background.bg2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Medical Examinations
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.background.bgw,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="medical examinations table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">BMI</TableCell>
                <TableCell align="right">Ideal Body Weight</TableCell>
                <TableCell align="right">Waist Circumference</TableCell>
                <TableCell align="right">Blood Pressure</TableCell>
                <TableCell align="right">Oral Examination</TableCell>
                <TableCell align="right">Special Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalExaminations.map((exam, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {new Date(exam.ExaminationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{exam.age}</TableCell>
                  <TableCell align="right">{exam.weight} kg</TableCell>
                  <TableCell align="right">{exam.bmi}</TableCell>
                  <TableCell align="right">{exam.ibw} kg</TableCell>
                  <TableCell align="right">{exam.wc} cm</TableCell>
                  <TableCell align="right">{exam.bpressure} mmHg</TableCell>
                  <TableCell align="right">{exam.oexam}</TableCell>
                  <TableCell align="right">{exam.specialNotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MEDialog;
