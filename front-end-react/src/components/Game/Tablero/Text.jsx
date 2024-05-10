import { infoHabitaciones } from '../../../../../../front-end-shared/infoTablero.js';
import '../../../../../../front-end-shared/css/Game/Tablero/Text.css';
import React from 'react';
export function Text({ idx }) {
  const className = 'room-name room-name-' + idx;
  const style = infoHabitaciones[idx - 1].style;
  const roomName = infoHabitaciones[idx - 1].roomName;

  if (roomName.includes('<br/>')) {
    const roomNameArray = roomName.split('<br/>');
    return (
      <div className={className} style={style}>
        <p>{roomNameArray[0]}</p>
        <p>{roomNameArray[1]}</p>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <p>{roomName}</p>
    </div>
  );
}
