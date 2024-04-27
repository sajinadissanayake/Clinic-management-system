import { Box, Card, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

function NurseLeftbar() {
  return (
    <div>
     <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" height="100%">
      <Card sx={{ marginTop:5,borderTopRightRadius:30, borderBottomRightRadius: 30, backgroundColor: "background.bgw", flexGrow: 1 }}>
      <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Nursedash">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <HomeIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Dashboard" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ArticleSend">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <ArticleIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Article" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/patientslist">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <PersonIcon sx={{ fontSize: 40 , color: 'background.bg2'}} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Patients" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="/clinicdates">
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
              <ListItemButton component={Link} to="/mselect">
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid item>
                    <PostAddIcon sx={{ fontSize: 40 , color: 'background.bg2'}} />
                  </Grid>
                  <Grid item>
                    <ListItemText primary="Records" />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="/clinicpatients">
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
    </div>
  );
}

export default NurseLeftbar;
