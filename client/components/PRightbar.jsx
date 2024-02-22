import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';

function PRightbar({ patientNIC }) {
  const [medicalExaminations, setMedicalExaminations] = useState([]);

  useEffect(() => {
    // Fetch medical examination records for the patient NIC
    axios.get(`http://localhost:3001/getMedicalExaminations/${patientNIC}`)
      .then(response => setMedicalExaminations(response.data))
      .catch(error => console.error('Error fetching medical examinations:', error));
  }, [patientNIC]);

  return (
    <div>
      <Box bgcolor="" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <h1>PRightbar</h1>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Medical Examinations
            </Typography>
            {/* Render medical examination records */}
            {medicalExaminations.map((exam, index) => (
              <div key={index}>
                <Typography variant="body2" color="text.secondary">
                  Age: {exam.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weight: {exam.weight}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  BMI: {exam.bmi}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ideal body weight: {exam.ibw}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Waist circumference: {exam.wc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bood pressure: {exam.bpressure}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Oral examination {exam.oexam}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Date: {new Date(exam.ExaminationDate).toLocaleDateString()}
                </Typography>

                <CardActions>
                <Button size="small" color="primary">
                   More
                </Button>
                </CardActions>
               
              </div>
            ))}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default PRightbar;
