// Loader.js

import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const Loader = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
      <CircularProgress style={{ color: 'transparent' }} />
    </Backdrop>
  );
};

export default Loader;
