import React from 'react';
import GaugeChart from 'react-gauge-chart';
import { useParams } from 'react-router-dom';

const RandomGauge = (props) => {
  const g = parseFloat(props.value); // Convert to number
  const gaugeData = g / 300; // Assuming max value for gauge is 300 mg/dL

  // Define gradient colors based on blood sugar levels
  let gradientColors;
  if (g <= 70) {
    // Low blood sugar (Hypoglycemia)
    gradientColors = ['#FFD700']; // Yellow
  } else if (g > 70 && g <= 100) {
    // Normal blood sugar range
    gradientColors = ['#32CD32']; // Green
  } else if (g > 100 && g <= 126) {
    // Prediabetes range
    gradientColors = ['#FFA500']; // Orange
  } else {
    // High blood sugar (Hyperglycemia)
    gradientColors = ['#FF6347']; // Red
  }

  const formatTextValue = () => {
    return `${g} mg/dL`; // Format blood sugar value
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
        hideText={false}
        formatTextValue={formatTextValue}
      />
    </div>
  );
};

export default RandomGauge;
