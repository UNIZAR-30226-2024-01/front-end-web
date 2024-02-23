import React from 'react';

export const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index} className="message">{message}</li>
      ))}
    </ul>
  );
};
