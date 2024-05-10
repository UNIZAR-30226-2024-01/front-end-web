import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavbarHome } from '../components/Home/NavbarHome';
import '@testing-library/jest-dom';

import React from 'react';

test('NavbarHome renders correctly', () => {
  const { container } = render(
    <Router>
      <NavbarHome />
    </Router>
  );

  expect(container.querySelector('.navbar-home')).toBeInTheDocument();
});
