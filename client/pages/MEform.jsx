import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rightbar from '../components/Rightbar';
import Navbar from '../components/Navbar';
import { Stack } from '@mui/material';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import NurseLeftbar from './NursePages/NurseLeftbar';
import Layout from '../components/Layout';
import Announcements from '../components/Announcements';

function MEform() {
    const { nic } = useParams();
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [ibw, setIbw] = useState('');
    const [wc, setWc] = useState('');
    const [bpressure, setBpressure] = useState('');
    const [oexam, setOexam] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [displayedNic, setDisplayedNic] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setDisplayedNic(nic);
    }, [nic]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddMexam", { nic, age, weight, bmi, ibw, wc, bpressure, oexam, specialNotes})
            .then(result => {
                console.log(result);
                navigate(`/medicals/${nic}`); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar />
            <Layout>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar />
                <PageBody>
                    <form onSubmit={handleSubmit}>
                        <h2>Medical Examination</h2>
                        <h3>Of Patient NIC : {displayedNic}</h3> {/* Displaying the NIC */}
                        <div style={{ height: '70vh', overflowY: 'auto' }}>
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
                                />
                            </div><br />
                            <Button type="submit" variant="contained" color="primary" >
                                Submit
                            </Button>
                        </div>
                    </form>
                </PageBody>
                <Announcements/>
            </Stack></Layout>
        </div>
    );
}

export default MEform;
