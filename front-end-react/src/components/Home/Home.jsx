import { ProgressBar } from './ProgressBar';
import { NavbarHome } from './NavbarHome';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import '../../../../../front-end-shared/css/Home/Home.css';
import boardGame from '../../../../../front-end-shared/images/boardGame.png';
import { BACKEND_URL } from '../../consts';
import { useJoinGame } from '../../hooks/useJoinGame';

import { GameInfoContext } from '../../context/gameinfo';

export function Home() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['username', 'partida_actual']);

  const [completed, setCompleted] = useState(0);
  const [level, setLevel] = useState(0);
  const { restartGameInfo } = useContext(GameInfoContext);

  useEffect(() => {
    restartGameInfo();
  }, []);

  // const [gameMode, setGameMode] = useState(''); // l--> local, o--> online

  const { partida } = cookies['partida_actual'] ?? {};
  // console.log(partida, estado);

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
      setCookies('partida_actual', {partida: idGame});
      navigate('/game/' + idGame);
    } else {
      alert('No se ha podido crear la partida. Inténtalo de nuevo.');
    }
  };

  const useJoinGameClick = async () => {
    let execute = true;

    if (partida) {
      navigate(`/game/${partida}`);
      execute = false;
    }

    const ret = await useJoinGame(null, execute, false, setCookies);
    if (ret?.navigateRoute) navigate(ret?.navigateRoute);
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

          <button className={'gamemode-button'} onClick={useJoinGameClick}>
            {partida ? `Continuar partida: ${partida}` : 'Unirse a partida'}
          </button>
        </aside>
      </section>
    </div>
  );
}
