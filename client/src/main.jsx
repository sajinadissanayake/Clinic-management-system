import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider} from '@mui/material'
import {theme} from './theme.js'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import AddPatient from './AddPatient.jsx'
import PatientList from './PatientList.jsx'
import ReportsView from './ReportsView.jsx'
import AddReports from './AddReports.jsx'
import UpdatePatient from './UpdatePatient.jsx'
import OnePatient from './OnePatient.jsx'
import ReportsUpdate from './ReportsUpdate.jsx'
import MEform from '../pages/MEform.jsx'
import BloodSugar from '../pages/BloodSugar.jsx'
import Home from '../pages/Home.jsx'
import BlogAdd from '../pages/BlogAdd.jsx'
import AppointmentAdd from '../pages/AppointmentAdd.jsx'
import SignInSide from '../pages/SignInSide.jsx'
import RegisterUsers from '../pages/RegisterUsers.jsx'
import Login from '../pages/Login.jsx'
import Prescriptionadd from '../pages/Prescriptionadd.jsx'
import DoctorDash from '../pages/DoctorDash.jsx'
import Checkout from '../pages/Prescription/Checkout.jsx'
import PatientSelect from '../pages/Prescription/PatientSelect.jsx'
import PrescProfile from '../pages/Prescription/PrescProfile.jsx'
import AdminDash from '../pages/AdminDash.jsx'
import NurseDash from '../pages/NurseDash.jsx'
import Mselect from '../pages/NursePages/Mselect.jsx'
import Medicals from '../pages/NursePages/Medicals.jsx'
import BsSelect from '../pages/NursePages/BsSelect.jsx'
import BsTable from '../pages/NursePages/BsTable.jsx'
import MedicalUpdate from '../pages/NursePages/MedicalUpdate.jsx'
import PharmacyDash from '../pages/PharmacyDash.jsx'
import AllPrescriptions from '../pages/PharmacyPages/AllPrescriptions.jsx'
import Pprescriptions from '../pages/PharmacyPages/Pprescriptions.jsx'
import NewPrescP from '../pages/PharmacyPages/NewPrescP.jsx'
import LabDash from '../pages/LabDash.jsx'
import LabRequestsPage from '../pages/LabPages/LabRequestsPage.jsx'
import PReportSelect from '../pages/LabPages/PReportSelect.jsx'
import Reports from '../pages/LabPages/Reports.jsx'









const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/addpatient",
    element: <AddPatient/>,
  },
  {
    path: "/patientslist",
    element: <PatientList/>,
  },
  {
    path: "/reports",
    element: <ReportsView/>,
  },
  {
    path: "/addreports",
    element: <AddReports/>,
  },
  {
    path: "/updatepatient/:id",
    element: <UpdatePatient />,
  },
  {
    path: "/patient/:id",
    element: <OnePatient />,
  },
  {
    path: "/updatereport/:id",
    element: <ReportsUpdate />,
  },
  {
    path: "/MEform/:nic",
    element: <MEform />,
  },
  {
    path: "/bloodsugar",
    element: <BloodSugar />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/blogadd",
    element: <BlogAdd />,
  },
  {
    path: "/appointmentadd",
    element: <AppointmentAdd />,
  },
  {
    path: "/signin",
    element: <SignInSide />,
  },
  {
    path: "/register",
    element: <RegisterUsers />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addpresc/:id",
    element: <Prescriptionadd />,
  },
  {
    path: "/doctordash",
    element: <DoctorDash />,
  },
  {
    path: "/check",
    element: <Checkout />,
  },
  {
    path: "/pselect",
    element: <PatientSelect />,
  },
  {
    path: "/prescpatient/:id",
    element: <PrescProfile />,
  },
  {
    path: "/AdminDash",
    element: <AdminDash />,
  },
  {
    path: "/NurseDash",
    element: <NurseDash/>,
  },
  {
    path: "/mselect",
    element: <Mselect/>,
  },
  {
    path: "/medicals/:nic", 
    element: <Medicals />, 
  },
  {
    path: "/BsSelect", 
    element: <BsSelect />, 
  },
  {
    path: "/bstable/:nic", 
    element: <BsTable />, 
  },
  {
    path: "/medicalupdate/:id", 
    element: <MedicalUpdate />, 
  },
  {
    path: "/pharmacydash", 
    element: <PharmacyDash />, 
  },
  {
    path: "/allprescriptions", 
    element: <AllPrescriptions />, 
  },
  {
    path: "/Pprescriptions/:nic", 
    element: <Pprescriptions />, 
  },
  {
    path: "/NewPresc", 
    element: <NewPrescP />, 
  },
  {
    path: "/Labdash", 
    element: <LabDash />, 
  },
  {
    path: "/labrequestspage", 
    element: <LabRequestsPage />, 
  },
  {
    path: "/PReportSelect", 
    element: <PReportSelect/>, 
  },
  {
    path: "/reports/:nic", 
    element: <Reports/>, 
  },
 

  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <ThemeProvider theme={theme}>
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ThemeProvider>
);

  

  
     

