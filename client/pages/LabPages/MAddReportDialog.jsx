import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function MAddReportDialog({ open, onClose, nic }) {
  // Define your state and handle functions if needed

  const handleSave = () => {
    // Implement save functionality
    onClose(); // Close the dialog after saving
  };

  const handleClose = () => {
    onClose(); // Close the dialog without saving
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Report</DialogTitle>
      <DialogContent>
        {/* Your form fields or content */}
        {/* You can access the 'nic' prop here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MAddReportDialog;
