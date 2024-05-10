import { render, screen } from '@testing-library/react';
import { MessageList } from '../components/Game/Chat/MessageList';
import React from 'react';
import '@testing-library/jest-dom';
import { GameInfoContext } from '../context/gameinfo';

describe('MessageList', () => {
  const messagesMock = [
    { type: 'message', username: 'User1', text: 'Hello', time: '10:00', character: 'Character1' },
    { type: 'special', text: 'User1 has joined the chat' },
    { type: 'message', username: 'User2', text: 'Hi', time: '10:01', character: 'Character2' },
  ];

  const gameInfoMock = {
    characters: ['Character1', 'Character2'],
    usernames: ['User1', 'User2'],
  };

  beforeEach(() => {
    render(
      <GameInfoContext.Provider value={gameInfoMock}>
        <MessageList messages={messagesMock} />
      </GameInfoContext.Provider>
    );
  });
  test('renders MessageList correctly', () => {
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getAllByText(/preguntó:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/¿ha sido MrSoper con un cable de red en la cafeteria ?/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  test('renders correct number of Message and SpecialMessage components', () => {
    expect(screen.getAllByText(/User\d/)).toHaveLength(2); // 2 Message components
  });
});