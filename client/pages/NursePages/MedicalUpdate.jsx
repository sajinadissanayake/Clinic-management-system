import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Stack } from '@mui/material';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import PageBody from '../../components/PageBody';
import Rightbar from '../../components/Rightbar';
import NurseLeftbar from './NurseLeftbar';

function MedicalUpdate() {
    const { id,nic } = useParams();
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [ibw, setIbw] = useState('');
    const [wc, setWc] = useState('');
    const [bpressure, setBpressure] = useState('');
    const [oexam, setOexam] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const navigate = useNavigate();
   
    


    useEffect(() => {
        // Fetch medical examination details based on ID
        axios.get(`http://localhost:3001/getMedicalExamination/${id}`)
            .then(response => {
                const { age, weight, bmi, ibw, wc, bpressure, oexam, specialNotes } = response.data;
                setAge(age);
                setWeight(weight);
                setBmi(bmi);
                setIbw(ibw);
                setWc(wc);
                setBpressure(bpressure);
                setOexam(oexam);
                setSpecialNotes(specialNotes);
            })
            .catch(error => console.error('Error fetching medical examination details:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updateMedicalExamination/${id}`, { age, weight, bmi, ibw, wc, bpressure, oexam, specialNotes })
            .then(result => {
                console.log(result);
                navigate(`/mselect`); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar/>
                <PageBody>
                    <form onSubmit={handleSubmit}>
                        <h2>Update Medical Examination</h2>
                        <div>
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        fullWidth
                        
                    />
                </div><br />
                <div>
                    <TextField
                        label="Weight"
                        variant="outlined"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        fullWidth
                    />
                </div><br />
                <div>
                    <TextField
                        label="BMI"
                        variant="outlined"
                        value={bmi}
                        onChange={(e) => setBmi(e.target.value)}
                        fullWidth
                    />
                </div><br />
                <div>
                    <TextField
                        label="Ideal Body Weight"
                        variant="outlined"
                        value={ibw}
                        onChange={(e) => setIbw(e.target.value)}
                        fullWidth
                    />
                </div><br />
                <div>
                    <TextField
                        label="Waist Circumference (cm)"
                        variant="outlined"
                        value={wc}
                        onChange={(e) => setWc(e.target.value)}
                        fullWidth
                    />
                </div><br />
                <div>
                    <TextField
                        label="Blood Pressure"
                        variant="outlined"
                        value={bpressure}
                        onChange={(e) => setBpressure(e.target.value)}
                        fullWidth
                    />
                </div><br />
                <div>
                    <TextField
                        label="Oral Examination"
                        variant="outlined"
                        value={oexam}
                        onChange={(e) => setOexam(e.target.value)}
                        fullWidth
                    />
                </div><br />
                <div>
                    <TextField
                                label="Special Notes" // Label for special notes field
                                variant="outlined"
                                value={specialNotes}
                                onChange={(e) => setSpecialNotes(e.target.value)}
                                multiline // Multiline prop for a larger area
                                fullWidth
                                rows={4} // Number of rows to display
                            /></div><br />
                
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </form>
                </PageBody>
                <Rightbar />
            </Stack>
        </div>
    );
}

export default MedicalUpdate;
