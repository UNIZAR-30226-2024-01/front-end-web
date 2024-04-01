import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./socket";

import { onAvailableCharacters } from "../socketio";

export const UserCharContext = createContext();

export function UserCharProvider({ children }) {
  const { socket } = useContext(SocketContext);
  const [characters, setCharacters] = useState([]);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("request-available-characters", {});

    const onAvailableCharactersLocal = (data) => {
      console.log("Available characters:", data);
      onAvailableCharacters(data, setCharacters, setUsernames);
    };

    socket.on("available-characters", onAvailableCharactersLocal);

    return () => {
      socket.off("available-characters", onAvailableCharactersLocal);
    };
  }, [socket]);

  return (
    <UserCharContext.Provider
      value={{
        characters,
        setCharacters,
        usernames,
        setUsernames,
      }}
    >
      {children}
    </UserCharContext.Provider>
  );
}
