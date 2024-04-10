import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Page404 } from './Page404';
import '@testing-library/jest-dom';

describe('Page404 Component', () => {
  test('renders error message and link', () => {
    const unknownLocation = '/unknown';

    render(
      <MemoryRouter initialEntries={[unknownLocation]}>
        <Page404 />
      </MemoryRouter>
    );

    const errorMessage = screen.getByText(`No se encontro ${unknownLocation}`);
    const linkElement = screen.getByText('Volver');
    const errorCode = screen.getByText('404');

    expect(errorMessage).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(errorCode).toBeInTheDocument();
  });
});
