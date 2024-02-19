import React from 'react'
import { Box } from '@mui/material';

function PageBody(props) {
  return (
    <div>
        <Box bgcolor="secondary" flex={4} p={2} borderRadius={4} marginTop={3} boxShadow={3}>
       
                    {props.children}
      </Box>   
    </div>
  )
}

export default PageBody
