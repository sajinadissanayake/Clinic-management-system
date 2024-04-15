import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

function BPadd({ handleCloseDialog,nic }) {
 
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/AddBp", { nic, systolic, diastolic  })
      .then(result => {
        console.log(result);
        handleCloseDialog(); // Close the dialog after successfully adding BP data
        // You may also trigger a refresh or update in the parent component if needed
        Swal.fire({
          icon: 'success',
          title: 'Blood Pressure Added',
          text: 'Blood pressure data has been successfully added.',
        }).then(() => {
          window.location.reload();
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
        });
      });
  };

  return (
    <div>
   
      <TextField
        label="Systolic Value"
        variant="outlined"
        value={systolic}
        onChange={(e) => setSystolic(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Diastolic Value"
        variant="outlined"
        value={diastolic}
        onChange={(e) => setDiastolic(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Blood Pressure
      </Button>
    </div>
  );
}

export default BPadd;
