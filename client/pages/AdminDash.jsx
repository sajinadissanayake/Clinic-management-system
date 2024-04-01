import { useState } from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from '../components/Sidebar'

import { Stack } from '@mui/material'
import Navbar from '../components/Navbar'
import Dash from '../components/Dashboard/Dash'
import Rightbar from '../components/Rightbar'




function AdminDash() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Navbar/>
    <Stack direction="row" spacing={2} justifyContent="space-between">
    <Sidebar/>
    <Dash/>
      
      
     
  




      
    <Rightbar/>

     </Stack>
     








      
    </div>
  )
}

export default AdminDash
