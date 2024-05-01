import { ProgressBar } from './ProgressBar';
import { NavbarHome } from './NavbarHome';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import '../../../../../front-end-shared/css/Home/Home.css';
import boardGame from '../../../../../front-end-shared/images/boardGame.png';
import { BACKEND_URL } from '../../consts';

import { GameInfoContext } from '../../context/gameinfo';
import { TurnoContext } from '../../context/turno';
import { DesplegablesContext } from '../../context/desplegables';
import { ShowCardsContext } from '../../context/showcards';
import { CeldasContext } from '../../context/celdas';

export function Home() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['username', 'partida_actual']);

  const [completed, setCompleted] = useState(0);
  const [level, setLevel] = useState(0);
  const { restartGameInfo } = useContext(GameInfoContext);
  const { restartTurno } = useContext(TurnoContext);
  const { restartDesplegables } = useContext(DesplegablesContext);
  const { restartShowCartas } = useContext(ShowCardsContext);
  const { restartCeldas } = useContext(CeldasContext);

  const [partida, setPartida] = useState(cookies['partida_actual']?.partida ?? '');

  useEffect(() => {
    console.log('Home mounted again');
    restartGameInfo();
    restartTurno();
    restartDesplegables();
    restartShowCartas();
    restartCeldas();
    // recuperar la partida actual de la BD y asignárselo a la cookie
    const url = BACKEND_URL + '/playerInformation?username=' + cookies.username;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.exito === true && data.partida_actual) {
          setCookies('partida_actual', { partida: data.partida_actual }, { path: '/' });
        } else {
          setCookies('partida_actual', { partida: '' }, { path: '/' });
        }
      });
  }, []);

  useEffect(() => {
    setPartida(cookies['partida_actual']?.partida ?? '');
  }, [cookies]);

  // const [gameMode, setGameMode] = useState(''); // l--> local, o--> online

  const newGameClick = async (gameMode) => {
    // Comprobación extra para asegurarse de que se ha seleccionado un modo de juego
    // no debería de pasar ya se  obliga a seleccionar
    if (gameMode === '') {
      alert('Por favor, selecciona un modo de juego.');
      return;
    }

    // crear nueva partida llamando a la API/createGame (POST)
    const url = BACKEND_URL + '/createGame';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: gameMode,
      }),
    });

    const data = await response.json();
    if (data.exito === true) {
      const idGame = data.id_partida;
      setCookies('partida_actual', { partida: idGame }, { path: '/' });
      navigate('/game/' + idGame);
    } else {
      alert('No se ha podido crear la partida. Inténtalo de nuevo.');
    }
  };

  const joinGameClick = async () => {
    if (!partida) {
      let par = window.prompt('Introduzca el ID de la partida (6 dígitos):');
      if (par) {
        navigate(`/game/${par}`);
      } else {
        alert('ID de partida no válido.');
      }
      return;
    }
    navigate(`/game/${partida}`);
    return;
  };

  return (
    <div className="home-root">
      <NavbarHome />
      <section className="home-info">
        <div className="home-username">
          <h1>{cookies.username}</h1>
          <h4>
            {`${completed}%`} - Lvl {level}
          </h4>
        </div>
        <ProgressBar completedSetter={setCompleted} lvlSetter={setLevel} />
      </section>

      <section className="home-body">
        <img src={boardGame} alt="Tablero del juego" width={400} height={400} />

        <aside className="gameModes">
          {!partida && (
            <>
              <button className={'gamemode-button'} onClick={() => newGameClick('l')}>
                Crear partida solitario
              </button>
              <button className={'gamemode-button'} onClick={() => newGameClick('o')}>
                Crear partida multijugador
              </button>
            </>
          )}

          <button className={'gamemode-button'} onClick={joinGameClick}>
            {partida ? `Continuar partida: ${partida}` : 'Unirse a partida'}
          </button>
        </aside>
      </section>
    </div>
  );
}
