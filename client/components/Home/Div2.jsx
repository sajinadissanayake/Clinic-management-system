import { Typography } from '@mui/material';
import React from 'react';
import Check from './images/check.jpg';
import Treat from  './images/treat.jpg';

function Div2() {
    const whiteBoxStyle = {
        backgroundColor: 'white',
        height: '1020px',
        padding: '20px',
         // Adjust the margin to push it below the viewport
        zIndex: 2, // Ensure the white box appears above the overlay
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const coloredBoxStyle = {
        width: '600px',
        height: '400px',
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const blueBoxWithImageStyle = {
        ...coloredBoxStyle,
        backgroundImage: `url(${Check})`,
        backgroundSize: 'cover',
    };
    const blueBoxWithImageStyle2 = {
        ...coloredBoxStyle,
        backgroundImage: `url(${Treat})`,
        backgroundSize: 'cover',
    };

    return (
        <div style={whiteBoxStyle}>
            {/* Content of the white box */}
            <Typography variant='h2' align='center'>Our Concept</Typography>
            
            {/* Colored boxes */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ ...coloredBoxStyle }}>
                    <Typography variant='h4' align='center'>Monitoring Health Condition Of Age Over 40 People</Typography>
                </div>
                <div style={blueBoxWithImageStyle}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                
                <div style={blueBoxWithImageStyle2}></div>
                <div style={{ ...coloredBoxStyle }}>
                    <Typography variant='h4' align='center'>Maintain a Healthy Life For All Patients Of The Clinic</Typography>
                </div>
            </div>
        </div>
    );
}

export default Div2;
