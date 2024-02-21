import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';


import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
const Sidebar = () => {
  return (
    <div>
     <Box bgcolor="" flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}> 
        <h3>Menu </h3>


        <List>

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/'>
              <ListItemIcon>
              <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/addpatient'>
              <ListItemIcon>
              <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary="Add patient" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/patientslist'>
              <ListItemIcon>
              <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="patients" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/addreports'>
              <ListItemIcon>
              <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Report" />
            </ListItemButton>
          </ListItem>

         
         

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/reports'>
              <ListItemIcon>
              <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/MEform'>
              <ListItemIcon>
              <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="Medical examination" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a"  href='/bloodsugar'>
              <ListItemIcon>
              <MedicalInformationIcon />
              </ListItemIcon>
              <ListItemText primary="Blood Sugar" />
            </ListItemButton>
          </ListItem>

          






          </List>
      </Box>
    </div>

    
















  );
};

export default Sidebar;
