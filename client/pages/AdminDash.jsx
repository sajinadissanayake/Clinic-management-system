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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AdminDash() {
  return (
    <div>
      <Navbar/>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Admin Dashboard
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
                    image={prescimg}
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
                    image={ann}
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
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={prescimg}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                         Doctors
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Grid>
          {/* Repeat the structure for the next 3 cards */}
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="column" spacing={2}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  {/* Add appropriate image and alt text */}
                  <CardMedia
                    component="img"
                    height="140"
                    image={prescimg}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Nurse
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
                    image={prescimg}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                     Admins
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
                    image={prescimg}
                    alt="contemplative reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Card 6
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

export default AdminDash;
