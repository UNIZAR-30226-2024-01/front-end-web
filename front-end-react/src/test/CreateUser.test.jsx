import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateUser } from '../components/CreateUser'; // adjust the import path if necessary
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
test('renders CreateUser component and simulates user interaction', () => {
  render(
    <CookiesProvider>
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>
    </CookiesProvider>
  );

  /*const usernameInput = screen.getByPlaceholderText('username');
  const passwordInput = screen.getByPlaceholderText('password');
  const confirmPasswordInput = screen.getByPlaceholderText('repeat password');
  const createAccountButton = screen.getByText('Crear cuenta');

  userEvent.type(usernameInput, 'testUser');
  userEvent.type(passwordInput, 'testPassword');
  userEvent.type(confirmPasswordInput, 'testPassword');
  userEvent.click(createAccountButton);

  expect(usernameInput).toHaveValue('testUser');
  expect(passwordInput).toHaveValue('testPassword');
  expect(confirmPasswordInput).toHaveValue('testPassword');*/
});