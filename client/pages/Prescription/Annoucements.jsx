import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Announcements() {
  

    const [anns, setAnn] = useState([])
    
    useEffect (()=> {
        axios.get('http://localhost:3001/getAnnouncement')
        .then(result => {
            console.log(result.data); // Log the fetched data to check its structure
            setAnn(result.data);
        })
        .catch(err => console.log(err));
    }, []);
  
  return (
    <div>
      <h2>Announcements</h2>
      
      {
    anns.map((ann) => (
        <tr key={ann._id}>
            <td>{ann.title}</td>
            <td>{ann.announcement}</td> {/* corrected spelling here */}
            <td>{ann.doctor}</td>
            <td>{ann.Date}</td>
        </tr>
    ))
}

              
    </div>
  );
}

export default Announcements;
