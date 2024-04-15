import { Box, Typography } from '@mui/material';
import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function MedicalMenu() {
  return (
    <div>
      <Box bgcolor="" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <h4>medical menu</h4>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <MonitorHeartIcon sx={{ fontSize: "5rem" }} />
          <Typography variant="body1">blood pressure</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 2 }}>
          <WaterDropIcon sx={{ fontSize: "5rem" }} /> {/* Blood sugar icon */}
          <Typography variant="body1">Blood Sugar</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default MedicalMenu;
