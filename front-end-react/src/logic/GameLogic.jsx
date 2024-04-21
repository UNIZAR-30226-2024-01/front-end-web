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

export function GameLogicTurnoMovesTo(socket, username, position) {
  socket.emit('turno-moves-to', username, position);
}

// Llamadas WS gestionando los != eventos de la partida
export function GameLogic() {
  const verbose = false;
  const socket = useSocket();
  const { setTurnoOwner } = useContext(TurnoContext);
  const { usernames, setPlayerPositions } = useContext(CeldasContext);
  const { cards } = useContext(GameInfoContext);
  const { setSelectCardsToShow } = useContext(ShowCardsContext);

  useEffect(() => {
    if (!socket) return;

    // turno-owner
    const onTurnoOwner = (username) => {
      if (verbose) console.log('onTurnoOwner', username);
      setTurnoOwner(username);
    };

    // turno-moves-to
    const onTurnoMovesTo = (username, position) => {
      if (verbose) console.log('onTurnoMovesTo', username, position);
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
    const onTurnoShowCards = (username_showed, username_shower, character, gun, room) => {
      if (verbose) console.log('onTurnoShowCards', username_showed, username_shower, character, gun, room);
      // muestra las cartas que ha enseñado el jugador
    };

    socket.on('turno-moves-to', onTurnoMovesTo);
    socket.on('turno-owner', onTurnoOwner);

    socket.on('turno-select-to-show', onTurnoSelectToShow);
    socket.on('turno-show-cards', onTurnoShowCards);

    return () => {
      socket.off('turno-owner', onTurnoOwner);
      socket.off('turno-moves-to', onTurnoMovesTo);
      socket.off('turno-select-to-show', onTurnoSelectToShow);
      socket.off('turno-show-cards', onTurnoShowCards);
    };
  }),
    [socket];

  return null;
}
