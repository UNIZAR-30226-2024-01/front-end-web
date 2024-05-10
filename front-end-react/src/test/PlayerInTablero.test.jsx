import { render } from '@testing-library/react';
import { PlayerInTablero } from '../components/Game/Tablero/PlayerInTablero.jsx';
import { GameInfoContext } from '../context/gameinfo.jsx';
import { TurnoContext } from '../context/turno.jsx';
import React from 'react';
describe('PlayerInTablero component', () => {
  test('renders without crashing', () => {
    const mockGameInfoContext = {
      characters: [],
      usernames: []
    };

    const mockTurnoContext = {
      turnoOwner: ''
    };

    render(
      <GameInfoContext.Provider value={mockGameInfoContext}>
        <TurnoContext.Provider value={mockTurnoContext}>
          <PlayerInTablero index={0} />
        </TurnoContext.Provider>
      </GameInfoContext.Provider>
    );
  });
});