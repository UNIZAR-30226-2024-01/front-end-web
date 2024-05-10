import { useContext } from 'react';
import '../../../../../../front-end-shared/css/Game/Tablero/PlayerInTablero.css';
import { GameInfoContext } from '../../../context/gameinfo';
import { GameItems } from '../Cartas/GameItems';
import { TurnoContext } from '../../../context/turno';
import React from 'react';
import { defaultBotNames } from '../../../../../../front-end-shared/infoTablero';

export function PlayerInTablero({ index }) {
  const { characters, usernames } = useContext(GameInfoContext);
  const { turnoOwner } = useContext(TurnoContext);

  const character = characters[index];
  let username = usernames[index];
  const side = index < 3 ? 'left' : 'right';

  // const defaultBots = ['Intel', 'WiFi', 'Python', 'Newton', 'Grafo', 'GPT'];

  if (!username) {
    username = '...';
  }
  
  const className = turnoOwner === username ? `player ${side} turn` : `player ${side}`;

  if (username.startsWith('bot')) {
    username = defaultBotNames[index];
  }

  let style = {};
  switch (character) {
    case 'mr SOPER':
      style = { color: '#80b37e' };
      break;
    case 'miss REDES':
      style = { color: '#fcfd7f' };
      break;
    case 'mr PROG':
      style = { color: '#7fd2e7' };
      break;
    case 'miss FISICA':
      style = { color: '#fdfdfd' };
      break;
    case 'mr DISCRETO':
      style = { color: '#dea9fb' };
      break;
    case 'miss IA':
      style = { color: '#fc7e7e' };
      break;
    default:
      style = { color: '#000' };
      break;
  }

  return (
    <div className="main-player-in-tablero">
      <div style={style} className={className}>
        <h1>{username}</h1>
        {character && <GameItems player_name={character} />}
        {/* <h2>🔍{character}</h2> */}
      </div>
    </div>
  );
}
