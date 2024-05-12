import { render } from '@testing-library/react';
import { Celda } from '../components/Game/Tablero/Celda.jsx';
import { CeldasContext } from '../context/celdas.jsx';
import { GameInfoContext } from '../context/gameinfo.jsx';
import { TurnoContext } from '../context/turno.jsx';
import React from 'react';
describe('Celda component', () => {
  test('renders without crashing', () => {
    const mockCeldasContext = {
      playerPositions: [],
      celdasOptions: []
    };

    const mockGameInfoContext = {
      characters: []
    };

    const mockTurnoContext = {
      setParteTurno: jest.fn()
    };

    render(
      <CeldasContext.Provider value={mockCeldasContext}>
        <GameInfoContext.Provider value={mockGameInfoContext}>
          <TurnoContext.Provider value={mockTurnoContext}>
            <Celda fil={0} col={0} handleClickOnCell={jest.fn()} />
          </TurnoContext.Provider>
        </GameInfoContext.Provider>
      </CeldasContext.Provider>
    );
  });
  
});