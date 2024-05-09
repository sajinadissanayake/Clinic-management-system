import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import '../NursePages/Nursecss.css/MedicalMenu.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';

function MedicalMenu({ pageName, nic }) {
  // Function to determine if a card should be highlighted based on page name
  const isRelatedPage = (currentPage) => {
    return currentPage === pageName;
  };

  return (
    <div>
      <Box bgcolor="" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <h4>Menu</h4>

        
        <Link style={{ textDecoration: 'none' }} to={`/bstable/${nic}`}>
        <Card className={`medical-card ${isRelatedPage("Blood Sugar") ? "highlighted" : ""}`} sx={{marginTop:4, borderRadius:'10%'}}>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", mt: 2,padding:2 }}>
            <WaterDropIcon sx={{ fontSize: "40px" }} /> {/* Blood sugar icon */}
            <Typography variant="body1">Blood Sugar</Typography>
          </Box>
        </Card></Link>

        <Link style={{ textDecoration: 'none' }} to={`/bpressure/${nic}`}>
        <Card className={`medical-card ${isRelatedPage("Blood Pressure") ? "highlighted" : ""}`} sx={{marginTop:4, borderRadius:'10%'}}>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column",padding:2 }}>
            <MonitorHeartIcon sx={{ fontSize: "40px" }} />
            <Typography variant="body1">blood pressure</Typography>
          </Box>
        </Card></Link>

        <Link style={{ textDecoration: 'none' }} to={`/Nlipid/${nic}`}>
        <Card className={`medical-card ${isRelatedPage("Lipid") ? "highlighted" : ""}`} sx={{marginTop:4, borderRadius:'10%'}}>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column",padding:2 }}>
            <ScienceIcon sx={{ fontSize: "40px" }} />
            <Typography variant="body1">Lipid</Typography>
          </Box>
        </Card></Link>


        

      </Box>
    </div>
  );
}

export default MedicalMenu;
