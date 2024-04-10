import React from 'react';
import { Chat } from './Game/Chat/Chat';
import { Desplegable } from './Game/Desplegable';
import { MessageList } from "./Game/Chat/MessageList.jsx";
import { InputMessage } from "./Game/Chat/InputMessage.jsx";
import { useCookies } from "react-cookie";
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa extend-expect para agregar los matchers de jest-dom
///* eslint-disable no-undef */


// Mock del socket
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

describe('Chat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks antes de cada test
  });

  test('renders chat container and input field', async () => {
    const { queryAllByTestId } = render(<Chat />);
    await waitFor(() => {
      const chatContainers = queryAllByTestId('chat-container');
      expect(chatContainers.length).toBeGreaterThan(0); // Verifica que al menos un contenedor de chat esté presente
      chatContainers.forEach((container) => {
        expect(container).toBeInTheDocument();
      });
      expect(queryAllByTestId('input-message')).toHaveLength(1);
    });
  });

  // Agrega más tests según sea necesario para cubrir otros comportamientos del componente
});
