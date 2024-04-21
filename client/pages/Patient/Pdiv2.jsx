import React from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Pdiv2() {
  return (
    <div>
      <Card style={{ borderRadius: 10, marginTop: 10 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
           menu
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Prescriptions</Typography>
                  <Typography variant="body2">
                    Prescription content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Reports</Typography>
                  <Typography variant="body2">
                    Report content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Checkups</Typography>
                  <Typography variant="body2">
                    Checkup content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Blood Sugar</Typography>
                  <Typography variant="body2">
                    Blood sugar content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Pressure</Typography>
                  <Typography variant="body2">
                    Pressure content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Cholesterol</Typography>
                  <Typography variant="body2">
                    Cholesterol content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Clinic History</Typography>
                  <Typography variant="body2">
                    Clinic history content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Report Request</Typography>
                  <Typography variant="body2">
                    Report request content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Record Request</Typography>
                  <Typography variant="body2">
                    Record request content goes here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Pdiv2
