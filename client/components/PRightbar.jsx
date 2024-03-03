import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import MEDialog from './Dialogs/MEDialog';

function PRightbar({ patientNIC }) {
  const [latestMedicalExamination, setLatestMedicalExamination] = useState(null);
  const [bloodSugarLevels, setBloodSugarLevels] = useState({ fasting: null, random: null });
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

    // Fetch blood sugar levels for the patient NIC
    axios.get(`http://localhost:3001/getBloodSugarData/${patientNIC}`)
      .then(response => {
        // Filter blood sugar levels into fasting and random
        const fastingRecord = response.data.find(record => record.type === 'fasting');
        const randomRecord = response.data.find(record => record.type === 'random');
        // Set the blood sugar levels
        setBloodSugarLevels({ fasting: fastingRecord, random: randomRecord });
      })
      .catch(error => console.error('Error fetching blood sugar levels:', error));
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
        
        <MEDialog open={openDialog} handleClose={handleClose} patientNIC={patientNIC} />
      </Box>
      {/* Display blood sugar levels */}
      <Box bgcolor="" borderRadius={4} marginTop={1} flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Card sx={{ maxWidth: 345 }}  p={3}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Blood Sugar Levels 
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
             Latest Record
            </Typography>
            {/* Display fasting blood sugar record */}
            {bloodSugarLevels.fasting && (
              <Typography variant="body2" color="text.secondary">
                Fasting Blood Sugar: {bloodSugarLevels.fasting.rbs}
              </Typography>
            )}
            
            {/* Display random blood sugar record */}
            {bloodSugarLevels.random && (
              <Typography variant="body2" color="text.secondary">
                Random Blood Sugar: {bloodSugarLevels.random.rbs}
              </Typography>
            )}
             <Button size="small" color="primary" onClick={handleClickOpen}>
                    More
                  </Button>
          </CardContent>
        </Card></Box>
        
    </div>
  );
}

export default PRightbar;
