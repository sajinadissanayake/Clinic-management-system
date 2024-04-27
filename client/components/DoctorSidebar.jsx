import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CampaignIcon from '@mui/icons-material/Campaign';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const DoctorSidebar = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" height="100%">
      <Card sx={{ marginTop:5,borderTopRightRadius:30, borderBottomRightRadius: 30, backgroundColor: "background.bgw", flexGrow: 1}}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctordash">
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <HomeIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body1">Home</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/pselect">
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <ArticleIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body1">Add Prescription</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="#">
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <EqualizerIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body1">Clinic Status</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/annoucements">
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <CampaignIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body1">Announcement</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dclinic">
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <CalendarMonthIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body1">Clinic Calender</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton component={Link} to="#">
              <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid item>
                  <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body1">Clinic</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default DoctorSidebar;
