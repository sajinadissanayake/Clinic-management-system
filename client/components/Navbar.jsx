// Navbar.js

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';

const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Align items vertically in the center
  position: 'relative', // Required for z-index to work
});

function Navbar({ pageTitle }) {
  const theme = useTheme();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: 'background.bgw', boxShadow: 'none' }}>
        <StyledToolBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: theme.customPalette.customColor1, fontSize: 40 }} />

              {/* Title in the middle */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1, // Take available space
                  textAlign: 'center', // Center align text
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                {pageTitle}
              </Typography>

              {/* Responsive navigation menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* User avatar and settings menu */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Logout">
                  <Button variant="outlined">Logout</Button>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </StyledToolBar>
      </AppBar>
    </div>
  );
}

export default Navbar;
