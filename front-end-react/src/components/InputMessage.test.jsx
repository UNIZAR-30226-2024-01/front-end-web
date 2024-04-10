import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputMessage } from './Game/Chat/InputMessage';


describe('InputMessage component', () => {
  test('should call sendMessage function with input value when submitting the form', () => {
    // Mock sendMessage function
    const sendMessageMock = jest.fn();

    // Render the InputMessage component
    const { getByPlaceholderText, getByText } = render(
      <InputMessage sendMessage={sendMessageMock} />
    );

    // Simulate user typing a message
    const inputElement = getByPlaceholderText('escribe aquí...');
    fireEvent.change(inputElement, { target: { value: 'Test message' } });

    // Simulate user submitting the form
    const submitButton = getByText('Enviar');
    fireEvent.click(submitButton);

    // Check if sendMessage function is called with the correct message
    expect(sendMessageMock).toHaveBeenCalledWith('Test message');
  });

});
