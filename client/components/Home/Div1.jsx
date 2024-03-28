import React, { useState, useEffect } from 'react';
import staff from './images/staff.png';
import Button from '@mui/material/Button';
import Header from './Header'; // Importing the Header component
import Div2 from './Div2';
import Div3 from './DIv3';
import Div4 from './Div4';
import Div5 from './Div5';
import Footer from '../Footer';


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
    backgroundImage: `url(${staff})`,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity (last value) to darken/lighten the image
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
  };

  const buttonStyle = {
    marginTop: '20px', // Adjust spacing between text and button
    fontSize: '20px', // Increase button size
    borderRadius: '20px', // Increase border radius (rounded corners)
    width: '200px', // Increase button width
  };

  

  return (
    <div>
      <Header /> {/* Render the Header component */}
      <div style={containerStyle}>
        <div style={backgroundStyle}></div> {/* Background image */}
        <div style={overlayStyle}></div>
        <div style={textStyle}>
          <h1>"A healthy outside starts from the inside."</h1>
          <p>Be Healthy And Active..........</p>
          <Button variant="outlined" color="secondary" style={buttonStyle}>Login</Button>
        </div>
       
      </div>
      <Div2/>
      <Div3/>
      <Div4/>
      <Div5/>
      <Footer/>
     
    </div>
  );
}

export default Div1;
