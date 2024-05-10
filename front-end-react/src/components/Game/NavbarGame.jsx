// import { useState } from "react";
import '../../../../../front-end-shared/css/Game/NavbarGame.css';
import { useCookies } from 'react-cookie';
import { useNavigate /* , useParams */ } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DesplegablesContext } from '../../context/desplegables';
import { SocketContext } from '../../context/socket';
import { GameInfoContext } from '../../context/gameinfo';
import React from 'react';
export function NavbarGame() {
  const {
    opcionesDesplegado,
    setOpcionesDesplegado /* , setChatDesplegado, setCartasDesplegado, setTarjetaDesplegado */,
  } = useContext(DesplegablesContext);

  const { pausedGame, setPausedGame, requestedPause, setRequestedPause } = useContext(GameInfoContext);

  const [cookies, setCookie] = useCookies(['username, partida_actual']);

  const { socket, setSocket } = useContext(SocketContext);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setOpcionesDesplegado((prev) => !prev);
  };

  useEffect(() => {
    if (pausedGame) {
      setRequestedPause(true);
    }
  }, []);

  const leaveGame = () => {
    //eliminar la cookie del personaje
    socket.emit('leave-game', {});

    setCookie('partida_actual', { partida: '' }, { path: '/' });
    setSocket(null);

    navigate('/');
  };

  const handlePauseClick = () => {
    // alert('Impleméntame 😢');
    if (pausedGame) { // Reanudar partida
      console.log('Reanudo partida')
      socket.emit('request-resume-game', {});
      setPausedGame(false);
      setRequestedPause(false);
    } else if (requestedPause) { // Pausa solicitada
      // Toast: la pausa ya está solicitada
    } else { // Pausar partida
      socket.emit('request-pause-game', {});
      setRequestedPause(true);
      setPausedGame(false);
    }
  };

  return (
    <nav className="navbar-game">
      <div className={`burger`} onClick={toggleMenu}>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      {opcionesDesplegado && (
        <div className="menu">
          <p onClick={leaveGame}>Abandonar partida</p>

          <p onClick={handlePauseClick}>
            {pausedGame ? 'Reanudar partida' : requestedPause ? 'Pausa solicitada' : 'Pausar partida'}
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
