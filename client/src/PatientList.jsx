import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { TextField, Button, Stack, IconButton, Avatar, Container, Grid, Card, CardContent, Typography } from '@mui/material'; // Import Material-UI components
import { Add as AddIcon } from '@mui/icons-material';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Rightbar from '../components/Rightbar';
import NurseDash from '../pages/NurseDash';
import NurseLeftbar from '../pages/NursePages/NurseLeftbar';

function PatientList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <NurseLeftbar/>
        <PageBody>
          <Container style={{ minWidth: "800px" }}> {/* Adjust minWidth directly */}
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
              <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Link to="/addpatient" style={{ textDecoration: 'none' }}>
                <IconButton color="primary" aria-label="add">
                  <AddIcon />
                </IconButton>
              </Link>
            </Stack><br/>
            <Grid container spacing={3}>
              {filteredUsers.map((user, index) => (
                <Grid item key={user._id} xs={12} sm={6} md={6}> {/* Set xs to 12 to display one card in a row on smaller screens */}
                  <Card>
                    <CardContent>
                      <Avatar 
                        src={user.avatar} 
                        alt={user.name} 
                        sx={{ 
                          width: 80, 
                          height: 80,
                          backgroundColor: user.gender === 'male' ? 'skyblue' : 'pink' // Set background color based on gender
                        }} 
                      />
                      <Typography variant="h6" component="div">
                        {user.nic}
                      </Typography>
                      <Typography variant="subtitle1" component="div">
                        {user.name}
                      </Typography>
                      <div>
                        <Button variant='outlined' style={{ marginRight: '10px' }}>
                          <Link style={{ textDecoration: 'none' }} to={`/patient/${user._id}`}>View</Link>
                        </Button>
                        <Button variant='outlined' color='error' onClick={() => handleDelete(user._id)}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </PageBody>
        <Rightbar/>
      </Stack>
    </div>
  );
}

export default PatientList;
