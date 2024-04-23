import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';



function Homediv1() {
    
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const patientNIC = loggedInUser.nic;
    const [latestMedicalExamination, setLatestMedicalExamination] = useState(null);
    const [latestbp, setLatestbp] = useState(null);
    const [bloodSugarLevels, setBloodSugarLevels] = useState({ fasting: null, random: null });


    
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
  
   
    axios.get(`http://localhost:3001/getBloodSugarData/${patientNIC}`)
      .then(response => {
        // Set the last fasting and random blood sugar records
        const lastFastingRecord = response.data.filter(record => record.type === 'fasting').pop();
        const lastRandomRecord = response.data.filter(record => record.type === 'random').pop();
        // Set the blood sugar levels
        setBloodSugarLevels({ fasting: lastFastingRecord, random: lastRandomRecord });
      })
      .catch(error => console.error('Error fetching blood sugar levels:', error));

      axios.get(`http://localhost:3001/getBloodpressure/${patientNIC}`)
      .then(response => {
        
        const sortedbp = response.data.sort((a, b) => new Date(b.Recorddate) - new Date(a.Recorddate));
     
        setLatestbp(sortedbp[0]);
      })
      .catch(error => console.error('Error fetching blood presssure:', error));

    
  }, [patientNIC]);
  


  return (

    <div>
        <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
                <Card style={{ borderRadius: 10, marginTop: 10 }}>
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
              Blood Sugar 
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
             
            </Typography>
            {/* Display fasting blood sugar record */}
            {bloodSugarLevels.fasting && (
              <div><Typography variant="body1" color="text.primary">
              Fasting - {bloodSugarLevels.fasting.rbs}
            </Typography>
           
            </div>
              
              


            )}
            
            {/* Display random blood sugar record */}
            {bloodSugarLevels.random && (
               <div>
               <Typography variant="body1 " color="text.primary">
                 Random  -{bloodSugarLevels.random.rbs}
               </Typography>
              

             </div>
            )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} md={4}>
           
                <Card style={{ borderRadius: 10, marginTop: 10 }}>
                {latestbp && (   <CardContent>
                    
            <Typography gutterBottom variant="h6" component="div">
              Blood Pressure
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              Systolic- Diastolic
            </Typography>
            
            {latestbp.systolic}-{latestbp.diastolic}
            

       
                    </CardContent> )}
                </Card>
            </Grid>
            <Grid item xs={6} md={4}>
                <Card style={{ borderRadius: 10, marginTop: 10 }}>
                    <CardContent> 
                    <Typography gutterBottom variant="h6" component="div">
              Lipid Profile
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              ------
            </Typography>






                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        
      
    </div>
  )
}

export default Homediv1
