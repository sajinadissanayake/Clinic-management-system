import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Grid, Container } from '@mui/material';
import Navbar from '../Navbar';
import Layout from '../Layout';
import Header from './Header';
import ALayout from './ALayout';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    // Simulate sending message to the assistant
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate receiving response from the assistant
    setTimeout(() => {
      const response = { text: 'This is a response from the chat assistant.', sender: 'assistant' };
      setMessages([...newMessages, response]);
    }, 500);
  };

  return (
    <div>
    
   <Header/>
    <ALayout>
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', minHeight: '300px', marginTop: '100px' }}>
        <Typography variant="h5" gutterBottom>
          Chat Assistant
        </Typography>
        <div style={{ overflowY: 'auto', maxHeight: '200px', marginBottom: '10px' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
              <Typography variant="body1" style={{ marginBottom: '5px' }}>
                {message.text}
              </Typography>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message here..."
                value={inputValue}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth variant="contained" type="submit">
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container></ALayout></div>
  );
};

export default ChatAssistant;
