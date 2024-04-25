import { ProgressBar } from './ProgressBar';
import { NavbarHome } from './NavbarHome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../../../../../front-end-shared/css/Home/Home.css';
import boardGame from '../../../../../front-end-shared/images/boardGame.png';
import { BACKEND_URL } from '../../consts';

export function Home() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['username']);

  const [completed, setCompleted] = useState(0);
  const [level, setLevel] = useState(0);

  const [showGameModes, setShowGameModes] = useState(false);
  const [gameMode, setGameMode] = useState(''); // l--> local, o--> online

  const showGameModesSingleplayer = () => {
    setShowGameModes(true);
    setGameMode('l');
  };

  const showGameModesMultiplayer = () => {
    setShowGameModes(true);
    setGameMode('o');
  };

  const newGameClick = async () => {
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
      navigate('/game/' + idGame);
    } else {
      alert('No se ha podido crear la partida. Inténtalo de nuevo.');
    }
  };

  const joinGameClick = async () => {
    const gameId = window.prompt('Introduzca el ID de la partida (6 dígitos):');
    if (gameId) {
      // ver si existe idGam partida llamando a la API/getGame (POST)
      const url = BACKEND_URL + '/getGame?idGame=' + gameId;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.exito === true) {
        navigate(`/game/${gameId}`);
      } else {
        alert('No se ha podido unirse a la partida. Inténtalo de nuevo.');
      }
    } else {
      alert('ID de partida no válido.');
    }
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
          <button className={`gamemode-button ${gameMode === 'l' ? 'active' : ''}`} onClick={showGameModesSingleplayer}>
            Solitario
          </button>
          <button
            className={`gamemode-button ${gameMode === 'o' ? 'active' : ''} add-buttons-space`}
            onClick={showGameModesMultiplayer}
          >
            Multijugador
          </button>

          {showGameModes && (
            <>
              <button className="gamemode-button" onClick={newGameClick}>
                Nueva partida
              </button>

              <button className="gamemode-button" onClick={joinGameClick}>
                Unirse a partida
              </button>
            </>
          )}
        </aside>
      </section>
    </div>
  );
}
