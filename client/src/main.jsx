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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ThemeProvider>
);

  

  
     

