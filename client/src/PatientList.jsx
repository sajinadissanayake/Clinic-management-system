import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { TextField, Button, Stack, IconButton, Avatar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Rightbar from '../components/Rightbar';

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
        <Sidebar/>
        <PageBody>
          <div>
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
            <div>
              {filteredUsers.map((user) => (
                <div key={user._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name} 
                    sx={{ 
                      width:80, 
                      height: 80,
                      backgroundColor: user.gender === 'male' ? 'skyblue' : 'pink' // Set background color based on gender
                    }} 
                  />
                  <div style={{ marginLeft: '20px' }}>
                    <div style={{ fontWeight: 'bold' }}>{user.nic}</div>
                    <div>{user.name}</div>
                    <div>
                      <Button variant='outlined' style={{ marginRight: '10px' }}>
                        <Link style={{ textDecoration: 'none' }} to={`/patient/${user._id}`}>View</Link>
                      </Button>
                      <Button variant='outlined' style={{ marginRight: '10px' }}>
                        <Link style={{ textDecoration: 'none' }} to={`/updatepatient/${user._id}`}>Update</Link>
                      </Button>
                      <Button variant='outlined' color='error' onClick={() => handleDelete(user._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageBody>
        <Rightbar/>
      </Stack>
    </div>
  );
}

export default PatientList;
