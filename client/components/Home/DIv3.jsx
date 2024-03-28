import { Typography } from '@mui/material';
import React from 'react';
import Check from './images/check.jpg';
import Treat from  './images/treat.jpg';

function Div3() {
    const whiteBoxStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background with transparency
        backdropFilter: 'blur(10px)', // Blur effect
        height: '1020px',
        padding: '20px',
        zIndex: 2, // Ensure the white box appears above the overlay
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        color: 'white'
    };

    return (
        <div style={whiteBoxStyle}>
            {/* Content of the white box */}
            <Typography variant='h2'>"Healthy Diet Cures More Than Doctor"</Typography>
        </div>
    );
}

export default Div3;
