import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Stack, TextField, Card, CardContent, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Rightbar from '../components/Rightbar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BloodSugarChart from '../components/BloodSugarChart';

function BloodSugar() {
    const [nic, setNic] = useState('');
    const [rbs, setRbs] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [type, setType] = useState('random'); // Default to random blood sugar
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddBS", { nic, rbs, specialNotes, type })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar />
                <PageBody>
                    <Box style={{ display: 'flex', gap: '20px' }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <h3>Blood Sugar</h3>
                                    <div>
                                        <TextField
                                            label="NIC"
                                            variant="outlined"
                                            value={nic}
                                            onChange={(e) => setNic(e.target.value)}
                                            fullWidth
                                        />
                                    </div>
                                
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
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Box>

                    <Card>
                       
                    </Card>








                </PageBody>
                <Rightbar />
            </Stack>
        </div>
    );
}

export default BloodSugar;
