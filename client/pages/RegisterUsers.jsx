import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Stack, Select, MenuItem, Button, FormControl, InputLabel, Typography, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Rightbar from '../components/Rightbar';
import { useNavigate } from 'react-router-dom';

function RegisterUsers() {
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [utype, setUtype] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd === confirmPwd) {
      // Passwords match, proceed with registration
      console.log("Passwords match. Proceed with registration...");
      navigate('/');
    } else {
      // Passwords don't match, show error
      setPasswordMatch(false);
      console.log("Passwords do not match.");
    }
  };

  const handleConfirmPwdChange = (e) => {
    setConfirmPwd(e.target.value);
    setPasswordMatch(pwd === e.target.value);
  };

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <PageBody>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" gutterBottom>
                Register Users
              </Typography>
              <TextField
                label="NIC"
                name="nic"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '1rem' }}
              />
              <TextField
                label="Password"
                type="password"
                name="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                style={{ marginTop: '1rem' }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPwd"
                value={confirmPwd}
                onChange={handleConfirmPwdChange}
                error={!passwordMatch}
                helperText={!passwordMatch && "Passwords do not match"}
                style={{ marginTop: '1rem' }}
              />
              <FormControl fullWidth>
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="utype"
                  value={utype}
                  label="User Type"
                  onChange={(e) => setUtype(e.target.value)}
                >
                  <MenuItem value={'doctor'}>Doctor</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'receptionist'}>Receptionist</MenuItem>
                </Select>
              </FormControl>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                style={{ marginTop: '1rem' }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </PageBody>
        <Rightbar />
      </Stack>
    </div>
  );
}

export default RegisterUsers;