import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import { Stack } from '@mui/material'
import Navbar from '../components/Navbar'











function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Navbar/>
    <Stack direction="row" spacing={2} justifyContent="space-between">
    <Sidebar/>
      
      
      <feed/>




      
    <Rightbar/>

     </Stack>
     








      
    </div>
  )
}

export default App
