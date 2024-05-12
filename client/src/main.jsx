import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider} from '@mui/material'
import {theme} from './theme.js'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import AddPatient from './AddPatient.jsx'
import PatientList from './PatientList.jsx'
import ReportsView from './ReportsView.jsx'
import AddReports from './AddReports.jsx'
import UpdatePatient from './UpdatePatient.jsx'
import OnePatient from './OnePatient.jsx'
import MEform from '../pages/MEform.jsx'
import BloodSugar from '../pages/BloodSugar.jsx'


import AppointmentAdd from '../pages/AppointmentAdd.jsx'
import SignInSide from '../pages/SignInSide.jsx'
import RegisterUsers from '../pages/RegisterUsers.jsx'
import Login from '../pages/Login.jsx'
import Prescriptionadd from '../pages/Prescriptionadd.jsx'
import DoctorDash from '../pages/DoctorDash.jsx'

import PatientSelect from '../pages/Prescription/PatientSelect.jsx'
import PrescProfile from '../pages/Prescription/PrescProfile.jsx'

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
import Home from '../components/Home/Home.jsx'
import ClinicDates from '../pages/ClinicDates.jsx'
import ClinicPatients from '../pages/NursePages/ClinicPatients.jsx';
import ClinicCancel from '../pages/NursePages/ClinicCancel.jsx';
import ClinicUpdate from '../pages/NursePages/ClinicUpdate.jsx';
import AdminDash from '../pages/Admin/AdminDash.jsx';
import Reportgen from '../pages/LabPages/Reportgen.jsx';
import BPressure from '../pages/NursePages/BPressure.jsx';
import ArticleSend from '../pages/NursePages/ArticleSend.jsx';
import LMselect from '../pages/LabPages/LMselect.jsx';
import Lipid from '../pages/LabPages/Lipid.jsx';
import LipidAdd from '../pages/LabPages/LipidAdd.jsx';
import PatientHome from '../pages/Patient/PatientHome.jsx';
import PatientPresc from '../pages/Patient/PatientPresc.jsx';
import PatientRepo from '../pages/Patient/PatientRepo.jsx';
import PatientCheckups from '../pages/Patient/PatientChekups.jsx';
import PatientBs from '../pages/Patient/PatientBs.jsx';
import PatientBp from '../pages/Patient/PatientBp.jsx';
import PatientLp from '../pages/Patient/PatientLp.jsx';
import AnnouncementAdd from '../pages/Prescription/Annoucementadd.jsx';
import Announcements from '../pages/Prescription/Annoucements.jsx';
import Dclinic from '../pages/Prescription/Dclinic.jsx';
import Bot from '../components/bot/Bot.jsx';
import LabBs from '../pages/LabPages/LabBs.jsx';
import AllUsers from '../pages/Admin/AllUsers.jsx';
import Blog from '../pages/Admin/Blog.jsx';
import Feedbacks from '../pages/Admin/Feedbacks.jsx';
import ClinicHistory from '../pages/Patient/ClinicHistory.jsx';
import PRecReq from '../pages/Patient/PRecReq.jsx';
import PRepReq from '../pages/Patient/PRepReq.jsx';
import NLipid from '../pages/NursePages/NLipid.jsx';
import Staff from '../pages/Admin/Staff.jsx';
import ClinicStatus from '../pages/Admin/ClinicStatus.jsx';
import DcStatus from '../pages/Prescription/DcStatus.jsx';
import ChatAssistant from '../components/Home/ChatAssistant.jsx';








const router = createBrowserRouter([

  {
    path: "/", 
    element: <Home/>, 
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
    path: "/reportsview",
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
    path: "/MEform/:nic",
    element: <MEform />,
  },
  {
    path: "/bloodsugar",
    element: <BloodSugar />,
  },
  
  {
    path: "/ArticleSend",
    element: <ArticleSend />,
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
    path: "/pselect",
    element: <PatientSelect />,
  },
  {
    path: "/prescpatient/:id",
    element: <PrescProfile />,
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
    path: "/labrequestspage/:nic", 
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

  {
    path: "/clinicdates", 
    element: <ClinicDates/>, 
  },
  {
    path: "/clinicpatients", 
    element: <ClinicPatients/>, 
  },
  {
    path: "/cliniccancel", 
    element: <ClinicCancel/>, 
  },
  {
    path: "/clinicUpdate", 
    element: <ClinicUpdate/>, 
    
  },
  {
    path: "/admindash", 
    element: <AdminDash/>, 
  },
  {
    path: "/reportgen", 
    element: <Reportgen/>, 
  },
  
  {
    path: "/bpressure/:nic", 
    element: <BPressure/>, 
  },
  {
    path: "/Lmselect", 
    element: <LMselect/>, 
  },
  {
    path: "/lipidadd", 
    element: <LipidAdd/>, 
  },
  {
    path: "/lipid/:nic", 
    element: <Lipid/>, 
  },
  {
    path: "/patienthome", 
    element: <PatientHome/>, 
  },
  {
    path: "/patientpresc", 
    element: <PatientPresc/>, 
  },
  {
    path: "/patientrepo", 
    element: <PatientRepo/>, 
  },
  {
    path: "/patientcheckups", 
    element: <PatientCheckups/>, 
  },
  {
    path: "/patientbs", 
    element: <PatientBs/>, 
  },
  {
    path: "/patientbp", 
    element: <PatientBp/>, 
  },
  {
    path: "/bot", 
    element: <Bot/>, 
  },
  {
    path: "/Labbs/:nic", 
    element: <LabBs/>, 
  },
  
  {
    path: "/patientLp", 
    element: <PatientLp/>, 
  },
  {
    path: "/addannoucement", 
    element: <AnnouncementAdd/>, 
  },
  {
    path: "/annoucements", 
    element: <Announcements/>, 
  },
  {
    path: "/dclinic", 
    element: <Dclinic/>, 
  },
  {
    path: "/allusers", 
    element: <AllUsers/>, 
  },
 

  {
    path: "/bot", 
    element: <Bot/>, 
  },
  {
    path: "/allusers", 
    element: <AllUsers/>, 
  },
  {
    path: "/blog", 
    element: <Blog/>, 
  },
  {
    path: "/feedbacks", 
    element: <Feedbacks/>, 
  },
  {
    path: "/Clinichistory", 
    element: <ClinicHistory/>, 
  },
  {
    path: "/precreq", 
    element: <PRecReq/>, 
  },
  {
    path: "/prepreq", 
    element: <PRepReq/>, 
  },
  {
    path: "/Nlipid/:nic", 
    element: <NLipid/>, 
  },
  {
    path: "/staff", 
    element: <Staff/>, 
  },
  {

    path: "/clinicstatus", 
    element: <ClinicStatus/>, 
  },
  {
    path: "/dcstatus", 
    element: <DcStatus/>, 
  },
  {
    path: "/Assistant", 
    element: <ChatAssistant/>, 
  },
 
 
 
 
 
 
 















 

  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <ThemeProvider theme={theme}>
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </ThemeProvider>
);

  

  
     

