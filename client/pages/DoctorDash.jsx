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
import PageBody from '../components/PageBody';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DoctorDash() {
  return (
    <div>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <PageBody>

            
      
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Stack direction="column" spacing={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Create Prescription
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
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Add Annoucement
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
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    card 3
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      </Grid>
            
            
            
            
            
            
            
        </PageBody> <Announcements /></Stack>
      





    </div>
  );
}

export default DoctorDash;
