import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./socket";

import { onGameInfo } from "../socketio";

export const GameInfoContext = createContext();

export function GameInfoProvider({ children }) {
  const { socket } = useContext(SocketContext);
  const [characters, setCharacters] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [guns, setGuns] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("request-game-info", {});

    const onGameInfoLocal = (data) => {
      // console.log("Available characters:", data.names);
      // console.log("Available guns:", data.guns);
      // console.log("Available rooms:", data.rooms);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
    };

    socket.on("game-info", onGameInfoLocal);

    return () => {
      socket.off("game-info", onGameInfoLocal);
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
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
}
