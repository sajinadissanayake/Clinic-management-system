import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import axios from 'axios';

function AnnouncementAdd() {
 
 
  const doctor = "doctor1";
  const [title, setTitle] = useState('');
  const [announcement, setAnnoucement] = useState('');


  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:3001/AddAnnoucement", { announcement, title,doctor})
          .then(result => {
              console.log(result);
            
          })
          .catch(err => console.log(err));
  };


  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Announcement"
        value={announcement}
        onChange={(e) => setAnnoucement(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />
  
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default AnnouncementAdd;
