import { render } from '@testing-library/react';
import { SocketContext } from '../context/socket';
import { TurnoContext } from '../context/turno';
import { CeldasContext } from '../context/celdas';
import { GameInfoContext } from '../context/gameinfo';
import { ShowCardsContext } from '../context/showcards';
import { BrowserRouter as Router } from 'react-router-dom';
import { GameLogic } from '../logic/GameLogic';
import React from 'react';
import '@testing-library/jest-dom';

test('GameLogic renders without crashing', () => {
  const mockSetWinnedGame = jest.fn();

  render(
    <Router>
      <SocketContext.Provider value={{}}>
        <TurnoContext.Provider value={{}}>
          <CeldasContext.Provider value={{}}>
            <GameInfoContext.Provider value={{}}>
              <ShowCardsContext.Provider value={{}}>
                <GameLogic setWinnedGame={mockSetWinnedGame} />
              </ShowCardsContext.Provider>
            </GameInfoContext.Provider>
          </CeldasContext.Provider>
        </TurnoContext.Provider>
      </SocketContext.Provider>
    </Router>
  );
});