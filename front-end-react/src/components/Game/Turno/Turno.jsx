import { useContext, useEffect } from 'react';
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

export function Turno() {
  const { dados, parteTurno, setParteTurno, setTurnoOwner } = useContext(TurnoContext);
  const { characters, guns, rooms, usernames } = useContext(GameInfoContext);
  const { socket } = useContext(SocketContext);
  const { playerPositions } = useContext(CeldasContext);

  const [cookies] = useCookies(['username']);

  // ocultar todos los desplegables al inicio del turno
  useEffect(() => {
    // setChatDesplegado(false);
    // setTarjetaDesplegado(false);
    // setCartasDesplegado(false);
    // setOpcionesDesplegado(false);
  }, []);

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
    const character = 'mr SOPER';
    const gun = 'teclado';
    const room = 'cafeteria';
    const username_asking = cookies.username;
    gameLogicTurnoAsksFor(socket, username_asking, character, gun, room);
  };

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

      {(parteTurno == 'dados' || parteTurno == 'elegir-casilla' || parteTurno == 'elegir-pregunta') && (
        <Temporizador tiempo={30} temporizadorDone={finTemporizador} />
      )}

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
        <div id="turno-cartas">
          <h1>Elige una pregunta</h1>
          <div className="container-cartas">
            <div className="carta-quien">
              <h2>¿Quién lo hizo?</h2>
              <p>Elige un sospechoso</p>
              {/* <Carta /> */}
              <Carrusel options={characters} />
            </div>
            <div className="carta-arma">
              <h2>¿Con qué lo hizo?</h2>
              <p>Elige un arma</p>
              <Carrusel options={guns} />
            </div>
            <div className="carta-donde">
              <h2>¿Dónde lo hizo?</h2>
              <p>Elige una habitación</p>
              <Carrusel options={rooms} />
            </div>
          </div>

          <button onClick={finTurnoPregunta}>Realizar sospecha🧐</button>
        </div>
      )}
    </div>
  );
}
