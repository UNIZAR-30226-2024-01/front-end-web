import { createContext, useContext, useEffect, useState } from 'react';
import { SocketContext } from './socket';

export const GameInfoContext = createContext();

export function GameInfoProvider({ children }) {
  const { socket } = useContext(SocketContext);

  const [characters, setCharacters] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [guns, setGuns] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [cards, setCards] = useState([]);
  const [sospechas, setSospechas] = useState([]);
  
  const [requestedPause, setRequestedPause] = useState(false);
  const [pausedGame, setPausedGame] = useState(false);
  
  const [started, setStarted] = useState(false);

  const restartGameInfo = () => {
    setCharacters([]);
    setUsernames([]);
    setGuns([]);
    setRooms([]);
    setCards([]);
    setStarted(false);
    setSospechas([]);
    setRequestedPause(false);
    setPausedGame(false);
  };

  useEffect(() => {
    if (!socket) return;
    console.log('Requesting game info...');

    // puesto por que es posible que envie un mensaje antes de que el socket este conectado
    setTimeout(() => {
      socket.emit('request-game-info', {});
    }, 1000);
  }, [socket]);

  return (
    <GameInfoContext.Provider
      value={{
        restartGameInfo,

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
        sospechas,
        setSospechas,

        requestedPause,
        setRequestedPause,
        pausedGame,
        setPausedGame,
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
}
