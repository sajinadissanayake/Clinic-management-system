import { Typography } from '@mui/material';
import React from 'react';
import GaugeChart from 'react-gauge-chart';

const FastingBloodSugarGauge = ({ value }) => {
  const fastingBloodSugar = parseFloat(value); // Convert to number

  // Define gradient colors based on fasting blood sugar levels for diabetic patients over 40 years old
  let gradientColors;
  let status;
  if (fastingBloodSugar < 70) {
    // Hypoglycemia
    gradientColors = ['#FFD700']; // Yellow
    status = 'Hypoglycemia';
  } else if (fastingBloodSugar >= 70 && fastingBloodSugar <= 100) {
    // Normal
    gradientColors = ['#32CD32']; // Green
    status = 'Normal';
  } else if (fastingBloodSugar > 100 && fastingBloodSugar <= 130) {
    // Prediabetes
    gradientColors = ['#FFA500']; // Orange
    status = 'Prediabetes';
  } else if (fastingBloodSugar > 130 && fastingBloodSugar <= 180) {
    // Controlled diabetes
    gradientColors = ['#FF6347']; // Red
    status = 'Controlled Diabetes';
  } else {
    // Uncontrolled diabetes
    gradientColors = ['#8B0000']; // Dark Red
    status = 'Uncontrolled Diabetes';
  }

  const formatTextValue = () => {
    return `${fastingBloodSugar} mg/dL`; // Format blood sugar value
  };

  return (
    <div>
      <div style={{ width: '200px', margin: 'auto' }}>
        <GaugeChart
          id="fasting-blood-sugar-gauge"
          nrOfLevels={30}
          colors={gradientColors}
          arcWidth={0.3}
          percent={fastingBloodSugar / 180} // Assuming max value for gauge is 180 mg/dL
          textColor="#000"
          needleColor="#000"
          needleBaseColor="#000"
          animate={true}
          hideText={false}
          formatTextValue={formatTextValue}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography variant='caption'>{status}</Typography>
      </div>
    </div>
  );
};

export default FastingBloodSugarGauge;
