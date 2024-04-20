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
  const [cards, setCards] = useState(["SOPER", "CABLE", "ESCALERAS"]); // <-- falta dar valor correcto
  const [positions, setPositions] = useState([120, 432, 561, 16, 191, 566]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("request-game-info", {});

    const onCards = (data) => {
      // console.log("Available characters:", data.names);
      // console.log("Available guns:", data.guns);
      // console.log("Available rooms:", data.rooms);
      console.log("Cards:", data);
    };

    
    const onGameInfoLocal = (data) => {
      // console.log("Available characters:", data.names);
      // console.log("Available guns:", data.guns);
      // console.log("Available rooms:", data.rooms);
      onGameInfo(data, setCharacters, setUsernames, setGuns, setRooms);
    };
    
    socket.on("cards", onCards);
    socket.on("game-info", onGameInfoLocal);
    socket.on("hola", (data) => {
      socket.emit("hola-respuesta", "Hola desde el cliente");
      console.log("Hola", data);

      setTimeout(() => {
        socket.emit("hola-respuesta", "Hola de nuevo desde el cliente");
        console.log("reenviando hola");
      }, 5000);
    });

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
        cards,
        setCards,
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
}
