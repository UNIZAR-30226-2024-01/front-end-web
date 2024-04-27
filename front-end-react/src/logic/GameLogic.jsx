/* eslint-disable react-refresh/only-export-components */
import { useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { SocketContext } from '../context/socket';
import { TurnoContext } from '../context/turno';
import { CeldasContext } from '../context/celdas';
import { GameInfoContext } from '../context/gameinfo';
import { ShowCardsContext } from '../context/showcards';

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
  const { cards, usernames } = useContext(GameInfoContext);
  const { showQuestion, showCardElection, setSelectCardsToShow, showCardShowed } = useContext(ShowCardsContext);

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

    const onGameOver = (username, win) => {
      console.log('onGameOver', username, win);
      // muestra un modal diciendo que ha ganado el jugador
      alert('El usuario ' + username + win ? ' ha ganado' : ' ha perdido' + ' la partida.');
    };

    const onCloseConnection = () => {
      console.log('onCloseConnection');
      // muestra un modal diciendo que se ha cerrado la conexión
      alert('Conectado en otro dispositivo. Conexión cerrada.');
      setSocket(null);
    };

    socket.on('turno-owner', onTurnoOwner);
    socket.on('turno-moves-to-response', onTurnoMovesToResponse);
    socket.on('turno-show-cards', onTurnoShowCards);
    socket.on('turno-select-to-show', onTurnoSelectToShow);
    socket.on('turno-asks-for-response', onTurnoAsksForResponse);
    socket.on('game-over', onGameOver);
    socket.on('close-connection', onCloseConnection);

    return () => {
      socket.off('turno-owner', onTurnoOwner);
      socket.off('turno-moves-to-response', onTurnoMovesToResponse);
      socket.off('turno-show-cards', onTurnoShowCards);
      socket.off('turno-select-to-show', onTurnoSelectToShow);
      socket.off('turno-asks-for-response', onTurnoAsksForResponse);
      socket.off('game-over', onGameOver);
      socket.off('close-connection', onCloseConnection);
    };
  }),
    [socket];

  return null;
}
