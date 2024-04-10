//import React from 'react';
//import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from './Login';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
fetchMock.enableMocks();


/* eslint-disable no-undef */

// Mock para useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //COMPRUEBA LA RENDERIZACIÓN DEL FORMULARIO
  test('renders login form', () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );
    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');
    const loginButton = getByText('Iniciar sesión');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  //Comprueba el inicio de sesión con credenciales válidas (NO COMPRUEBA EN LA BASE DE DATOS)
  test('login correctly with valid credentials', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, token: 'valid' }),
    });
  
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter> 
        <Login />
      </MemoryRouter>
    );
  
    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');
    const loginButton = getByText('Iniciar sesión');
  
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
      });
    });
  });

  //Comprueba el inicio de sesión con credenciales invalidas (NO COMPRUEBA EN LA BASE DE DATOS)
  test('handles login failure with invalid credentials', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: false }),
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByPlaceholderText, getByText, getByText: getByTextInContainer } = render(
        <Router>
            <Login />
        </Router>
    );

    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');
    const loginButton = getByText('Iniciar sesión');

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'invaliduser', password: 'invalidpassword' }),
        });

        expect(alertMock).toHaveBeenCalledWith('Usuario o contraseña incorrectos'); 
    });
    alertMock.mockRestore();

});

});
/* eslint-enable no-undef */

