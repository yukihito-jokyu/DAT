import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analysis.css';
import './Chat.css';

function Chat({ image }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnalysisMode, setIsAnalysisMode] = useState(true);

  // 画像が変更されるたびに解析ボタン復活
  useEffect(() => {
    setIsAnalysisMode(true);
    setMessages([]);
  }, [image]);

  // メッセージを送信する関数
  const sendMessage = async () => {
    if (input.trim() === '' || loading) return;

    const newMessage = { sender: 'user', text: input };

    setLoading(true);

    // サーバーにメッセージを送信して応答をリストに格納
    try {
      const response = await axios.post('http://localhost:5000/gemini/text', { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    setInput('');
    setLoading(false);
  };

  // 画像を解析する関数
  const analyzeImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/gemini/image', { image_data: image });
      const botMessage = { sender: 'bot', text: response.data.text };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsAnalysisMode(false);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
    setLoading(false);
  };

  return (
    <div className='chat-wrapper'>
      <div style={{ marginTop: '64px' }}></div>
      <div className='chat-window'>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      {isAnalysisMode ? (
        <div className='chat-input'>
          <button className='analyze-button' onClick={analyzeImage} disabled={loading}>
            画像を解析
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Chat;
