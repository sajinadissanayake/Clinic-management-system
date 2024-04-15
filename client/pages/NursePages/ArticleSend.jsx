import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Button, Grid, Stack, TextField, TextareaAutosize } from '@mui/material';
import PageBody from '../../components/PageBody';
import axios from 'axios';
import NurseLeftbar from './NurseLeftbar';
import Announcements from '../../components/Announcements';
import Swal from 'sweetalert2'; // Import SweetAlert

function ArticleSend() {
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleSendEmail = async () => {
      try {
          const formData = new FormData();
          formData.append('subject', subject);
          formData.append('text', text);
          formData.append('image', image); // Add the image file to form data
  
          const response = await axios.post('http://localhost:3001/sendArticleToPatients', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log(response.data);
          // Show success alert
          Swal.fire({
              icon: 'success',
              title: 'Email Sent',
              text: 'The email has been sent successfully!'
          });
          // Reset form fields
          setSubject('');
          setText('');
          setImage(null);
      } catch (error) {
          console.error('Error sending email:', error);
          // Show error alert
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to send email. Please try again later.'
          });
      }
  };
  

    return (
        <div>
            <Navbar pageTitle="Article Sender" />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar />
                <PageBody>
                    <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
                        <h2>Send Article via Email</h2>
                        <TextField
                            label="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            fullWidth
                        /><br /><br />
                        <TextareaAutosize
                            minRows={5}
                            placeholder="Content"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: '100%', padding: '10px' }}
                        /><br /><br />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        /><br /><br />
                        <Grid container justifyContent="center" paddingTop={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Send Email
                            </Button>
                        </Grid>
                    </form>
                </PageBody>
                <Announcements />
            </Stack>
        </div>
    );
}

export default ArticleSend;
