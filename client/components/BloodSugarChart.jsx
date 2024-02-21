import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BloodSugarChart = ({ nic }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!nic) {
          return; // Exit if NIC is not provided
        }

        // Fetch data from your backend using the provided NIC
        const response = await fetch(`http://localhost:3001/getBloodSugarData/${nic}`);
        const jsonData = await response.json();

        // Process the data
        const labels = jsonData.map(entry => entry.Recorddate);
        const rbsData = jsonData.map(entry => entry.rbs);
        const typeData = jsonData.map(entry => entry.type);

        // Set up the chart data
        setData({
          labels: labels,
          datasets: [
            {
              label: 'RBS',
              data: rbsData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Type',
              data: typeData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching blood sugar data:', error);
      }
    };

    fetchData();
  }, [nic]);

  return (
    <div>
      {nic && (
        <>
          <h2>Blood Sugar Levels for NIC: {nic}</h2>
          <Bar data={data} />
        </>
      )}
    </div>
  );
};

export default BloodSugarChart;
