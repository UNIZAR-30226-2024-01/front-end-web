import { render } from '@testing-library/react';
import { Tablero } from '../components/Game/Tablero/Tablero.jsx';
import { CeldasContext } from '../context/celdas.jsx';
import { GameInfoContext } from '../context/gameinfo.jsx';
import { TurnoContext } from '../context/turno.jsx';
import { SocketContext } from '../context/socket.jsx';
import React from 'react';
import '@testing-library/jest-dom';
describe('Tablero component', () => {
  test('renders without crashing', () => {
    const mockCeldasContext = {
      setCeldasOptions: jest.fn(),
      setPlayerPositions: jest.fn(),
      playerPositions: [], 
      celdasOptions: [],

    };

    const mockGameInfoContext = {
      usernames: []
    };

    const mockTurnoContext = {
      turnoOwner: '',
      parteTurno: ''
    };

    const mockSocketContext = {
      socket: {}
    };

    render(
      <CeldasContext.Provider value={mockCeldasContext}>
        <GameInfoContext.Provider value={mockGameInfoContext}>
          <TurnoContext.Provider value={mockTurnoContext}>
            <SocketContext.Provider value={mockSocketContext}>
              <Tablero />
            </SocketContext.Provider>
          </TurnoContext.Provider>
        </GameInfoContext.Provider>
      </CeldasContext.Provider>
    );
  });
});