import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import blog from './images/blogp.png';
import patient from './images/patient.jpg';
import medi from './images/record.jpg';
import blood from './images/sugar.jpg';
import rep from './images/report.jpg';
import ap from './images/appointment.jpg';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import hospital from './images/hospital.jpg';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10, // Add border radius here
  transition: 'transform 0.3s ease-in-out', // Add transition effect
  '&:hover': {
    transform: 'scale(1.05)', // Zoom effect on hover
  },
}));

const SquareCard = styled(Item)(({ theme }) => ({
  height: '100%', // Match height to width to make it square
}));

function NurseDash() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = currentDateTime.getHours();
    let greetingMessage = '';

    if (hour >= 5 && hour < 12) {
      greetingMessage = 'Good Morning Nurse...!';
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = 'Good Afternoon Nurse...!';
    } else if (hour >= 18 && hour < 22) {
      greetingMessage = 'Good Evening Nurse...!';
    } else {
      greetingMessage = 'Good Night Nurse ....!';
    }

    setGreeting(greetingMessage);
  }, [currentDateTime]);

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Grid container spacing={2} justifyContent="center">
          {/* New Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ maxWidth: '100%', margin: 'auto', marginBottom: 2, borderRadius: 8 }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  Dashboard
                  <Typography variant="body2" component="span" style={{ float: 'right' }}>
                    {currentDateTime.toLocaleTimeString()}
                  </Typography>
                </Typography>
                
                <Grid container justifyContent="center">
                  <Grid item xs={6} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Welcome
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {greeting}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body1" component="div">
                      <CardMedia
                        component="img"
                        height="150"
                        image={hospital}
                        alt="Welcome Image"
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Main Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ maxWidth: '100%', margin: 'auto', marginBottom: 4 ,borderRadius: 8 }}>
              <CardContent>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} sm={4} md={4}>
                    <Link to="/blogadd" style={{ textDecoration: 'none' }}>
                      <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={blog}
                            alt="Prescription"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              Posts
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <Link to="/patientslist" style={{ textDecoration: 'none' }}>
                      <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={patient}
                            alt="Patients"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              Patients
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <Link to="/Mselect" style={{ textDecoration: 'none' }}>
                      <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={medi}
                            alt="Medical Records"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              Medical Records
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    <Link to="/bsSelect" style={{ textDecoration: 'none' }}>
                      <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={blood}
                            alt="Blood Sugar"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              Blood Sugar
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                    
                  <Link to="/clinicpatients" style={{ textDecoration: 'none' }}>
                    <Item>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="100"
                          image={ap}
                          alt="Appointments"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="body2" component="div">
                          Clinic Patients
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Item></Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={4}>
                  <Link to="/clinicdates" style={{ textDecoration: 'none' }}>
                    <Item>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="100"
                          image={ap}
                          alt="Appointments"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="body2" component="div">
                          Clinic Calender
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Item></Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

     
        </Grid>
      </Stack>
    </div>
  );
}

export default NurseDash;
