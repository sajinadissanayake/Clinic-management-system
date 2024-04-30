// ChatBot.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setConversation([...conversation, { user: true, message }]);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', { message });
      setConversation([...conversation, { user: true, message }, { user: false, message: response.data.message }]);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        {conversation.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.user ? 'right' : 'left' }}>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;