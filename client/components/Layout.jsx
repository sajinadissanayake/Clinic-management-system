import React from 'react'
import Footer from  './Footer';
import { Box } from '@mui/material';

function Layout(props) {
  return (
    <div>
         <Box bgcolor={'background.bg3'}minHeight={700}>
         {props.children}
         </Box>

         <Footer/>
      
    </div>
  )
}

export default Layout
