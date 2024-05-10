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
import { Grid, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Body from "../components/PageBody";
import PageBody from "../components/PageBody";
import Rightbar from "../components/Rightbar";
import NurseLeftbar from "../pages/NursePages/NurseLeftbar";
import Layout from "../components/Layout";



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
    const [blood, setBlood] = useState('');
    const [sh, setSH] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [nicError, setNicError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Perform form validation here
        if (!name || !nic || !email || !age || !dob || !address || !pnumber || !moh || !phm || !phi || !gnd || !dsd || !neighbour || !diseases || !allergies || !blood || !sh || !image) {
            // Display error message using SweetAlerts if any field is empty
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
            return; // Exit early if validation fails
        }
    
        // Continue with form submission if validation passes
        const formData = new FormData();
        formData.append('image', image); // Append the uploaded image to form data
        formData.append('name', name);
        formData.append('nic', nic);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('maritial', maritial);
        formData.append('pnumber', pnumber);
        formData.append('moh', moh);
        formData.append('phm', phm);
        formData.append('phi', phi);
        formData.append('gnd', gnd);
        formData.append('dsd', dsd);
        formData.append('neighbour', neighbour);
        formData.append('education', education);
        formData.append('physical', physical);
        formData.append('tobacco', tobacco);
        formData.append('tobaccochew', tobaccochew);
        formData.append('alcohol', alcohol);
        formData.append('other', other);
        formData.append('snacks', snacks);
        formData.append('diseases', diseases);
        formData.append('allergies', allergies);
        formData.append('sh', sh);
        formData.append('blood', blood);
        
    
        axios.post("http://localhost:3001/AddPatient", formData)
        .then(response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Patient added successfully',
            });
            navigate('/patientslist');
        })
        .catch(error => {
            if (error.response && error.response.data.error === 'Patient with this NIC already exists') {
                // If NIC already exists in the database, set the NIC error state
                setNicError('Patient with this NIC already exists');
                // Display error message using SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Patient with this NIC already exists',
                });
            } else {
                console.log(error);
                // Display error message using SweetAlerts if an error occurs during submission
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong. Please try again later!',
                });
            }
        });
};

    return (
        <div>
            <Navbar pageTitle="Add Patient" />
            <Layout>
            <Stack direction="row" spacing={2} justifyContent="space-between">
           <NurseLeftbar/>
            <PageBody>
            <div style={{ height: '80vh', overflowY: 'auto' }}>
              
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
                <FormControl component="fieldset">
                    <FormLabel component="legend">Blood type</FormLabel>
                    <RadioGroup row value={blood} onChange={(e) => setBlood(e.target.value)}>
                        
                    <FormControlLabel value="A+" control={<Radio />} label="A+" />
                    <FormControlLabel value="A-" control={<Radio />} label="A-" />
                    <FormControlLabel value="B+" control={<Radio />} label="B+" />
                    <FormControlLabel value="B_" control={<Radio />} label="B-" />
                    <FormControlLabel value="AB+" control={<Radio />} label="AB+" />
                    <FormControlLabel value="AB-" control={<Radio />} label="AB-" />
                    <FormControlLabel value="O+" control={<Radio />} label="O+" />
                    <FormControlLabel value="O-" control={<Radio />} label="O-" />
                    </RadioGroup>
                </FormControl><br />
                <TextField label="Diseases (Other special diseases)" value={diseases} onChange={(e) => setDiseases(e.target.value)} fullWidth /><br/><br/>
                <TextField label="Allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} fullWidth /><br/><br/>
                <TextField
                    label="Surgical History"
                    multiline
                    rows={4} 
                    onChange={(e) => setSH(e.target.value)}
                    fullWidth
                    value={sh}
                /><br/><br/>



                <FormLabel component="legend">NIC Image(attach patient NIC image)</FormLabel>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <Grid container justifyContent="center" paddingTop={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </form></div>
            

            </PageBody>
            <Rightbar/>
            </Stack>




            </Layout>
          
        </div>
    );
}

export default AddPatient;
