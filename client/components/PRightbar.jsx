import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import MEDialog from './Dialogs/MEDialog';

function PRightbar({ patientNIC }) {
  const [latestMedicalExamination, setLatestMedicalExamination] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  useEffect(() => {
    // Fetch medical examination records for the patient NIC
    axios.get(`http://localhost:3001/getMedicalExaminations/${patientNIC}`)
      .then(response => {
        // Sort the medical examinations by date in descending order
        const sortedExams = response.data.sort((a, b) => new Date(b.ExaminationDate) - new Date(a.ExaminationDate));
        // Set the latest medical examination
        setLatestMedicalExamination(sortedExams[0]);
      })
      .catch(error => console.error('Error fetching medical examinations:', error));
  }, [patientNIC]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Box bgcolor="" borderRadius={4} marginTop={1} flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Medical Examinations
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Latest Record
            </Typography>
          
            {latestMedicalExamination && (
              <div>
                <Typography variant="body2" color="text.secondary">
                  Age: {latestMedicalExamination.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weight: {latestMedicalExamination.weight}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  BMI: {latestMedicalExamination.bmi}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ideal body weight: {latestMedicalExamination.ibw}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Waist circumference: {latestMedicalExamination.wc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Blood pressure: {latestMedicalExamination.bpressure}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Oral examination: {latestMedicalExamination.oexam}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(latestMedicalExamination.ExaminationDate).toLocaleDateString()}
                </Typography>

                <CardActions>
                  <Button size="small" color="primary" onClick={handleClickOpen}>
                    More
                  </Button>
                </CardActions>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Render the dialog */}
        <MEDialog open={openDialog} handleClose={handleClose} patientNIC={patientNIC} />
      </Box>
    </div>
  );
}

export default PRightbar;
