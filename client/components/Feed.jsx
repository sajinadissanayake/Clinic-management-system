import React from 'react'
import { Box } from '@mui/material'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PatientsPg from '../src/PatientsPg';
import Home from '../src/Home';
import AddPatient from '../src/AddPatient';
import UpdatePatient from '../src/UpdatePatient';
import PatientList from '../src/PatientList';
import AddReports from '../src/AddReports';
import OnePatient from '../src/OnePatient';
import ReportsView from '../src/ReportsView';
import UploadReport from '../src/UploadReport';




const Feed = () => {
  return (
    <div>
         <Box bgcolor="#E5F1F9" flex={4}p={2} borderRadius={5} marginTop={3} >
         <h1 >Feed</h1>
         <BrowserRouter>
      <Routes>
        
        
        <Route path='/' element={<PatientsPg />}></Route>
        <Route path='/add' element={<AddPatient />}></Route>
        <Route path='/updatepatient/:id' element={<UpdatePatient />}></Route>
        <Route path='/patientslist' element={<PatientList />}></Route>
        <Route path='/addreports' element={<AddReports />}></Route>
        <Route path='/patient/:id' element={<OnePatient />}></Route>
        <Route path='/ReportsView' element={<ReportsView />} />
        <Route path='/uploadreport' element={<UploadReport />} />

      </Routes>
      </BrowserRouter>
       

         </Box>
        
      
    </div>
  )
}

export default Feed;
