import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import rep from './images/report.jpg';
import annoucement from './images/annoucement.jpg';
import cinic from './images/cinic.jpg';
import blood from './images/sugar.jpg';
import { Link } from 'react-router-dom';
import hospital from './images/hospital.jpg';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

function PharmacyDash() {
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
      greetingMessage = 'Good Morning User...!';
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = 'Good Afternoon User...!';
    } else if (hour >= 18 && hour < 22) {
      greetingMessage = 'Good Evening User...!';
    } else {
      greetingMessage = 'Good Night User ....!';
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
                  <CardMedia
                        component="img"
                        height="150"
                        image={hospital}
                        alt="Welcome Image"
                      />
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
                  <Grid item xs={6} sm={4} md={3}>
                    <Link to="/pselect" style={{ textDecoration: 'none' }}>
                      <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={rep}
                            alt="Prescription"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              New prescritions
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Link to="/allprescriptions" style={{ textDecoration: 'none' }}>
                    <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={rep}
                            alt="Prescription"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              Other prescritions
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Link to="/Mselect" style={{ textDecoration: 'none' }}>
                      <Item>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="100"
                            image={cinic}
                            alt="Medical Records"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                              /////////
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
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
                             ////////
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Item>
                    </Link>
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

export default PharmacyDash;
