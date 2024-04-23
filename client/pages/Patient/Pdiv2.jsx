import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Container } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HistoryIcon from '@mui/icons-material/History';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShortcutIcon from '@mui/icons-material/Shortcut';

function Pdiv2() {
  return (
    <div>
      <Container>
          <br/>

          <Grid container spacing={2}>

          <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
              <CardContent>
                <Button component={Link} to="/patientpresc">
                  <Grid container direction="column" alignItems="center" spacing={1}>
                    <Grid item>
                      <DescriptionIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">Prescriptions</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/patientrepo">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                      <TextSnippetIcon sx={{ fontSize: 40, color: 'background.bg2' }} />

                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Reports</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/patientcheckups">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                      <MonitorHeartIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Checkups</Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/patientbs">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                        <WaterDropIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Blood Sugar</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/patientbp">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                        <WaterDropIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Blood Pressure</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/patientLp">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                        <WaterDropIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Cholestrol</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/pselect">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                        <HistoryIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Clinic History</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/pselect">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                      <ShortcutIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1"> Report Requests</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={4}>
            <Card sx={{ borderRadius: 6 }}>
                <CardContent>
                  <Button component={Link} to="/pselect">
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid item>
                        <ShortcutIcon sx={{ fontSize: 40, color: 'background.bg2' }} />
                      </Grid>
                      <Grid item>
                      <Typography variant="body1">Record Requests</Typography>

                      </Grid>
                    </Grid>
                  </Button>
                </CardContent>
              </Card>
            </Grid>


            
         
          </Grid>
          </Container><br/><br/>
    </div>
  );
}

export default Pdiv2;
