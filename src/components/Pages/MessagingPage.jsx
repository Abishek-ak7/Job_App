// MessagingPage.js
import React, { useState } from 'react';
import Message from '../Elements/Message';
import Navbar from '../Navigation/Navbar';

const MessagingPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how can I help you today?', isSentByUser: false },
    { text: 'Hi, I need assistance with my account.', isSentByUser: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    const messageToSend = {
      text: newMessage,
      isSentByUser: true,
    };

    // Add the new message to the chat
    setMessages((prevMessages) => [...prevMessages, messageToSend]);

    // Simulate receiving a reply (this can be from an API or static message)
    setTimeout(() => {
      const reply = {
        text: 'I\'m here to help! Can you provide more details?',
        isSentByUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, reply]);
    }, 1500); // Simulating a delay for receiving a response

    // Clear the input field
    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-2xl">
        <Navbar/>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Chat with Support
      </h1>

      {/* Chat window */}
      <div className="bg-white p-6 rounded-2xl shadow-xl h-96 overflow-y-auto mb-6 border border-gray-200">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.text}
            isSentByUser={message.isSentByUser}
          />
        ))}
      </div>

      {/* Input field to send a new message */}
      <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:bg-blue-600 hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessagingPage;
