import '../../../../../../front-end-shared/css/Game/Tablero/MainTablero.css';
import { useCookies } from 'react-cookie';
import { Tablero } from './Tablero';
import { useState } from 'react';
import { PlayerInTablero } from './PlayerInTablero';

export function MainTablero() {
  const [cookies] = useCookies();

  return (
    <div className="main-board">
      <div className="users-info left">
        <PlayerInTablero index={0} />
        <PlayerInTablero index={1} />
        <PlayerInTablero index={2} />
      </div>
      <Tablero />
      <div className="users-info right">
        <PlayerInTablero index={3} />
        <PlayerInTablero index={4} />
        <PlayerInTablero index={5} />
      </div>
    </div>
  );
}
