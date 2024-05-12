import { render } from '@testing-library/react';
import { SocketContext } from '../context/socket';
import { TurnoContext } from '../context/turno';
import { CeldasContext } from '../context/celdas';
import { GameInfoContext } from '../context/gameinfo';
import { ShowCardsContext } from '../context/showcards';
import { BrowserRouter as Router } from 'react-router-dom';
import { GameLogic, gameLogicTurnoAsksFor, gameLogicTurnoMovesTo } from '../logic/GameLogic';
import React from 'react';
import '@testing-library/jest-dom';




describe('GameLogic', () => {
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

  const socketMock = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  };
  
  const contextMock = {
    socket: socketMock,
    setSocket: jest.fn(),
  };
  
  test('gameLogicTurnoMovesTo emits the correct event', () => {
    const username = 'TestUser';
    const position = 'PosicionTest';
    const fin = true;

    gameLogicTurnoMovesTo(socketMock, username, position, fin);

    expect(socketMock.emit).toHaveBeenCalledWith('turno-moves-to', username, position, fin);
  });

  test('gameLogicTurnoAsksFor emits the correct event', () => {
    const usernameAsking = 'TestUser';
    const character = 'CharacterTest';
    const gun = 'GunTest';
    const room = 'RoomTest';
    const isFinal = true;

    gameLogicTurnoAsksFor(socketMock, usernameAsking, character, gun, room, isFinal);

    expect(socketMock.emit).toHaveBeenCalledWith('turno-asks-for', usernameAsking, character, gun, room, isFinal);
  });
});