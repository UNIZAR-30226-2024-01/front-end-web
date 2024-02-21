import React from 'react';
import './MessageList.css';

export const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index} className="message">{message}</li>
      ))}
    </ul>
  );
};
