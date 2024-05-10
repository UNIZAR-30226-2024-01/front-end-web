import { useContext, useEffect, useState } from 'react';
import '../../../../../../front-end-shared/css/Game/Tablero/Celda.css';
import { infoTablero } from '../../../../../../front-end-shared/infoTablero.js';
import { CeldasContext } from '../../../context/celdas.jsx';
import { Door } from '../../Icons.jsx';
import React from 'react';
import { cellsClose } from '../../../bfs.mjs';
import { TurnoContext } from '../../../context/turno.jsx';
import { Game } from '../Game.jsx';
import { GameInfoContext } from '../../../context/gameinfo.jsx';
import { casillasPorHabitacion } from '../../../../../../front-end-shared/infoTablero.js';
import { SocketContext } from '../../../context/socket.jsx';
import { useCookies } from 'react-cookie';
import { gameLogicTurnoMovesTo } from '../../../logic/GameLogic.jsx';

// function useCellContext(index) {
//   const handleClickContext = (index, dice) => {
//     if (clicked) {
//       const array = Array(24 * 24).fill(false);
//       setCeldasOptions(JSON.stringify(array));
//       setClicked((prev) => !prev);
//       return;
//     }
//     const array = Array(24 * 24).fill(false);
//     const bfs = cellsClose(index, dice);
//     bfs.forEach((c) => (array[c] = true));
//     setClicked((prev) => !prev);
//     setCeldasOptions(JSON.stringify(array));
//   };

//   const [clicked, setClicked] = useState(false);
//   const { celdasOptions, setCeldasOptions } = useContext(CeldasContext); // recuperar el estado de las celdas
//   const infoCellContext = JSON.parse(celdasOptions)[index]; // obtener el estado almacenado de la celda seleccionada
//   const infoCell = infoTablero[index]; // obtener la información de la celda seleccionada
//   let selected = false;
//   infoCellContext ? (selected = true) : null; // si la celda estaba a true, marcarla como seleccionada
//   if (infoCell.isRoom) {
//     // buscar las puertas de la habitacion
//     const doors = infoTablero.filter(
//       (c) => c.roomName === infoCell.roomName && c.isDoor
//     );
//     // si alguna esta seleccionada, añadir clase
//     if (doors.some((c) => JSON.parse(celdasOptions)[c.idx])) {
//       selected = true;
//     }
//   }
//   return { selected, handleClickContext }; // devolver la información de la celda (si está seleccionada y la función para seleccionarla)
// }

function setSize(tam) {
  let style;
  switch (tam) {
    case 's':
      style = {
        width: 22,
        height: 22,
      };
      break;

    case 'm':
      style = {
        width: 26,
        height: 26,
      };
      break;

    case 'l':
      style = {
        width: 30,
        height: 30,
      };
      break;

    default:
      break;
  }
  return style;
}

function player2color(player) {
  switch (player) {
    case 'mr SOPER':
      return '#80b37e';
    case 'miss REDES':
      return '#fcfd7f';
    case 'mr PROG':
      return '#7fd2e7';
    case 'miss FISICA':
      return '#fdfdfd';
    case 'mr DISCRETO':
      return '#dea9fb';
    case 'miss IA':
      return '#fc7e7e';
    default:
      return 'black';
  }
}

