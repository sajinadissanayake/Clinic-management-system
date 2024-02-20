import React from 'react'
import { useState,useEffect } from 'react';
import { Box,Grid,styled,Paper,Stack,CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function Dash() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    fetchPatientsCount();
    fetchReportsCount();
  }, []);

  const fetchPatientsCount = () => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
        setPatientsCount(data.length);
      })
      .catch(error => console.error('Error fetching patients count:', error));
  };

  const fetchReportsCount = () => {
    fetch('http://localhost:3001/getReports')
      .then(response => response.json())
      .then(data => {
        setReportsCount(data.length);
      })
      .catch(error => console.error('Error fetching reports count:', error));
  };







  return (



    
    <div>

<Box sx={{ flexGrow: 1 }} height={70} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack spacing={2} direction={'row'}>
        <CardActionArea>
        <Card sx={{ minWidth: 345 }}>
          
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Patients
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {patientsCount}
                    </Typography>
                </CardContent>
          

               
        </Card>  </CardActionArea>


        <CardActionArea>
                <Card sx={{ minWidth: 345 }}>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Reports
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {reportsCount}
                    </Typography>
                </CardContent>
               
        </Card></CardActionArea>


                </Stack>
        </Grid>
      </Grid>

      {/* 2nd row */}
      <Grid container spacing={2} paddingTop={3}>
        <Grid item xs={8}>
        <Stack spacing={2} direction={'row'}>
        <CardActionArea>
        <Card sx={{ minWidth: 345 }}>
          
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Staff members
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    00
                    </Typography>
                </CardContent>
          

               
        </Card>  </CardActionArea>


        <CardActionArea>
                <Card sx={{ minWidth: 345 }}>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Doctors
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    000
                    </Typography>
                </CardContent>
               
        </Card></CardActionArea>


                </Stack>
        </Grid>
        


      </Grid>

   
    </Box>








      
    </div>
  )
}

export default Dash
