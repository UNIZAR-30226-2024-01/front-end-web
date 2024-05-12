import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { CreateUser } from '../components/CreateUser';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-cookie', () => ({
  useCookies: jest.fn().mockReturnValue([{}, jest.fn()]),
}));

describe('CreateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render create account form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>
    );

    const usernameInput = getByPlaceholderText('username');
    const passwordInput = getByPlaceholderText('password');
    const confirmPasswordInput = getByPlaceholderText('repeat password');
    const submitButton = getByText('Crear cuenta');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('should handle creating an account successfully', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => ({ success: true }),
    });

    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'testpassword' } });
    fireEvent.change(getByPlaceholderText('repeat password'), { target: { value: 'testpassword' } });

    fireEvent.click(getByText('Crear cuenta'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/createAccount'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
      });
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  test('should handle server error when creating an account', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => ({ success: false }),
    });
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'testpassword' } });
    fireEvent.change(getByPlaceholderText('repeat password'), { target: { value: 'testpassword' } });

    fireEvent.click(getByText('Crear cuenta'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('No se ha podido crear la cuenta. Inténtalo de nuevo.');
    });

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
