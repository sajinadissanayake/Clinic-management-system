import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material'; // Import Dialog component from @mui/material
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon

import BloodSugarChart from '../BloodSugarChart';

function BSchartdialog({ nic, handleClose, open }) { // Adjust function parameters

  return (
    <div>
        <Dialog onClose={handleClose} open={open} maxWidth="xl" fullWidth>
        <DialogTitle>
         blood sugar levels
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            <BloodSugarChart nic={nic} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BSchartdialog;
