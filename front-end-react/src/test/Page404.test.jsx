import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Page404 } from '../components/Page404';
import '@testing-library/jest-dom';

describe('Page404 Component', () => {
  it('renders without crashing and displays the correct path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/non-existing-route']}>
        <Routes>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText(/No se encontro \/non-existing-route/i)).toBeInTheDocument();
    expect(getByText(/404/i)).toBeInTheDocument();
  });
});