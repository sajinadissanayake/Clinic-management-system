import React from 'react'
import { Box } from '@mui/material';

function PageBody(props) {
  return (
    <div>
      <Box bgcolor="background.default" flex={4} p={2} marginTop={3} boxShadow={3} borderRadius={3} minWidth={1000}>

        {props.children}
      </Box>
    </div>
  )
}

export default PageBody
