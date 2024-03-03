import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material'
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
    path: "/MEform",
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
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ThemeProvider>
);

  

  
     

