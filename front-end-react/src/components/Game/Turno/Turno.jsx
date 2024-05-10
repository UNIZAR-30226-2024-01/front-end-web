import { useContext, useEffect, useState } from 'react';
import '../../../../../../front-end-shared/css/Game/Turno/Turno.css';
import '../../../../../../front-end-shared/css/Game/Turno/Temporizador.css';
import { Dados } from './Dados';
import { Carrusel } from './Carrusel';
import { DesplegablesContext } from '../../../context/desplegables';
import { TurnoContext } from '../../../context/turno';
import { GameInfoContext } from '../../../context/gameinfo';
import { Temporizador } from './Temporizador';
import { gameLogicTurnoAsksFor, gameLogicTurnoMovesTo } from '../../../logic/GameLogic';
import { SocketContext } from '../../../context/socket';
import { useCookies } from 'react-cookie';
import { CeldasContext } from '../../../context/celdas';
import { infoTablero, infoHabitaciones } from '../../../../../../front-end-shared/infoTablero';
import React from 'react';
export function Turno() {
  const { dados, parteTurno, setParteTurno, setTurnoOwner } = useContext(TurnoContext);
  const { characters, guns, rooms, usernames } = useContext(GameInfoContext);
  const { socket } = useContext(SocketContext);
  const { playerPositions } = useContext(CeldasContext);

  const [characterSelected, setCharacterSelected] = useState('mr SOPER');
  const [gunSelected, setGunSelected] = useState('teclado');
  const [roomSelected, setRoomSelected] = useState(rooms[0] || 'c');

  const [tipoPregunta, setTipoPregunta] = useState(false); // false = sospecha, true = acusacion
  const [cookies] = useCookies(['username']);

  // ocultar todos los desplegables al inicio del turno
  useEffect(() => {
    let room_idx = playerPositions[usernames.indexOf(cookies.username)] || 0;
    room_idx = infoTablero[room_idx].roomName - 1;
    const room_name = infoHabitaciones[room_idx]?.roomName;

    // quitar tildes a los nombres de las habitaciones
    const room_name_clean = room_name?.replace(/[áéíóú]/g, (char) => {
      return { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[char];
    });

    console.log('room_idx: ' + room_idx);
    setRoomSelected(room_name_clean?.toLowerCase() || 'sin habitacion');
  }, [playerPositions]);

  useEffect(() => {
    console.log('Nueva parte del turno: ' + parteTurno);
    if (parteTurno == 'espera-resto') {
      setParteTurno(undefined);
      setTurnoOwner(undefined);
    }
  }, [parteTurno]);

  const finTemporizador = () => {
    setParteTurno('espera-resto');
  };

  const finTurnoPregunta = () => {
    setParteTurno('espera-resto');
    const username_asking = cookies.username;
    const is_final = tipoPregunta; // false = sospecha, true = acusacion final
    gameLogicTurnoAsksFor(socket, username_asking, characterSelected, gunSelected, roomSelected, is_final);
  };

  const onChange = (value, type) => {
    switch (type) {
      case 'who':
        setCharacterSelected(value);
        break;
      case 'what':
        setGunSelected(value);
        break;
      case 'where':
        setRoomSelected(value.toLowerCase());
        break;
      default:
        console.log('Error en el tipo de carta');
        break;
    }
  };

  const toggleTipoPregunta = () => {
    // false = sospecha, true = acusacion
    setTipoPregunta((prev) => !prev);
  };

  const claseTipoPregunta = tipoPregunta ? 'acusacion' : 'sospecha';

  return (
    <div className="turno">
      {parteTurno == 'espera-resto' && (
        <button
          onClick={() => {
            setParteTurno('es-tu-turno');
          }}
        >
          Iniciar partida
        </button>
      )}

      {parteTurno == 'es-tu-turno' && (
        <div>
          <h1 className="tu-turno-texto">Es tu turno</h1>
          <script>
            {setTimeout(() => {
              setParteTurno('dados');
            }, 2000)}
          </script>
        </div>
      )}

      {(parteTurno == 'dados' || parteTurno == 'elegir-casilla' || parteTurno == 'elegir-pregunta') &&
        <Temporizador tiempo={45} temporizadorDone={finTemporizador} />
      }

      {parteTurno == 'dados' && (
        <div id="turno-dados">
          <Dados buttonText={'Tirar los dados'} />
          {dados != undefined && <h1>Has sacado un {dados}</h1>}
        </div>
      )}

      {parteTurno == 'elegir-casilla' && (
        <div id="turno-tablero">
          <h1>¡Elige una casilla!</h1>
        </div>
      )}

      {parteTurno == 'elegir-pregunta' && (
        <>
          <div id="turno-cartas" className={claseTipoPregunta}>
            <button className={'turno-boton-acusacion-final ' + claseTipoPregunta} onClick={toggleTipoPregunta}>
              {tipoPregunta ? 'Cambiar a sospecha' : 'Cambiar a acusación final'}
            </button>
            <h1>Haz tu pregunta:</h1>
            <div className="container-cartas">
              <div className="carta-quien">
                <h2 className="pregunta">¿Quién lo hizo?</h2>
                <Carrusel options={characters} onChange={onChange} type={'who'} />
                {/* <p>Elige un sospechoso</p> */}
              </div>
              <div className="carta-arma">
                <h2 className="pregunta">¿Con qué lo hizo?</h2>
                <Carrusel options={guns} onChange={onChange} type={'what'} />
                {/* <p>Elige un arma</p> */}
              </div>
              {/* Cambiar, no dejar seleccionar WHERE y fijarlo a donde estás */}
              <div className="carta-donde">
                <h2 className="pregunta">¿Dónde lo hizo?</h2>
                <Carrusel options={[roomSelected, 'a']} onChange={onChange} type={'where'} />
                <p></p>
              </div>
            </div>

            <button className={'turno-boton-sospecha ' + claseTipoPregunta} onClick={finTurnoPregunta}>
              {tipoPregunta ? 'Realizar acusación final' : 'Realizar sospecha'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
