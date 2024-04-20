import { useContext, useEffect } from 'react';
import '../../../../../../front-end-shared/css/Game/Turno/Turno.css';
import '../../../../../../front-end-shared/css/Game/Turno/Temporizador.css';
import { Dados } from './Dados';
import { Carrusel } from './Carrusel';
import { DesplegablesContext } from '../../../context/desplegables';
import { TurnoContext } from '../../../context/turno';
import { GameInfoContext } from '../../../context/gameinfo';
import { Temporizador } from './Temporizador';

export function Turno() {
  const { setChatDesplegado, setTarjetaDesplegado, setCartasDesplegado, setOpcionesDesplegado } =
    useContext(DesplegablesContext);
  const { dados, parteTurno, setParteTurno, setTurnoOwner } = useContext(TurnoContext);
  const { characters, guns, rooms } = useContext(GameInfoContext);
  // const { socket } = useContext(SocketContext);

  // ocultar todos los desplegables al inicio del turno
  useEffect(() => {
    setChatDesplegado(false);
    setTarjetaDesplegado(false);
    setCartasDesplegado(false);
    setOpcionesDesplegado(false);
    console.log('Turno iniciado');
    setParteTurno('es-tu-turno');
  }, []);

  useEffect(() => {
    console.log('Nueva parte del turno: ' + parteTurno);
    if (parteTurno == 'espera-resto') {
      setParteTurno(undefined);
      setTurnoOwner(undefined);
    }
  }, [parteTurno]);

  const finTurno = () => {
    setParteTurno('espera-resto');
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
        <Temporizador tiempo={30} temporizadorDone={finTurno} />
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

          <button onClick={finTurno}>Realizar sospecha🧐</button>
        </div>
      )}
    </div>
  );
}
