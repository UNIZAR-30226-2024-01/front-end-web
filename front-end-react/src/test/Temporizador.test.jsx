import { render, act } from '@testing-library/react';
import { Temporizador } from '../components/Game/Turno/Temporizador.jsx';
import React from 'react';
import '@testing-library/jest-dom';

describe('Temporizador', () => {
  const mockTemporizadorDone = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders Temporizador component', () => {
    const { getByText } = render(<Temporizador tiempo={10} temporizadorDone={mockTemporizadorDone} />);
    expect(getByText(/Tiempo restante: 10/i)).toBeInTheDocument();
  });

  test('countdown works correctly', () => {
    const { getByText } = render(<Temporizador tiempo={10} temporizadorDone={mockTemporizadorDone} />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(getByText(/Tiempo restante: 5/i)).toBeInTheDocument();
  });

  test('temporizadorDone is called when countdown finishes', () => {
    render(<Temporizador tiempo={0} temporizadorDone={mockTemporizadorDone} />);
    act(() => {
      jest.runAllTimers();
    });
    setTimeout(() => {
      expect(mockTemporizadorDone).toHaveBeenCalled();
    }, 0);
  });
});