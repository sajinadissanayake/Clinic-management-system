import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';

// Array of pages for the navigation menu
const pages = ['Concept', 'Blog', 'Contactus'];

// Array of settings options for the user menu
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// Styled toolbar component with Emotion
const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000, // Ensure the header appears above other content
});

// Functional component for Navbar
function Header() {
  const theme = useTheme();

  // State variables for menu anchors
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Handlers to open and close the navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handlers to open and close the user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      {/* AppBar component */}
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <StyledToolBar>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo and app name */}
              <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: theme.customPalette.customColor1, fontSize: 40 }} />

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#hospital"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: theme.palette.secondary.main, // Set text color to secondary color
                  textDecoration: 'none',
                }}
              >
                Healthy LifeStyle  Center
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
                <Menu
                  id="menu-appbar"
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
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" color={theme.palette.secondary.main}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Navigation buttons */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: theme.palette.secondary.main, display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </StyledToolBar>
      </AppBar>
    </div>
  );
}

export default Header;
