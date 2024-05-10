 import { Box } from '@mui/material';
import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Rightbar = () => {
  return (
    <div>
        <Box bgcolor="" flex={2}p={2}sx={{ display: { xs: "none", sm: "block" } }} >
        <LocalHospitalIcon color='error' sx={{ fontSize: '5rem', marginRight: 1 }} />

        </Box>
        
       
      
    </div>
  )
}

export default Rightbar;