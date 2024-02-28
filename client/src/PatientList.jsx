import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, Stack } from '@mui/material';
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
     </div>
     </PageBody>
            <Rightbar/>
            </Stack>
   
    </div>
  );
}

export default PatientList;
