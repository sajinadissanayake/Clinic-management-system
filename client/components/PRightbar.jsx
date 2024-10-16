import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import MEDialog from './Dialogs/MEDialog';
import BSchartdialog from './Dialogs/BSchartdialog';

import RandomGauge from './bloodmeter/RandomGuage';
import FastingBloodSugarGauge from './bloodmeter/FastingBloodSugarGauge';

function PRightbar({ patientNIC }) {
  const [latestMedicalExamination, setLatestMedicalExamination] = useState(null);
  const [bloodSugarLevels, setBloodSugarLevels] = useState({ fasting: null, random: null });
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [openDialog1, setOpenDialog1] = useState(false); // State for second dialog visibility
  const [lpData, setLpData] = useState(null); // State for lipid profile data
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
        // Set the last fasting and random blood sugar records
        const lastFastingRecord = response.data.filter(record => record.type === 'fasting').pop();
        const lastRandomRecord = response.data.filter(record => record.type === 'random').pop();
       
        setBloodSugarLevels({ fasting: lastFastingRecord, random: lastRandomRecord });
      })
      .catch(error => console.error('Error fetching blood sugar levels:', error));

      axios.get(`http://localhost:3001/getLp/${patientNIC}`)
      .then(response => {
        // Assuming the data structure for lipid profile is similar to other data
        const sortedLpData = response.data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setLpData(sortedLpData[0]); // Set the latest lipid profile data
      })
      .catch(error => console.error('Error fetching LP data:', error));
  }, [patientNIC]);
  
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpen1 = () => {
    setOpenDialog1(true); // Open the second dialog
  };

  const handleClose1 = () => {
    setOpenDialog1(false); // Close the second dialog
  };

  return (
    <div>
      <Box bgcolor="" borderRadius={4} marginTop={1} flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Card sx={{ maxWidth: 345, borderRadius:6}}  p={3}>
          <CardContent>
           
            <Typography gutterBottom variant="body2" component="div">
            Blood Sugar Latest Records
            </Typography>
            {/* Display fasting blood sugar record */}
            {bloodSugarLevels.fasting && (
              <div><Typography variant="body2" color="text.secondary">
              Fasting Blood Sugar: {bloodSugarLevels.fasting.rbs}
            </Typography>
           
            <FastingBloodSugarGauge value={bloodSugarLevels.fasting.rbs}/>
            </div>
              
              


            )}
            
            {/* Display random blood sugar record */}
            {bloodSugarLevels.random && (
               <div>
               <Typography variant="body2" color="text.secondary">
                 Random Blood Sugar: {bloodSugarLevels.random.rbs}
               </Typography>
              
               <RandomGauge value={bloodSugarLevels.random.rbs}/>

             </div>
            )}
            <Typography variant="body2" color="text.secondary">
                 lipid profile: 78mg/dL
               </Typography>
               <Typography variant="body2" color="text.secondary">
                blood pressure: 67mmHg
               </Typography>
             
          </CardContent>
        </Card>
       
        
        <MEDialog open={openDialog} handleClose={handleClose} patientNIC={patientNIC} />
        {/* Pass openDialog1 state and handleClose1 function to the second dialog */}
        <BSchartdialog open={openDialog1} handleClose={handleClose1} patientNIC={patientNIC}/>
       
        
      </Box>
      {/* Display blood sugar levels */}
      <Box bgcolor="" borderRadius={4}  flex={2}  sx={{ display: { xs: "none", sm: "block" } }}>

         
      <Card sx={{ maxWidth: 345, borderRadius:6 }}>
          <CardContent>
         
            <Typography gutterBottom variant="body1" component="div">
              Latest Checkup
            </Typography>
          
            {latestMedicalExamination && (
              <div>
                  <Typography variant="body2" color="text.secondary">
                  Age: {latestMedicalExamination.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weight: {latestMedicalExamination.weight} kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  BMI: {latestMedicalExamination.bmi}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ideal body weight: {latestMedicalExamination.ibw} kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Waist circumference: {latestMedicalExamination.wc} cm
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Blood pressure: {latestMedicalExamination.bpressure}mmHg
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
     </Box>
        
    </div>
  );
}

export default PRightbar;
