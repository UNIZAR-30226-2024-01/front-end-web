import React from 'react';
import { Chat } from '../components/Game/Chat/Chat';
import { Desplegable } from '../components/Game/Desplegable';
import { MessageList } from "../components/Game/Chat/MessageList.jsx";
import { InputMessage } from "../components/Game/Chat/InputMessage.jsx";
import { useCookies } from "react-cookie";
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { DesplegablesContext } from "../context/desplegables.jsx"
import { SocketContext } from "../context/socket.jsx";
import io from 'socket.io-client';

import '@testing-library/jest-dom'; 


jest.mock('../socketio.js', () => ({
  socket: {
    auth: { username: 'testUser', group: 'testGroup' },
    connect: jest.fn(),
    disconnect: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  onConnect: jest.fn(),
  onChatResponse: jest.fn(),
  onChatTurn: jest.fn(),
}));

const mockDesplegablesContext = {
  chatDesplegado: true,
  setChatDesplegado: jest.fn(),
};

const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
};


describe('Chat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks antes de cada test
  });

  test('renders Chat component', () => {
    const mockSocket = {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    };

    render(
      <DesplegablesContext.Provider value={{ chatDesplegado: false, setChatDesplegado: jest.fn() }}>
        <SocketContext.Provider value={{ socket: mockSocket }}>
          <Chat />
        </SocketContext.Provider>
      </DesplegablesContext.Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('sends message when input is filled and submitted', async () => {
    const sendMessageMock = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <InputMessage sendMessage={sendMessageMock} />
    );

    const inputField = getByPlaceholderText('escribe aquí...');
    const submitButton = getByText('Enviar');

    fireEvent.change(inputField, { target: { value: 'Hola grupo!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalledWith('Hola grupo!');
    });
  });
  
});
