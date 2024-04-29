/* eslint-disable react-refresh/only-export-components */
import { useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { SocketContext } from '../context/socket';
import { TurnoContext } from '../context/turno';
import { CeldasContext } from '../context/celdas';
import { GameInfoContext } from '../context/gameinfo';
import { ShowCardsContext } from '../context/showcards';

import { onGameInfo } from '../socketio';

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
export function GameLogic() {
  const verbose = true;
  const [cookies] = useCookies(['username']);
  const { socket, setSocket } = useSocket();
  const { setTurnoOwner, setParteTurno } = useContext(TurnoContext);
  const { setPlayerPositions } = useContext(CeldasContext);
  const { cards, usernames, setCards, setCharacters, setUsernames, setGuns, setRooms, setSospechas, setStarted } =
    useContext(GameInfoContext);
  const { showQuestion, showCardElection, /* setSelectCardsToShow, */ showCardShowed } = useContext(ShowCardsContext);

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
      console.log('onGameOver', username_asking, win);
      // muestra un modal diciendo que ha ganado el jugador
      alert('El usuario ' + username_asking + (win ? ' ha ganado' : ' ha perdido') + ' la partida.');
    };

    // close-connection
    const onCloseConnection = () => {
      console.log('onCloseConnection');
      // muestra un modal diciendo que se ha cerrado la conexión
      alert('Conectado en otro dispositivo. Conexión cerrada.');
      setSocket(null);
    };

    // game-state
    const onGameState = ({ posiciones, cartas, sospechas, turnoOwner }) => {
      setPlayerPositions(posiciones);
      setCards(cartas);
      setSospechas(sospechas);
      setTurnoOwner(turnoOwner);
    };

    
    const onCards = (data) => {
      // console.log('Cards:', data);
      setCards(data);
    };

    const useOnGameInfoLocal = (data) => {
      // console.log('Game info:', data);
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
        setSospechas(data.sospechas);
      }
      if (data.posiciones) {
        // console.log('posiciones', data.posiciones);
        setPlayerPositions(data.posiciones);
      }
      if (data.turnoOwner) {
        // console.log('turnoOwner', data.turnoOwner);
        setTurnoOwner(data.turnoOwner);
        setParteTurno('es-tu-turno');
      }
      // onGameInfoExtra(data.cards, data.sospechas, data.positions, data.turnoOwner);

      // setCards(data.cards);
      // setSospechas(data.sospechas);
      // setPlayerPositions(data.positions);
      // setTurnoOwner(data.turnoOwner);
    };

    const onStartGame = (data) => {
      setStarted(true);
      setPlayerPositions(data.posiciones);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
    };

    socket.on('turno-owner', onTurnoOwner);
    socket.on('turno-moves-to-response', onTurnoMovesToResponse);
    socket.on('turno-show-cards', onTurnoShowCards);
    socket.on('turno-select-to-show', onTurnoSelectToShow);
    socket.on('turno-asks-for-response', onTurnoAsksForResponse);
    socket.on('game-over', onGameOver);
    socket.on('close-connection', onCloseConnection);
    socket.on('game-state', onGameState);
    // Game-info
    socket.on('cards', onCards);
    socket.on('game-info', useOnGameInfoLocal);
    socket.on('start-game', onStartGame);

    return () => {
      socket.off('turno-owner', onTurnoOwner);
      socket.off('turno-moves-to-response', onTurnoMovesToResponse);
      socket.off('turno-show-cards', onTurnoShowCards);
      socket.off('turno-select-to-show', onTurnoSelectToShow);
      socket.off('turno-asks-for-response', onTurnoAsksForResponse);
      socket.off('game-over', onGameOver);
      socket.off('close-connection', onCloseConnection);
      socket.off('game-state', onGameState);
      // Game-info
      socket.off('game-info', useOnGameInfoLocal);
      socket.off('cards', onCards);
      socket.off('start-game', onStartGame);
    };
  }),
    [socket];

  return null;
}
