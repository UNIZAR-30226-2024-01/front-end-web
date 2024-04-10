import React from 'react';
import { render } from '@testing-library/react';
import { MessageList } from './Game/Chat/MessageList';

describe('MessageList component', () => {
  test('should render a list of messages', () => {
    const messages = [
      { type: 'message', username: 'user1', text: 'Hello' },
      { type: 'message', username: 'user2', text: 'Hi there' },
      { type: 'special', text: 'Special message' },
    ];

    const { getByText } = render(<MessageList messages={messages} />);

    // Verificar que los mensajes se rendericen correctamente
    expect(getByText('Hello')).toBeInTheDocument();
    expect(getByText('Hi there')).toBeInTheDocument();
    expect(getByText('Special message')).toBeInTheDocument();
  });

  test('should scroll to bottom when messages change', () => {
    const messages = [
      { type: 'message', username: 'user1', text: 'Hello' },
      { type: 'message', username: 'user2', text: 'Hi there' },
      { type: 'special', text: 'Special message' },
    ];

    const { rerender } = render(<MessageList messages={messages} />);

    // Simular cambio en los mensajes
    const newMessages = [...messages, { type: 'message', username: 'user3', text: 'New message' }];
    rerender(<MessageList messages={newMessages} />);

    // Obtener el elemento de la lista de mensajes
    const messageList = document.querySelector('.message-list');

    // Verificar que el scroll se ha movido hacia abajo
    expect(messageList.scrollTop).toBe(messageList.scrollHeight);
  });
});
