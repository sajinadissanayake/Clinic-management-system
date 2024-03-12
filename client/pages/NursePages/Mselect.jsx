import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { TextField, Button, Stack, IconButton, Avatar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import PageBody from '../../components/PageBody';
import Rightbar from '../../components/Rightbar';


function Mselect() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.nic && user.nic.toLowerCase().includes(searchTerm.toLowerCase())
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
                label="Search by Nic or Name"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
              />
              
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
                        <Link style={{ textDecoration: 'none' }} to={`/medicals/${user.nic}`}>View Examinations</Link>
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

export default Mselect;
