import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../components/Login'; 
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';

test('renders Login component', () => {
  render(
    <CookiesProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </CookiesProvider>
  );

  const loginButton = screen.getByText('Iniciar sesión');
  const usernameInput = screen.getByPlaceholderText('username');
  const passwordInput = screen.getByPlaceholderText('password');

  expect(loginButton).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});