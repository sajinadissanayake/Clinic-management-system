import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  
  { name: 'july', value: 111 },
  { name: 'august', value: 120 },
  { name: 'september', value: 107},
  { name: 'october', value: 103 },
 
  
  { name: 'december', value: 100},
  { name: 'january', value: 95 },
  { name: 'february', value: 109 },
  { name: 'march', value: 103 },
  { name: 'april', value: 97 },
  { name: 'may', value: 30,}
  
  
];

const BarChart1 = () => {
  return (
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChart1;
