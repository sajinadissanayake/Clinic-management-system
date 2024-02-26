import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Autocomplete, Button, Grid, Stack, TextField, TextareaAutosize } from '@mui/material'; // Import TextareaAutosize
import Sidebar from '../components/Sidebar';
import PageBody from '../components/PageBody';
import Rightbar from '../components/Rightbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

const typeOptions = [
  { label: 'main' },
  { label: 'other' },
];

function BlogAdd() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('type', selectedType?.label); // Access label of selected type

    axios.post("http://localhost:3001/Addblog", formData)
      .then(response => {
        console.log(response);
        navigate('/');
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar/>
        <PageBody>
          <form onSubmit={handleSubmit}>
            <h2>Add Blog Post</h2>
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth /><br/><br/>
            {/* Replace TextField with TextareaAutosize for the large text area */}
            <TextareaAutosize 
              minRows={5} // Set minimum rows to show
              placeholder="Content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              style={{ width: '100%', padding: '10px' }} 
            /><br/><br/>
            <Autocomplete
              value={selectedType}
              onChange={(event, newValue) => setSelectedType(newValue)}
              disablePortal
              id="combo-box-demo"
              options={typeOptions}
              getOptionLabel={(option) => option.label} // Provide a function to extract label
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Type" />}
            /><br/>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Grid container justifyContent="center" paddingTop={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </form>
        </PageBody>
        <Rightbar/>
      </Stack>
    </div>
  );
}

export default BlogAdd;