export function Celda({ fil, col, tam = 'm', handleClickOnCell }) {
  let style = setSize(tam);
  let index = fil * 24 + col; // índice de la celda en el tablero

  const { playerPositions, celdasOptions } = useContext(CeldasContext);
  const { characters } = useContext(GameInfoContext);
  const { setParteTurno } = useContext(TurnoContext);

  // información de los atributos de la celda que se está mirando
  const infoCell = infoTablero[index];
  const isFilled =
    // !infoCell?.isRoom && infoCell?.isWalkable && infoCell?.token != "";
    playerPositions.includes(index);

  const currentIdx = playerPositions.indexOf(index);
  // console.log("CurrentIdx celda: " + currentIdx);

  // console.log("Celda " + index + " " + isFilled);

  let clase = '';
  // Añadido de estilización dependiendo qué tipo de celda sea
  if (infoCell?.isRoom) {
    // Habitación
    clase = 'room room-' + infoCell.roomName;
    style.width = style.width + 2;
    style.height = style.height + 2;
  } else if (!infoCell?.isWalkable) {
    // No se puede posicionarse en ella
    clase = 'invalid';
    style.width = style.width + 2;
    style.height = style.height + 2;
  } else {
    // Celda normal
    clase = 'celda ' + (fil % 2 === 0 ? (col % 2 === 0 ? 'dark' : 'light') : col % 2 === 0 ? 'light' : 'dark');
  }
  if (isFilled) {
    // Casilla de inicio
    clase += ' filled';
    style.fill = player2color(characters[currentIdx]);
  }

  // useEffect(() => {
  //   console.log("Celda actualizada a " + playerPositions);
  // }, [playerPositions, characters]);

  // recuperar la información de la celda (si está seleccionada y la función para seleccionarla)
  // const { selected, handleClickContext } = useCellContext(index);
  // selected ? (clase += " selected") : null; // si la celda está seleccionada, añadir clase correspondiente
  clase += celdasOptions[index] ? ' selected' : ''; // si la celda está seleccionada, añadir clase correspondiente
  // console.log("Celda " + index + " " + celdasOptions[index]);

  style.width = style.width + 'px';
  style.height = style.height + 'px';

  // const { dados } = useContext(TurnoContext);
  const handleClick = () => {
    if (!celdasOptions[index]) return; // Si la casilla no es alcanzable, no se procesa el

    if (infoCell.isDoor || infoCell.isRoom) {
      // ir a una casilla random libre de la habitación, de las mostradas en casillasPorHabitacion (que esté libre)
      let { cells } = casillasPorHabitacion[infoCell.roomName - 1];
      cells = cells.filter((c) => !playerPositions.includes(c));
      // cells.remove((c) => playerPositions.includes(c)); // eliminar las casillas ya ocupadas
      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      handleClickOnCell(randomCell, false);
      setParteTurno('elegir-pregunta');
      return;
    }

    if (playerPositions.includes(index)) return; // Si la casilla ya está ocupada, no se procesa el click

    handleClickOnCell(index, true);
    setParteTurno('espera-resto');
  };

  let cellDisplay = '';
  if (isFilled) {
    const player_idx = playerPositions.indexOf(index);
    if (!characters[player_idx]) return;
    cellDisplay = characters[player_idx].split(' ')[1].charAt(0).toUpperCase();
  }

  return (
    <div style={style} className={clase} onClick={handleClick}>
      {
        infoCell?.isDoor ? <Flecha dir={infoCell.isDoor} /> : null
        // infoCell?.isDoor ? <Flecha dir={infoCell.isDoor} /> : index
      }
      {infoCell?.isPath ? <TrapDoor idx={index} /> : null}
      {isFilled ? (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" />
          <text
            x="50"
            y="75"
            textAnchor="middle"
            fill="black"
            fontWeight="1000"
            fontSize="75"
            fontFamily="Hoefler Text" //podria llegar a hacer el papel
          >
            {cellDisplay}
          </text>
        </svg>
      ) : null}
    </div>
  );
}

function Flecha({ dir }) {
  let style = {};
  if (dir == 'u') style = { rotate: '270deg' };
  else if (dir == 'd') style = { rotate: '90deg' };
  else if (dir == 'l') style = { rotate: '180deg' };
  else if (dir == 'r') style = { rotate: '0deg' };
  else return dir;
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function TrapDoor({ idx }) {
  let style = {};
  if (idx == 0) style = { rotate: '315deg' };
  else if (idx == 23) style = { rotate: '45deg' };
  else if (idx == 552) style = { rotate: '225deg' };
  else if (idx == 575) style = { rotate: '135deg' };
  else return idx;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      style={style}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3" />
    </svg>
  );
}
