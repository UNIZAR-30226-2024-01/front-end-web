import '../../../../../../front-end-shared/css/Game/Cartas/Carta.css';
import { GameItems } from './GameItems';
import React from 'react';
export function Carta({ player_name, hover = true }) {
  let styleImage;
  if (player_name === 'back') {
    styleImage = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    };
  }

  const className = 'carta' + (hover ? ' carta-hover' : '');
  // traducción porque no cabe bien en la carta
  let player_name_upper = player_name.toUpperCase();
  if (player_name_upper === 'CAFE ENVENENADO') {
    player_name_upper = 'CAFE';
  } else if (player_name_upper === 'ROUTER AFILADO') {
    player_name_upper = 'ROUTER';
  }

  return (
    <div className={className}>
      <div className="image" style={styleImage}>
        <GameItems player_name={player_name} />
        <GameItems player_name={player_name} />
      </div>
      {player_name != 'back' ? <h1>{player_name_upper}</h1> : null}
    </div>
  );
}
