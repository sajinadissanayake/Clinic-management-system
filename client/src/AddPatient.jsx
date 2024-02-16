import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";

function AddPatient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');
    const [nic, setNic] = useState('');
    const [address, setAddress] = useState('');
    const [maritial, setMaritial] = useState('married');
    const [pnumber, setPnumber] = useState('');
    const [moh, setMoh] = useState('');
    const [phm, setPhm] = useState('');
    const [phi, setPhi] = useState('');
    const [gnd, setGnd] = useState('');
    const [dsd, setDsd] = useState('');
    const [neighbour, setNeighbour] = useState('');
    const [education, setEducation] = useState('alevel');
    const [physical, setPhysical] = useState('moderate_intensity');
    const [tobacco, setTobacco] = useState('nonuser');
    const [tobaccochew, setTobaccoChew] = useState('nonuser');
    const [alcohol, setAlcohol] = useState('nonuser');
    const [other, setOther] = useState('nonuser');
    const [snacks, setSnacks] = useState('normaluser');
    const [diseases, setDiseases] = useState('');
    const [allergies, setAllergies] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/AddPatient", { name, nic, email, age, dob, gender, address, maritial, pnumber, moh, phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol, other, snacks, diseases, allergies })
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add patient</h2>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth/><br/><br/>
                <TextField label="NIC" value={nic} onChange={(e) => setNic(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} fullWidth /><br/><br/>
                <FormLabel component="legend">Date of Birth</FormLabel>
                <TextField  type="date" value={dob} onChange={(e) => setDob(e.target.value)} fullWidth /><br/><br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                </FormControl>
                <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Marital Status</FormLabel>
                    <RadioGroup row value={maritial} onChange={(e) => setMaritial(e.target.value)}>
                        <FormControlLabel value="married" control={<Radio />} label="Married" />
                        <FormControlLabel value="unmarried" control={<Radio />} label="Unmarried" />
                    </RadioGroup>
                </FormControl>
                <TextField label="Contact Number" value={pnumber} onChange={(e) => setPnumber(e.target.value)} fullWidth /><br/><br/>
                <TextField label="MOH Area" value={moh} onChange={(e) => setMoh(e.target.value)} fullWidth /><br/><br/>
                <TextField label="PHM Area" value={phm} onChange={(e) => setPhm(e.target.value)} fullWidth /><br/><br/>
                <TextField label="PHI Area" value={phi} onChange={(e) => setPhi(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Grama Niladhari Division" value={gnd} onChange={(e) => setGnd(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Divisiona Secratariat Division" value={dsd} onChange={(e) => setDsd(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Whom to inform during an emergency" value={neighbour} onChange={(e) => setNeighbour(e.target.value)} fullWidth /><br/><br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Education</FormLabel>
                    <RadioGroup row value={education} onChange={(e) => setEducation(e.target.value)}>
                        <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                        <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                        <FormControlLabel value="olevel" control={<Radio />} label="O Level" />
                        <FormControlLabel value="alevel" control={<Radio />} label="A Level" />
                        <FormControlLabel value="degree" control={<Radio />} label="Degree" />
                    </RadioGroup>
                </FormControl><br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Physical Activity</FormLabel>
                    <RadioGroup row value={physical} onChange={(e) => setPhysical(e.target.value)}>
                        <FormControlLabel value="vigorous_intensity" control={<Radio />} label="Vigorous Intensity" />
                        <FormControlLabel value="moderate_intensity" control={<Radio />} label="Moderate Intensity" />
                        <FormControlLabel value="sedentary" control={<Radio />} label="Sedentary" />
                    </RadioGroup>
                </FormControl><br />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Tobacco Smoking</FormLabel>
                    <RadioGroup row value={tobacco} onChange={(e) => setTobacco(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl><br />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Tobacco Chewing</FormLabel>
                    <RadioGroup row value={tobaccochew} onChange={(e) => setTobaccoChew(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl><br />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Alcohol</FormLabel>
                    <RadioGroup row value={alcohol} onChange={(e) => setAlcohol(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl><br />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Other Drugs</FormLabel>
                    <RadioGroup row value={other} onChange={(e) => setOther(e.target.value)}>
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                    </RadioGroup>
                </FormControl><br />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Snacks</FormLabel>
                    <RadioGroup row value={snacks} onChange={(e) => setSnacks(e.target.value)}>
                        <FormControlLabel value="normaluser" control={<Radio />} label="Normal User" />
                        <FormControlLabel value="nonuser" control={<Radio />} label="Non-User" />
                        <FormControlLabel value="heavyuser" control={<Radio />} label="Heavy User" />
                    </RadioGroup>
                </FormControl><br />
                <TextField label="Diseases (Other special diseases)" value={diseases} onChange={(e) => setDiseases(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} fullWidth />
                <Grid container justifyContent="center" paddingTop={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default AddPatient;
