// Loader.js

import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const Loader = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
