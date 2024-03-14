import React from 'react';
import GaugeChart from 'react-gauge-chart';
import { useParams } from 'react-router-dom';

const GradientGaugeChart = (props) => {
  // Define your gauge data
  const g = parseFloat(props.value); // Convert to number
  const gaugeData = g / 100;

  // Define gradient colors for the gauge
  const gradientColors = [
    '#FF5F6D', // Red
    '#FFC371', // Yellow
    '#3AC9D6', // Blue
  ];

  // Custom function to format text value without percentage mark
  const formatTextValue = () => {
    return `${g}`; // Display the value without percentage mark
  };

  return (
    <div style={{ width: '200px', margin: 'auto' }}>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={30}
        colors={gradientColors}
        arcWidth={0.3}
        percent={gaugeData}
        textColor="#000"
        needleColor="#000"
        needleBaseColor="#000"
        animate={true}
        hideText={false} // Show text value
        formatTextValue={formatTextValue} // Custom text formatting function
      />
    </div>
  );
};

export default GradientGaugeChart;
