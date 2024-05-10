import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateUser } from '../components/CreateUser'; // adjust the import path if necessary
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';

test('renders CreateUser',() => {
  
  render(
    <CookiesProvider>
      <BrowserRouter>
        <CreateUser />
      </BrowserRouter>
    </CookiesProvider>
  );
});