import React, { useState } from 'react';
import axios from 'axios';
import './Analysis.css';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // メッセージを送信する関数
  const sendMessage = async () => {
    if (input.trim() === '' || loading) return;

    const newMessage = { sender: 'user', text: input };

    setLoading(true);

    // サーバーにメッセージを送信して応答をリストに格納
    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className='chat-wrapper'>
      <div className='chat-window'>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className='chat-input'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>送信</button>
      </div>
    </div>
  );
}

export default Chat;
