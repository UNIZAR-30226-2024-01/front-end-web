import { render, act } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import { ProgressBar } from '../components/Home/ProgressBar';
import React from 'react';

// Mock the fetch function to simulate obtaining XP from the backend
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ XP: 100 }),
  })
);

describe('Chat Component', () => {
    test('ProgressBar calculates level and XP percentage correctly', async () => {
    const completedSetter = jest.fn();
    const lvlSetter = jest.fn();

    await act(async () => {
        render(
        <CookiesProvider>
            <ProgressBar completedSetter={completedSetter} lvlSetter={lvlSetter} />
        </CookiesProvider>
        );
    });

    expect(lvlSetter).toHaveBeenCalledWith(3);
    expect(completedSetter).toHaveBeenCalledWith(22); 
    });
});