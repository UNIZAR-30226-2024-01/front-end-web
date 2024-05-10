import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../components/Home/ProgressBar'; // adjust the import path if necessary
import { CookiesProvider } from 'react-cookie';
import React
 from 'react';
test('renders ProgressBar component', () => {
  render(
    <CookiesProvider>
      <ProgressBar width="50%" height="30px" completedSetter={() => {}} lvlSetter={() => {}} />
    </CookiesProvider>
  );
  const progressBarContainer = screen.getByRole('progressbar');
  expect(progressBarContainer).toBeInTheDocument();
});