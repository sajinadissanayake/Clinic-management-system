import React from 'react';
import Navbar from '../../components/Navbar';
import { Box, Breadcrumbs, Stack, Typography,TextField,Table,TableHead,TableBody, TableRow, TableCell,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Announcements from '../../components/Announcements';
import { useState,useEffect } from 'react';

import axios from 'axios';
import PageBody from '../../components/PageBody';
import Sidebar from '../../components/Sidebar';

function PatientSelect() {

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
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.nic && user.nic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      
  
  return (
    <div>
      <Navbar />

      {/* Add margin or padding to create space */}
      <div style={{ margin: '20px 0', width: '100%' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Dashboard
          </Link>
          <Typography color="text.primary">select patient</Typography>
        </Breadcrumbs>
      </div>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar/>
       <PageBody>

              
       <TextField
         label="Search"
         variant="outlined"
         value={searchTerm}
         onChange={handleSearch}
         
       />
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Name</TableCell>
             <TableCell>Action</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {filteredUsers.map((user) => (
             <TableRow key={user._id}>
                <TableCell>{user.nic}</TableCell>
               <TableCell>{user.name}</TableCell>
               <TableCell>

               <Button variant='outlined' style={{ marginLeft: '10px' }}><Link style={{ textDecoration: 'none' }} to={`/prescpatient/${user._id}`}>Next</Link></Button>
              

                
                 
                 
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
          
       </PageBody>
        <Announcements />
      </Stack>
    </div>
  );
}

export default PatientSelect;
