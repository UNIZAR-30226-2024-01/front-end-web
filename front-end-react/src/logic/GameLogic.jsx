/* eslint-disable react-refresh/only-export-components */
import { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SocketContext } from '../context/socket';
import { TurnoContext } from '../context/turno';
import { CeldasContext } from '../context/celdas';
import { GameInfoContext } from '../context/gameinfo';
import { ShowCardsContext } from '../context/showcards';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { onGameInfo } from '../socketio';
import { infoTablero, casillasPorHabitacion } from '../../../../front-end-shared/infoTablero';

const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);
  return { socket, setSocket };
};

export function gameLogicTurnoMovesTo(socket, username, position, fin) {
  console.log('GameLogicTurnoMovesTo', username, position, fin);
  socket.emit('turno-moves-to', username, position, fin);
}

export function gameLogicTurnoAsksFor(socket, username_asking, character, gun, room, is_final) {
  console.log('GameLogicTurnoAsksFor', username_asking, character, gun, room, is_final);
  socket.emit('turno-asks-for', username_asking, character, gun, room, is_final);
}

// Llamadas WS gestionando los != eventos de la partida
export function GameLogic({ setWinnedGame }) {
  const verbose = true;
  const [cookies, setCookie] = useCookies(['username']);
  const { socket, setSocket } = useSocket();
  const { setTurnoOwner, setParteTurno, restartTurno } = useContext(TurnoContext);
  const { playerPositions, setPlayerPositions } = useContext(CeldasContext);
  const {
    cards,
    usernames,
    sospechas,
    setCards,
    setCharacters,
    setUsernames,
    setGuns,
    setRooms,
    setSospechas,
    setStarted,
    setPausedGame,
    setRequestedPause,
  } = useContext(GameInfoContext);
  const { showQuestion, showCardElection, /* setSelectCardsToShow, */ showCardShowed } = useContext(ShowCardsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    // turno-owner
    const onTurnoOwner = (username) => {
      if (verbose) console.log('onTurnoOwner', username);
      setTurnoOwner(username);
      setParteTurno('es-tu-turno');
    };

    // turno-moves-to
    const onTurnoMovesToResponse = (username, position) => {
      if (verbose) console.log('onTurnoMovesToResponse', username, position);
      // let newCell = position;

      // cambiar position por una casilla libre de la habitación correspondiente de infoTablero.casillasPorHabitacion
      if (infoTablero[position].isRoom) {
        const roomName = infoTablero[position].roomName;
        let { cells } = casillasPorHabitacion[parseInt(roomName) - 1];
        cells = cells.filter((c) => !playerPositions.includes(c));
        position = cells[Math.floor(Math.random() * cells.length)];
      }

      const player_idx = usernames.indexOf(username);
      setPlayerPositions((prev) => {
        console.log('prev', prev);
        const newPlayerPositions = [...prev];
        newPlayerPositions[player_idx] = position;
        return newPlayerPositions;
      });
    };

    // turno-select-to-show
    const onTurnoSelectToShow = (username_asking, username_shower, character, gun, room) => {
      if (verbose) console.log('onTurnoSelectToShow', username_asking, username_shower, character, gun, room);
      // hace que se renderice un modal para elegir la carta a enseñar al que ha preguntado

      const onClick = (card) => {
        console.log('card selected', card);
        socket.emit('turno-card-selected', username_asking, cookies.username, card);
      };
      /*username_asking, my_cards, cards_asked, onClickedCard*/
      // example--> showCardElection('mat', ['MISS IA', 'SUSPENSO', 'CAFETERIA'], ['MISS IA', 'SUSPENSO', 'baños'], onClick);
      showCardElection(username_asking, cards, [character, gun, room], onClick);
    };

    // turno-show-cards
    const onTurnoShowCards = (username_asking, username_shower, card, character_asked, gun_asked, room_asked) => {
      if (verbose) console.log('onTurnoShowCards', username_asking, username_shower, card);
      // muestra la carta que ha enseñado el jugador
      // si te enseña a ti: muestra la carta
      // si te enseña a otro: muestra el dorso de la carta

      const i_am_asking = username_asking === socket.auth.username;
      let card_to_show = i_am_asking || card[0] == '' ? [card] : ['back'];

      console.log('card_to_show', card_to_show);

      showCardShowed(username_asking, username_shower, card_to_show, [character_asked, gun_asked, room_asked]);
    };

    // turno-asks-for
    const onTurnoAsksForResponse = (username_asking, character, gun, room, win) => {
      if (verbose) console.log('onTurnoAsksForResponse', username_asking, character, gun, room, win);
      // mustra un modal enseñando que pregunta ha hecho el jugador
      // const text = `${username_asking} ha preguntado: ¿ha sido ${character} con ${gun} en ${room}?`;
      const cards = [character, gun, room];
      console.log('Cards GameLogic', cards);
      showQuestion(username_asking, cards);
    };

    // game-over
    const onGameOver = (username_asking, win) => {
      if (verbose) console.log('onGameOver', username_asking, win);

      if (win) {
        setCookie('partida_actual', { partida: '' }, { path: '/' });
        // console.log(width, height);
        setWinnedGame(true);
      }
      alert('El usuario ' + username_asking + (win ? ' ha ganado' : ' ha perdido') + ' la partida.');

      // muestra un modal diciendo que ha ganado el jugador
      if ((username_asking == socket.auth.username) || win) navigate('/'); // volver a la pantalla de inicio
      // else --> te puedes quedar en la partida visualizándola pero no podrás hacer nada (turnoOwner ya no puede asociarse a tu usuario)
    };

    // close-connection
    const onCloseConnection = () => {
      if (verbose) console.log('onCloseConnection');
      // muestra un modal diciendo que se ha cerrado la conexión
      alert('Conectado en otro dispositivo. Conexión cerrada.');
      socket.disconnect();
      setSocket(null);

      navigate('/');
    };

    // game-state
    const onGameState = ({ posiciones, cartas, sospechas, turnoOwner }) => {
      if (verbose) console.log('onGameState', posiciones, cartas, sospechas, turnoOwner);
      setPlayerPositions(posiciones);
      setCards(cartas);
      // setSospechas(sospechas);
      if (turnoOwner === socket.auth.username) {
        console.log('Reiniciando turno...');
        restartTurno();
      } else {
        console.log('turnoOwner != a mí mismo', turnoOwner);
        setTurnoOwner(turnoOwner);
      }
    };

    // card
    const onCards = (data) => {
      if (verbose) console.log('Cards:', data);
      setCards(data);
    };

    // game-info
    const useOnGameInfoLocal = (data) => {
      if (verbose) console.log('Game info:', data);
      // console.log("Available characters:", data.names);
      // console.log("Available guns:", data.guns);
      // console.log("Available rooms:", data.rooms);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
      // console.log('positions', data.posiciones);

      // Solamente actualizar los datos si se han recibido  (no se envían en todos los casos)
      // console.log('Game info:', data);
      if (data.cards) {
        // console.log('cards', data.cards);
        setCards(data.cards);
        setStarted(true);
      }
      if (data.sospechas) {
        // console.log('sospechas', data.sospechas);

        const json = data.sospechas.replace(/{/g, '[').replace(/}/g, ']');
        const newSospechas = JSON.parse(json);

        // console.log('newSospechas', newSospechas);
        setSospechas(newSospechas);
      }
      if (data.posiciones) {
        const new_positions = [];
        // Si hay alguien en una habitación, debe de asignarles una celda random de dentro de ésta
        for (const pos of data.posiciones) {
          // mirar si esta en una habitacion
          const in_room = infoTablero[pos].isRoom;
          if (in_room) {
            // si esta en una habitacion, asignarle una celda random de dentro de la habitacion
            const roomName = infoTablero[pos].roomName;
            let { cells } = casillasPorHabitacion[parseInt(roomName) - 1];
            cells = cells.filter((c) => !new_positions.includes(c));
            const randomCell = cells[Math.floor(Math.random() * cells.length)];
            new_positions.push(randomCell);
          } else {
            // si no, no hacer nada
            new_positions.push(pos);
          }
        }
        setPlayerPositions(new_positions);
      }
      if (data.turnoOwner) {
        // console.log('turnoOwner', data.turnoOwner);
        if (data.turnoOwner === socket.auth.username) {
          console.log('Reiniciando turno...');
          restartTurno();
        } else {
          console.log('turnoOwner != a mí mismo', data.turnoOwner);
          setTurnoOwner(data.turnoOwner);
          setParteTurno('es-tu-turno');
        }
      }
    };

    // start-game
    const onStartGame = (data) => {
      if (verbose) console.log('onStartGame', data);
      setStarted(true);
      setPlayerPositions(data.posiciones);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
    };

    // game-paused-response
    const onGamePausedResponse = () => {
      console.log('Game paused');
      alert('La partida ha sido pausada.');

      setRequestedPause(false);
      setPausedGame(true);
    };

    // game-resumed-response
    const onGameResumedResponse = () => {
      console.log('Game resumed');
      alert('La partida ha sido reanudada.');

      setRequestedPause(false);
      setPausedGame(false);
    };

    // request-sospechas
    const onRequestSospechas = () => {
      console.log('sospechas', sospechas);
      socket.emit('response-sospechas', sospechas);
    };

    socket.on('turno-owner', onTurnoOwner);
    socket.on('turno-moves-to-response', onTurnoMovesToResponse);
    socket.on('turno-show-cards', onTurnoShowCards);
    socket.on('turno-select-to-show', onTurnoSelectToShow);
    socket.on('turno-asks-for-response', onTurnoAsksForResponse);
    socket.on('game-over', onGameOver);
    socket.on('close-connection', onCloseConnection);
    // socket.on('game-state', onGameState);
    // Game-info
    socket.on('cards', onCards);
    socket.on('game-info', useOnGameInfoLocal);
    socket.on('start-game-response', onStartGame);

    // Pausado de partida
    socket.on('game-paused-response', onGamePausedResponse);
    socket.on('game-resumed-response', onGameResumedResponse);

    // Solictud de tarjeta sospecha
    socket.on('request-sospechas', onRequestSospechas);

    return () => {
      socket.off('turno-owner', onTurnoOwner);
      socket.off('turno-moves-to-response', onTurnoMovesToResponse);
      socket.off('turno-show-cards', onTurnoShowCards);
      socket.off('turno-select-to-show', onTurnoSelectToShow);
      socket.off('turno-asks-for-response', onTurnoAsksForResponse);
      socket.off('game-over', onGameOver);
      socket.off('close-connection', onCloseConnection);
      // socket.off('game-state', onGameState);
      // Game-info
      socket.off('game-info', useOnGameInfoLocal);
      socket.off('cards', onCards);
      socket.off('start-game-response', onStartGame);

      socket.off('game-paused-response', onGamePausedResponse);
      socket.off('game-resumed-response', onGameResumedResponse);

      socket.off('request-sospechas', onRequestSospechas);
    };
  }),
    [socket];

  return null;
}
