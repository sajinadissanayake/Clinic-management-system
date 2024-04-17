import React from 'react'
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
import login from './images/login.json'
import Lottie from 'lottie-react'; // Import Lottie
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();

function Login() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const url = "http://localhost:3001/api/auth";
          const data = new FormData(event.currentTarget);
          const postData = {
            email: data.get('email'),
            password: data.get('password'),
          };
          const { data: res } = await axios.post(url, postData);
          //localStorage.setItem("token", res.data);
          localStorage.setItem("loggedInUser", JSON.stringify(res.user));
          
          const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
          if (loggedInUser.utype == "doctor") {
            window.location = "/doctordash";
          } else if (loggedInUser.utype == "admin") {
            window.location = "/admindash";
          } else if (loggedInUser.utype == "pharmacy"){
            window.location = "/pharmacydash";
          }else if (loggedInUser.utype == "nurse"){
            window.location = "/nursedash";
          }else if (loggedInUser.utype == ","){
            window.location = "/nursedash";
          }

          

         
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            console.log(error.response.data.message);
          }
        }
      };


  return (
    <div>

<ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
    
        
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        <Lottie animationData={login} /></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
             Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
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
  )
}

export default Login
