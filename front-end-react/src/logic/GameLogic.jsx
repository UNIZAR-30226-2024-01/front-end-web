/* eslint-disable react-refresh/only-export-components */
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/socket';
import { TurnoContext } from '../context/turno';
import { CeldasContext } from '../context/celdas';
import { GameInfoContext } from '../context/gameinfo';
import { ShowCardsContext } from '../context/showcards';

const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

export function gameLogicTurnoMovesTo(socket, username, position, fin) {
  console.log('GameLogicTurnoMovesTo', username, position, fin);
  socket.emit('turno-moves-to', username, position, fin);
}

export function gameLogicTurnoAsksFor(socket, username_asking, character, gun, room) {
  console.log('GameLogicTurnoAsksFor', username_asking, character, gun, room);
  socket.emit('turno-asks-for', username_asking, character, gun, room);
}

// Llamadas WS gestionando los != eventos de la partida
export function GameLogic() {
  const verbose = true;
  const socket = useSocket();
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
    const onTurnoSelectToShow = (username_showed, username_shower, character, gun, room) => {
      if (verbose) console.log('onTurnoSelectToShow', username_showed, username_shower, character, gun, room);
      // hace que se renderice un modal para elegir la carta a enseñar al que ha preguntado
      const cards_to_show = cards.filter((card) => card === character || card === gun || card === room);
      setSelectCardsToShow({
        username_showed,
        username_shower,
        cards,
        cards_to_show,
      });
    };

    // turno-show-cards
    const onTurnoShowCards = (username_showed, username_shower, card) => {
      if (verbose) console.log('onTurnoShowCards', username_showed, username_shower, card);
      // muestra la carta que ha enseñado el jugador
      // si te enseña a ti: muestra la carta
      // si te enseña a otro: muestra el dorso de la carta

      const i_am_showed = username_showed === socket.auth.username;
      let card_to_show = i_am_showed ? [card] : ['back'];
      if (!card_to_show) card_to_show = [];

      console.log('card_to_show', card_to_show);

      showCardShowed(username_showed, username_shower, card_to_show);
    };

    // turno-asks-for
    const onTurnoAsksForResponse = (username_asking, character, gun, room) => {
      if (verbose) console.log('onTurnoAsksForResponse', username_asking, character, gun, room);
      // mustra un modal enseñando que pregunta ha hecho el jugador
      // const text = `${username_asking} ha preguntado: ¿ha sido ${character} con ${gun} en ${room}?`;
      const cards = [character, gun, room];
      console.log('Cards GameLogic', cards);
      showQuestion(username_asking, cards);
    };

    socket.on('turno-owner', onTurnoOwner);
    socket.on('turno-moves-to-response', onTurnoMovesToResponse);
    socket.on('turno-show-cards', onTurnoShowCards);
    socket.on('turno-select-to-show', onTurnoSelectToShow);
    socket.on('turno-asks-for-response', onTurnoAsksForResponse);

    return () => {
      socket.off('turno-owner', onTurnoOwner);
      socket.off('turno-moves-to-response', onTurnoMovesToResponse);
      socket.off('turno-show-cards', onTurnoShowCards);
      socket.off('turno-select-to-show', onTurnoSelectToShow);
      socket.off('turno-asks-for-response', onTurnoAsksForResponse);
    };
  }),
    [socket];

  return null;
}
