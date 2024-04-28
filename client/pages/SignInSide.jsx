import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signin from './images/signin.json';
import Lottie from 'lottie-react'; // Import Lottie
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        healthylifestyle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignInSide() {

  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const utype = "patient";
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd === confirmPwd) {
      // Passwords match, proceed with registration
      const url = "http://localhost:3001/api/users";
      const data = {
        nic: nic,
        email: email,
        password: pwd,
        utype: utype,
      };
      try {
        const { data: res } = await axios.post(url, data);
        console.log(res.message);
        navigate('/login');
      } catch (error) {
        // Display error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      }
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
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Lottie animationData={signin} />
          </Grid>
          <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <VpnKeyIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                label="NIC"
                name="nic"
                value={nic}
                autoFocus
                onChange={(e) => setNic(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                margin="normal"
                required
                fullWidth
                autoFocus
         
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '1rem' }}
              />
              <TextField
                label="Password"
                type="password"
                name="pwd"
                value={pwd}
                margin="normal"
                required
                fullWidth
                autoFocus
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
                margin="normal"
                required
                fullWidth
                autoFocus
              />
               
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign in
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {'Do you have an account? log in'}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default SignInSide;
