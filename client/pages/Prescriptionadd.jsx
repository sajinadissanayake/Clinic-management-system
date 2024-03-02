import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Stack } from '@mui/material'
import PageBody from '../components/PageBody'
import Rightbar from '../components/Rightbar'

function Prescriptionadd() {
  return (
    <div>
        <Navbar/>
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <PageBody>
            
            
            
            </PageBody> <Rightbar /></Stack>
      
    </div>
  )
}

export default Prescriptionadd
