import React, { useState, useEffect } from 'react';
import staff from './images/staff.png';
import home from './images/homep.jpg'
import Button from '@mui/material/Button';
import Header from './Header'; // Importing the Header component
import Div2 from './Div2';
import Div3 from './DIv3';
import Div4 from './Div4';
import Div5 from './Div5';
import Footer from '../Footer';
import { Link } from 'react-router-dom';


function Div1() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Setting a timeout to trigger the fade-in effect after a short delay
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Adjust the delay time as needed

    // Clearing the timeout when the component is unmounted or on re-render
    return () => clearTimeout(timeout);
  }, []);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh', // Set minimum height to cover the viewport
    overflow: 'hidden', // Hide overflow to prevent scrolling
  };

  const backgroundStyle = {
    backgroundImage: `url(${home})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'fixed', // Keep the background image fixed
    zIndex: -1, // Ensure the background remains behind other content
  };
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Further reduced opacity white color
    backdropFilter: 'blur(10px)', // Blur effect
    borderRadius: '1px', // Optional: Add rounded corners for a nicer look
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Optional: Add shadow for depth
  };

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white', // Adjust text color to contrast with the background
    zIndex: 1,
    transition: 'opacity 1s ease', // Adding transition effect to opacity
    opacity: fadeIn ? 1 : 0, // Setting opacity based on fadeIn state
    fontSize: '20px', // Adjust the font size here (for example, 3em)
  };


  const buttonStyle = {
    marginTop: '20px', 
    fontSize: '18px', 
    borderRadius: '15px',
    borderWidth: '2px', 
    borderStyle: 'solid', 
    borderColor: 'white', 
    color: 'white',
    width: '200px', 
    transition: 'transform 0.3s', 
  };

 
  buttonStyle[':hover'] = {
    transform: 'scale(1.1)', 
  };




  return (
    <div>
      <Header /> {/* Render the Header component */}
      <div style={containerStyle}>
        <div style={backgroundStyle}></div> {/* Background image */}
        <div style={overlayStyle}></div>
        <div style={textStyle}>
          <h1>"A Healthy Outside Starts From The Inside."</h1>
          <p>Be Healthy And Active</p>
          <Button
  variant="outlined"
  component={Link}
  to="/login"
  sx={{
    ...buttonStyle,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // New color on hover
      borderColor: 'rgba(255, 255, 255, 0.3)', // New border color on hover
    },
  }}
>
  Login
</Button>


        </div>

      </div>
      {/* concept */}
      <Div2 />
      <Div3 />
      {/* blog */}
      <Div4 />
      {/* contact us  */}
      <Div5 />
      <Footer />

    </div>
  );
}

export default Div1;
