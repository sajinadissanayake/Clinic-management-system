import React from 'react';
import { Box } from '@mui/material';
import AddPatient from '../src/AddPatient';
import PatientList from '../src/PatientList';
import { Routes, Route } from 'react-router-dom';
import PatientsPg from '../src/PatientsPg';

const Feed = () => {
  return (
    <div>
      <Box bgcolor="#E5F1F9" flex={4} p={2} borderRadius={5} marginTop={3}>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patientspg" element={<PatientsPg />} />
          <Route path="/add" element={<AddPatient />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Feed;
