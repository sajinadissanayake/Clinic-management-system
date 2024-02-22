import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment'; // Import moment.js for date formatting

const BloodSugarChart = ({ nic }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchData();
  }, [nic]);

  const fetchData = async () => {
    try {
      if (!nic) {
        return;
      }

      const response = await fetch(`http://localhost:3001/getBloodSugarData/${nic}`);
      const jsonData = await response.json();

      // Filter data for fasting and random types
      const fastingData = jsonData.filter(entry => entry.type === 'fasting');
      const randomData = jsonData.filter(entry => entry.type === 'random');

      // Extract labels and blood sugar levels for each type
      const fastingLabels = fastingData.map(entry => formatDate(entry.Recorddate));
      const randomLabels = randomData.map(entry => formatDate(entry.Recorddate));
      const fastingRbsData = fastingData.map(entry => entry.rbs);
      const randomRbsData = randomData.map(entry => entry.rbs);

      const data = {
        labels: fastingLabels.length > randomLabels.length ? fastingLabels : randomLabels, // Use the longer array for labels
        datasets: [
          {
            label: 'Fasting',
            data: fastingRbsData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Random',
            data: randomRbsData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      renderChart(data);
    } catch (error) {
      console.error('Error fetching blood sugar data:', error);
    }
  };

  const renderChart = (data) => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy existing chart instance
    }

    const ctx = document.getElementById('bloodSugarChart');
    if (ctx) {
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD'); // Format date as YYYY-MM-DD
  };

  return (
    <div>
      {nic && (
        <canvas id="bloodSugarChart"></canvas>
      )}
    </div>
  );
};

export default BloodSugarChart;
