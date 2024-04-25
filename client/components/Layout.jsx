import React from 'react';
import Footer from './Footer';
import { Box } from '@mui/material';
import staff from './compoimages/staff.png';

function Layout(props) {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
          backdropFilter: 'blur(10px)', // Apply blur effect
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Shadow effect
    
          minHeight: 700,
          position: 'relative', // Required for stacking the image and content
          overflow: 'hidden', // Hide overflow content
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1, // Ensure the image is behind the glassmorphism effect
            backgroundImage: `url(${staff})`,
            backgroundSize: 'cover',
            filter: 'blur(30px)', // Apply blur to the background image
          }}
        />
        {props.children}
      </Box>

      <Footer />
    </div>
  );
}

export default Layout;
