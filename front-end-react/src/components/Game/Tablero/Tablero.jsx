import '../../../../../../front-end-shared/css/Game/Tablero/Tablero.css';

import { Celda } from './Celda.jsx';
import { Text } from './Text.jsx';
import { useState, useEffect, useContext } from 'react';
import { TurnoContext } from '../../../context/turno.jsx';
import { useCookies } from 'react-cookie';
import { CeldasContext } from '../../../context/celdas.jsx';
import { GameInfoContext } from '../../../context/gameinfo.jsx';
import { gameLogicTurnoMovesTo } from '../../../logic/GameLogic.jsx';
import { SocketContext } from '../../../context/socket.jsx';
import React from 'react';
// import { useGameLogicTurnoMovesTo } from '../../../logic/GameLogic.jsx';

export function Tablero() {
  const [size] = useState('m');
  const [filas] = useState(24);
  const [columnas] = useState(24);
  const [tablero, setTablero] = useState([]);
  const [cookies] = useCookies(['username']);

  const { setCeldasOptions, setPlayerPositions } = useContext(CeldasContext);
  const { usernames } = useContext(GameInfoContext);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const newTablero = [];
    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        // Initialize each cell with default properties
        // You can modify this to set up your rooms and players
        fila.push({ isRoom: false, roomName: '', hasPlayer: false });
      }
      newTablero.push(fila);
    }
    setTablero(newTablero);
  }, [filas, columnas]);

  const [rooms] = useState(10);

  const { turnoOwner, parteTurno } = useContext(TurnoContext);
  const style = `tablero-body ${parteTurno === 'elegir-casilla' ? 'being-chosen' : ''}`;

  const handleClickOnCell = (idx, fin) => {
    if (turnoOwner == turnoOwner && parteTurno === 'elegir-casilla') {
      // const player_idx = usernames.indexOf(cookies.username);

      // gameLogicTurnoMovesTo(cookies.username, idx);

      setCeldasOptions(Array(24 * 24).fill(false));
      // setPlayerPositions((prev) => {
      //   const newPlayerPosition = [...prev];
      //   newPlayerPosition[player_idx] = idx;
      //   return newPlayerPosition;
      // });
      gameLogicTurnoMovesTo(socket, cookies.username, idx, fin);
    }
  };

  return (
    <div className={style}>
      <div className="tablero">
        {tablero.map((fila, i) => (
          <div className="fila" key={i}>
            {fila.map((celda, j) => (
              <Celda key={j} fil={i} col={j} tam={size} selected={true} handleClickOnCell={handleClickOnCell} />
            ))}
          </div>
        ))}
        <div className="texts">
          {[...Array(rooms)].map((_, idx) => {
            return <Text idx={idx + 1} key={idx} />;
          })}
        </div>
      </div>
      {/* <div className='tablero-container-button'>
                <button onClick={() => {setSize('s')}}>S</button>
                <button onClick={() => {setSize('m')}}>M</button>
                <button onClick={() => {setSize('l')}}>L</button>
            </div> */}
    </div>
  );
}
