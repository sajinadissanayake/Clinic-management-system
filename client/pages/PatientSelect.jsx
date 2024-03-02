import React from 'react'
import Navbar from '../components/Navbar'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function PatientSelect() {
  return (
    <div>
        <Navbar/>

        {/* Add margin or padding to create space */}
        <div style={{ margin: '20px 0', width:'100%' }} >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="text.primary">select patient</Typography>
          </Breadcrumbs>
        </div>











        
    </div>
  )
}

export default PatientSelect
