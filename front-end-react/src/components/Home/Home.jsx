import { ProgressBar } from './ProgressBar';
import { NavbarHome } from './NavbarHome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../../../../../front-end-shared/css/Home/Home.css';
import boardGame from '../../../../../front-end-shared/images/boardGame.png';

export function Home() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['username']);
  
  const [completed, setCompleted] = useState(0);
  const [level, setLevel] = useState(0);
  
  const [showGameModes, setShowGameModes] = useState(false);
  const [gameMode, setGameMode] = useState(''); // singleplayer, multiplayer

  const showGameModesSingleplayer = () => {
    setShowGameModes(true);
    setGameMode('singleplayer');
  };

  const showGameModesMultiplayer = () => {
    setShowGameModes(true);
    setGameMode('multiplayer');
  };


  const newGameClick = () => {
    navigate('/game');
  };

  const joinGameClick = () => {
    const gameId = window.prompt('Please enter the game ID:');
    if (gameId) {
      navigate(`/game/${gameId}`);
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
        <img
          src={boardGame}
          alt="Tablero del juego"
          width={400}
          height={400}
        />

        <aside className="gameModes">
          <button
            className={`gamemode-button ${gameMode === 'singleplayer' ? 'active' : ''}`}
            onClick={showGameModesSingleplayer}
          >
            Solitario
          </button>
          <button
            className={`gamemode-button ${gameMode === 'multiplayer' ? 'active' : ''}`}
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
