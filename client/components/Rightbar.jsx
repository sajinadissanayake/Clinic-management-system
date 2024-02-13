import { Box } from '@mui/material';
import React from 'react'

const Rightbar = () => {
  return (
    <div>
        <Box bgcolor="green" flex={2}p={2}sx={{ display: { xs: "none", sm: "block" } }}>
        <h1>Rightbar</h1>

        </Box>
        
       
      
    </div>
  )
}

export default Rightbar;