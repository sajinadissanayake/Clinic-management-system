import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body1" color="inherit" style={{ flexGrow: 1 }}>
          © 2024 Healthy Lifetyle Clinic. All rights reserved.
        </Typography>
        <div>
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
          <IconButton color="inherit">
            <Twitter />
          </IconButton>
          <IconButton color="inherit">
            <Instagram />
          </IconButton>
          <IconButton color="inherit">
            <LinkedIn />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
