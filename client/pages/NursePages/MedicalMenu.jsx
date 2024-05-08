import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function MedicalMenu() {
  return (
    <div>
      <Box bgcolor="" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <h4>medical menu</h4>
        <Card sx={{marginTop:4,height:"10"}}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column",padding:2  }}>
          <MonitorHeartIcon sx={{ fontSize: "40px" }} />
          <Typography variant="body1">blood pressure</Typography>
        </Box>
        </Card>
        <Card sx={{marginTop:4, height:"10"}}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 2,padding:2 }}>
          <WaterDropIcon sx={{ fontSize: "40px" }} /> {/* Blood sugar icon */}
          <Typography variant="body1">Blood Sugar</Typography>
        </Box></Card>
      </Box>
    </div>
  );
}

export default MedicalMenu;
