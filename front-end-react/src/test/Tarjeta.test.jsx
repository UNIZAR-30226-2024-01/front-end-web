import { render, fireEvent, screen } from '@testing-library/react';
import { DesplegablesContext } from '../context/desplegables.jsx';
import { GameInfoContext } from '../context/gameinfo.jsx';
import { Tarjeta } from '../components/Game/Tarjeta/Tarjeta.jsx';
import React from 'react';
import '@testing-library/jest-dom';

describe('Tarjeta', () => {
  const mockDesplegablesContext = {
    tarjetaDesplegado: false,
    setTarjetaDesplegado: jest.fn(),
  };
  test('renders Tarjeta component', () => {
    

    const mockGameInfoContext = {
      characters: ['character1', 'character2', 'character3', 'character4', 'character5', 'character6'],
      guns: ['gun1', 'gun2', 'gun3', 'gun4', 'gun5', 'gun6'],
      rooms: ['room1', 'room2', 'room3', 'room4', 'room5', 'room6', 'room7', 'room8', 'room9'],
      sospechas: Array(28).fill(''),
      setSospechas: jest.fn(),
    };

    render(
      <DesplegablesContext.Provider value={mockDesplegablesContext}>
        <GameInfoContext.Provider value={mockGameInfoContext}>
          <Tarjeta />
        </GameInfoContext.Provider>
      </DesplegablesContext.Provider>
    );

    expect(screen.getByText(/Desarrollado por Grace Hopper/i)).toBeInTheDocument();
  });

});