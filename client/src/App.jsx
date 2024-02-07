import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PatientsPg from './PatientsPg'
import AddPatient from './AddPatient'
import UpdatePatient from './UpdatePatient'
import PatientList from './PatientList'
import OnePatient from './OnePatient'
import AddReports from './AddReports'
import ReportsView from './ReportsView'
import Home from './Home'
import ReportsUpdate from './ReportsUpdate'





function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/patientspg' element={<PatientsPg />}></Route>

        <Route path='/add' element={<AddPatient />}></Route>
        <Route path='/updatepatient/:id' element={<UpdatePatient />}></Route>
        <Route path='/plist' element={<PatientList />}></Route>
        <Route path='/patient/:id' element={<OnePatient />}></Route>
        <Route path='/addreports' element={<AddReports />}></Route>
        <Route path='/ReportsView' element={<ReportsView />}></Route>
        <Route path='/updatereport/:id' element={<ReportsUpdate />}></Route>
        
        
       
        

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
