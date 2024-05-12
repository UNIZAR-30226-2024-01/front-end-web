import { render, act } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import { ProgressBar } from '../components/Home/ProgressBar';
import { waitFor } from '@testing-library/react';
import React from 'react';

// Mock the fetch function to simulate obtaining XP from the backend
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ XP: 100 }),
  })
);

describe('Chat Component', () => {
    test('ProgressBar renders correctly', async () => {
      const completedSetter = jest.fn();
      const lvlSetter = jest.fn();

      await act(async () => {
          render(
          <CookiesProvider>
              <ProgressBar completedSetter={completedSetter} lvlSetter={lvlSetter} />
          </CookiesProvider>
          );
      });

    });
    test('should calculate progress and level correctly', async () => {
    const xpData = { XP: 100 }; 
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => Promise.resolve(xpData) });

    const completedSetter = jest.fn();
    const lvlSetter = jest.fn();

    render(<ProgressBar completedSetter={completedSetter} lvlSetter={lvlSetter} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/obtainXP'));
      expect(completedSetter).toHaveBeenCalledWith(22); 
      expect(lvlSetter).toHaveBeenCalledWith(3); 
    });
  });
});