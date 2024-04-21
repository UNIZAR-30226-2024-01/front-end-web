import { createContext, useContext, useEffect, useState } from 'react';
import { SocketContext } from './socket';

import { onGameInfo } from '../socketio';

export const GameInfoContext = createContext();

export function GameInfoProvider({ children }) {
  const { socket } = useContext(SocketContext);
  const [characters, setCharacters] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [guns, setGuns] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [cards, setCards] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.emit('request-game-info', {});

    const onCards = (data) => {
      console.log('Cards:', data);
      setCards(data);
    };

    const onGameInfoLocal = (data) => {
      // console.log("Available characters:", data.names);
      // console.log("Available guns:", data.guns);
      // console.log("Available rooms:", data.rooms);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
    };

    const onStartGame = (data) => {
      setStarted(true);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
    };

    socket.on('cards', onCards);
    socket.on('game-info', onGameInfoLocal);
    socket.on('start-game', onStartGame);

    return () => {
      socket.off('game-info', onGameInfoLocal);
      socket.off('cards', onCards);
      socket.off('start-game', onStartGame);
    };
  }, [socket]);

  return (
    <GameInfoContext.Provider
      value={{
        characters,
        setCharacters,
        usernames,
        setUsernames,
        guns,
        setGuns,
        rooms,
        setRooms,
        cards,
        setCards,
        started,
        setStarted,
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
}
