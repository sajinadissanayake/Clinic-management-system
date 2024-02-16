import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { TextField, Button, RadioGroup, Radio, FormControlLabel, FormLabel, Grid, FormControl } from '@mui/material';

function UpdatePatient() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setdob] = useState('');
    const [gender, setGender] = useState('');
    const [nic, setNic] = useState('');
    const [address, setAddress] = useState('');
    const [maritial, setMaritial] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [moh, setMoh] = useState('');
    const [phm, setPhm] = useState('');
    const [phi, setPhi] = useState('');
    const [gnd, setGnd] = useState('');
    const [dsd, setDsd] = useState('');
    const [neighbour, setNeighbour] = useState('');
    const [education, setEducation] = useState('');
    const [physical, setPhysical] = useState('');
    const [tobacco, setTobacco] = useState(''); 
    const [tobaccochew, setTobaccochew] = useState(''); 
    const [alcohol, setAlcohol] = useState(''); 
    const [other, setOther] = useState(''); 
    const [snacks, setSnacks] = useState(''); 
    const [diseases, setDiseases] = useState(''); 
    const [allergies, setAllergies] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getPatient/' + id)
            .then(result => {
                console.log(result);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setdob(result.data.dob);
                setGender(result.data.gender);
                setNic(result.data.nic);
                setAddress(result.data.address);
                setMaritial(result.data.maritial);
                setPnumber(result.data.pnumber); 
                setMoh(result.data.moh);
                setPhm(result.data.phm);
                setPhi(result.data.phi);
                setGnd(result.data.gnd);
                setDsd(result.data.dsd);
                setNeighbour(result.data.neighbour);
                setEducation(result.data.education);
                setPhysical(result.data.physical);
                setTobacco(result.data.tobacco);
                setTobaccochew(result.data.tobaccochew);
                setAlcohol(result.data.alcohol);
                setOther(result.data.other);
                setSnacks(result.data.snacks);
                setDiseases(result.data.diseases);
                setAllergies(result.data.allergies);
            })
            .catch(err => console.log(err));
    }, []);

    const patientUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/UpdatePatient/" + id, {
            name, nic, email, age, dob, gender, address, maritial, pnumber, moh, phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol, other, snacks, diseases, allergies
        })
        .then(result => {
            console.log(result);
            navigate('/patientslist');
        })
        .catch(err => console.log(err));
    };
    
    return (
       
            <div>
            <form onSubmit={patientUpdate}>
                <h2>Update patient</h2>
                
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
            
               
                    <TextField label="NIC" value={nic} onChange={(e) => setNic(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
               
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
                
                    <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
                
                    <TextField
                        
                        type="date"
                        value={dob ? dob.split('T')[0] : ''}
                        onChange={(e) => setdob(e.target.value)}
                        sx={{ width: '100%' }}
                    /><br/><br/>

                   
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup><br/><br/>
                
                    <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ width: '100%' }} /><br/><br/>

                    <FormLabel component="legend">Maritial Status</FormLabel>
               
                    <RadioGroup row aria-label="maritial" name="maritial" value={maritial} onChange={(e) => setMaritial(e.target.value)}>
                        <FormControlLabel value="married" control={<Radio />} label="Married" />
                        <FormControlLabel value="unmarried" control={<Radio />} label="Unmarried" />
                    </RadioGroup><br/><br/>
               
                    <TextField label="Phone Number" value={pnumber} onChange={(e) => setPnumber(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
              
                    <TextField label="MOH" value={moh} onChange={(e) => setMoh(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
                
                    <TextField label="PHM" value={phm} onChange={(e) => setPhm(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
                
                    <TextField label="PHI" value={phi} onChange={(e) => setPhi(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
                
                    <TextField label="GND" value={gnd} onChange={(e) => setGnd(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
                
                    <TextField label="DSD" value={dsd} onChange={(e) => setDsd(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
              
                    <TextField label="Neighbour" value={neighbour} onChange={(e) => setNeighbour(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
               
                    <RadioGroup row aria-label="education" name="education" value={education} onChange={(e) => setEducation(e.target.value)}>
                    <FormLabel component="legend">Education</FormLabel>
                        <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                        <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                        <FormControlLabel value="olevel" control={<Radio />} label="O-Level" />
                        <FormControlLabel value="alevel" control={<Radio />} label="A-Level" />
                        <FormControlLabel value="degree" control={<Radio />} label="Degree" />
                    </RadioGroup>

                    <Grid >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Physical Activity</FormLabel>
                        <RadioGroup row aria-label="physical" name="physical" value={physical} onChange={(e) => setPhysical(e.target.value)}>
                            <FormControlLabel value="vigorous_intensity" control={<Radio />} label="Vigorous Intensity" />
                            <FormControlLabel value="moderate_intensity" control={<Radio />} label="Moderate Intensity" />
                            <FormControlLabel value="sedentary" control={<Radio />} label="Sedentary" />
                        </RadioGroup>
                    </FormControl>

            </Grid>
            <Grid >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Tobacco Smoking</FormLabel>
                    <RadioGroup row aria-label="tobacco" name="tobacco" value={tobacco} onChange={(e) => setTobacco(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Tobacco Chewing</FormLabel>
                    <RadioGroup row aria-label="tobaccochew" name="tobaccochew" value={tobaccochew} onChange={(e) => setTobaccochew(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                    
                </FormControl>
            </Grid>

            <Grid>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Alcohol</FormLabel>
                    <RadioGroup row aria-label="alcohol" name="alcohol" value={alcohol} onChange={(e) => setAlcohol(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Other Drugs</FormLabel>
                    <RadioGroup row aria-label="other" name="other" value={other} onChange={(e) => setOther(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Snacks</FormLabel>
                    <RadioGroup row aria-label="snacks" name="snacks" value={snacks} onChange={(e) => setSnacks(e.target.value)}>
                        <FormControlLabel value="normaluser" control={<Radio />} label="Normal User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                        <FormControlLabel value="heavyuser" control={<Radio />} label="Heavy User" />
                    </RadioGroup>
                </FormControl>
            </Grid><br/><br/>
               
                            
                    <TextField label="Diseases" value={diseases} onChange={(e) => setDiseases(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
               
               
                    <TextField label="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} sx={{ width: '100%' }} /><br/><br/>
               
                
                <Button type="submit" variant="contained" sx={{ width: '100%' }}>Update</Button>
            </form>
        </div>
       
        
    );
}

export default UpdatePatient;
