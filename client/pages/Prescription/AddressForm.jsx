import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState,useEffect, } from 'react';
import { Link } from 'react-router-dom';

import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Stack } from '@mui/material';

export default function AddressForm() {



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
    <React.Fragment>
        
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
               <TableCell>{user.name}</TableCell>
               <TableCell>

               <Button variant='outlined' style={{ marginLeft: '10px' }}><Link style={{ textDecoration: 'none' }} to={`/patient/${user._id}`}>View</Link></Button>
               <Button variant='outlined' style={{ marginLeft: '10px' }}><Link style={{ textDecoration: 'none' }} to={`/updatepatient/${user._id}`}>Update</Link></Button>

                
                 
                 <Button variant='outlined' color='error' style={{ marginLeft: '10px' }} onClick={() => handleDelete(user._id)}>Delete</Button>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
    </React.Fragment>
  );
}
