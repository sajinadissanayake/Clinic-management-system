import React from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
import { Stack } from '@mui/material';

 function Home() {
  return (
    <div>
      <Navbar/>
    <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar/>
          <Feed/>
          <Rightbar/>
         


        </Stack>

     
    </div>
  )
}
export default Home;