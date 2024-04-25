// import { useState } from "react";
import '../../../../../front-end-shared/css/Game/NavbarGame.css';
import { useCookies } from 'react-cookie';
import { useNavigate /* , useParams */ } from 'react-router-dom';
import { useContext } from 'react';
import { DesplegablesContext } from '../../context/desplegables';
import { SocketContext } from '../../context/socket';
import { GameInfoContext } from '../../context/gameinfo';

export function NavbarGame() {
  const {
    opcionesDesplegado,
    setOpcionesDesplegado /* , setChatDesplegado, setCartasDesplegado, setTarjetaDesplegado */,
  } = useContext(DesplegablesContext);

  const [cookies] = useCookies(['username']);
  // const { idGame } = useParams();

  const { socket, setSocket } = useContext(SocketContext);
  const { restartGameInfo } = useContext(GameInfoContext);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setOpcionesDesplegado((prev) => !prev);
  };

  const leaveGame = () => {
    //eliminar la cookie del personaje
    socket.emit('bye-bye', {});
    restartGameInfo();

    setSocket(null);
    navigate('/');
  };

  return (
    <nav className="navbar-game">
      <div className={`burger`} onClick={toggleMenu}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          // className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      {opcionesDesplegado && (
        <div className="menu">
          <p onClick={leaveGame}>Abandonar partida</p>

          <p
            onClick={() => {
              alert('Impleméntame 😢');
            }}
          >
            Pausar partida
          </p>

          {/* <p>
            Partida: {idGame}
          </p> */}

          <p>¡Suerte @{cookies.username}!</p>
        </div>
      )}
    </nav>
  );
}
