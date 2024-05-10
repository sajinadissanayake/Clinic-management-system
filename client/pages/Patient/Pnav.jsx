import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import { Link } from 'react-router-dom';

function Pnav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [patient, setPatient] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const nic = loggedInUser.nic;

    axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
      <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 40, color: 'red' }} />

      <Typography
  variant="h6"
  noWrap
  component={Link}
  to="/"
  sx={{
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    textDecoration: 'none',
    color: 'white', // Set text color to white
  }}
>
  Healthy LifeStyle Center
</Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-nav"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-nav"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/patienthome">Home</MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/patientcheckups">Checkups</MenuItem>
            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/patientrepo">Reports</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button component={Link} to="/patienthome" sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
          <Button component={Link} to="/patientcheckups" sx={{ my: 2, color: 'white', display: 'block' }}>Checkups</Button>
          <Button component={Link} to="/patientrepo" sx={{ my: 2, color: 'white', display: 'block' }}>Reports</Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {patient && <Avatar alt={patient.name} src={patient.gender === 'male' ? maleAvatar : femaleAvatar} />}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-user"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Pnav;
