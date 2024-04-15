import { Box, Card, Grid, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';

import ArticleIcon from '@mui/icons-material/Article';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import NoteAddIcon from '@mui/icons-material/NoteAdd';



const LabSidebar = () => {
  return (
    <div>
     <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <Card sx={{ marginTop:5,borderTopRightRadius:30, borderBottomRightRadius: 30, backgroundColor: "background.bgw", flexGrow: 1, width: '100%' }}>
      <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Labdash">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <HomeIcon sx={{ fontSize: 40,color: 'background.bg2' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Home</Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/LabRequestsPage">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <ArticleIcon sx={{ fontSize: 40,color: 'background.bg2' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Lab Requests</Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/PReportSelect">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <ArticleIcon sx={{ fontSize: 40,color: 'background.bg2' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Reports</Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>

            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/reportgen">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <NoteAddIcon sx={{ fontSize: 40,color: 'background.bg2' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Create Report</Typography>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            
          </List>

      </Card>
    </Box>
    </div>
  );
};

export default LabSidebar;
