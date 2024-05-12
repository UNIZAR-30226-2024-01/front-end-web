import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../components/Login';
import { BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '@testing-library/jest-dom';

jest.mock('react-cookie', () => ({
  useCookies: jest.fn().mockReturnValue([{}, jest.fn()]),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');
    const loginButton = getByText('Iniciar sesión');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('should handle login successfully', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => ({ exito: true, id_partida_actual: '12345' }),
    });

    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'testpassword' } });

    fireEvent.click(getByText('Iniciar sesión'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
      });
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  test('should handle login failure', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => ({ exito: false }),
    });

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'testpassword' } });

    fireEvent.click(getByText('Iniciar sesión'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
    });
  });
});
