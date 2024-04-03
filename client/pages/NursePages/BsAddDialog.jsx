import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, RadioGroup, FormControlLabel, CardContent, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BsAddDialog({ open, onClose, nic }) {

   
    const [rbs, setRbs] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [type, setType] = useState('random'); // Default to random blood sugar
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddBS", { nic, rbs, specialNotes, type })
            .then(result => {
                console.log(result);
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <Dialog open={open} onClose={onClose}sx={{ borderRadius: 6 }}>
            <form onSubmit={handleSubmit}>
            <DialogTitle>Add Blood Sugar Data</DialogTitle>
            
            <DialogContent>
            <CardContent>
                               
                                   
                                  
                                
                                    <br />
                                    <RadioGroup
                                        aria-label="blood-sugar-type"
                                        name="blood-sugar-type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <FormControlLabel value="random" control={<Radio />} label="Random" />
                                        <FormControlLabel value="fasting" control={<Radio />} label="Fasting" />
                                    </RadioGroup>
                                    <br />
                                    <div>
                                        <TextField
                                            label="Blood Sugar Level"
                                            variant="outlined"
                                            value={rbs}
                                            onChange={(e) => setRbs(e.target.value)}
                                            fullWidth
                                        />
                                    </div>
                                    <br />
                                    
                                    <div>
                                        <TextField
                                            label="Special Notes"
                                            variant="outlined"
                                            value={specialNotes}
                                            onChange={(e) => setSpecialNotes(e.target.value)}
                                            multiline
                                            fullWidth
                                            rows={4}
                                        />
                                    </div>
                                    <br />
                                   
                              
                            </CardContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
               
            </DialogActions> </form>
        </Dialog>
    );
}

export default BsAddDialog;
