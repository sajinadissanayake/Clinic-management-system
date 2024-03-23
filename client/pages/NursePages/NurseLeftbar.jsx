import { Box, Card, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ArticleIcon from '@mui/icons-material/Article';
import React from 'react';

function NurseLeftbar() {
  return (
    <div>
      <Box bgcolor="" flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}> 
        <h3>Menu</h3>
        <Card sx={{borderRadius:6}}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Nursedash">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <HomeIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Dashboard" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/blogadd">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <ArticleIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Add Posts" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/addpatient">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <PersonAddAlt1Icon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Add patient" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/reports">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <DocumentScannerIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Reports" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/mselect">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <PostAddIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Medical examinations" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/bloodsugar">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <MedicalInformationIcon sx={{ fontSize: 40 }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Blood Sugar" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      </Box>
    </div>
  );
}

export default NurseLeftbar;
