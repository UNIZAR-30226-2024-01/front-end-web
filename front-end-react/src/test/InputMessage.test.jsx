import { render, fireEvent, screen } from '@testing-library/react';
import { InputMessage } from '../components/Game/Chat/InputMessage';
import React from 'react';
import '@testing-library/jest-dom';

describe('InputMessage', () => {
  const sendMessageMock = jest.fn();

  beforeEach(() => {
    render(<InputMessage sendMessage={sendMessageMock} />);
  });

  test('renders InputMessage correctly', () => {
    expect(screen.getByPlaceholderText('escribe aquí...')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
    expect(screen.getByText('GIFs')).toBeInTheDocument();
  });

  test('calls sendMessage when form is submitted', () => {
    fireEvent.change(screen.getByPlaceholderText('escribe aquí...'), { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Enviar'));

    expect(sendMessageMock).toHaveBeenCalledWith('Test message');
  });
});