import React from 'react';
import Navbar from '../components/Navbar';
import { Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'; // Import Paper component separately
import Announcements from '../components/Announcements';
import prescimg from './images/p.jpg';
import ann from './images/a.jpg';
import { Link } from 'react-router-dom';
import blog  from './images/blogp.png'
import patient from './images/patient.jpg'
import medi from './images/medic.jpg'
import blood from './images/bloods.jpeg'
import rep from './images/report.jpg'
import ap from './images/appo.jpg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function NurseDash() {
  return (
    <div>
      <Navbar/>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
         Nurse Dashboard
        </Typography>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
            <Link to="/blogadd" style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog}
                    alt="prescription"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Posts
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card></Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
            <Link to="/patientslist" style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={patient}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Patients
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card></Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
            <Link to="/Mselect" style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={medi}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                         Medical records
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card></Link>
            </Stack>
          </Grid>
          {/* Repeat the structure for the next 3 cards */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
            <Link to="/bsSelect" style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={blood}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Blood Sugar
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card></Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={rep}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Reports
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={ap}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Check Appointments
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Grid>
        </Grid>
        <Announcements />
      </Stack>
    </div>
  );
}

export default NurseDash;
