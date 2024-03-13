import React from 'react';
import GaugeChart from 'react-gauge-chart';

const GradientGaugeChart = () => {
  // Define your gauge data
  const gaugeData = 0.7; // This value should be between 0 and 1

  // Define gradient colors for the gauge
  const gradientColors = [
    '#FF5F6D', // Red
    '#FFC371', // Yellow
    '#3AC9D6', // Blue
  ];

  return (
    <div style={{ width: '300px', margin: 'auto' }}>
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
        hideText={false}
      />
    </div>
  );
};

export default GradientGaugeChart;
