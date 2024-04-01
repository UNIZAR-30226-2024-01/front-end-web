import { useEffect } from "react";
import "../../../../../front-end-shared/css/Game/CharacterSelection.css";
import { BACKEND_URL } from "../../consts";
import { useState, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useCookies } from "react-cookie";

import { onAvailableCharacters } from "../../socketio";

export function CharacterSelection({ onSelectCharacter }) {
  const { socket } = useContext(SocketContext);
  const [cookies, setCookie] = useCookies(["username", "characters"]);

  const [characters, setCharacters] = useState([
    "falta",
    "recuperar",
    "nombres",
    "del backend",
    "según",
    "idGame",
  ]);

  const [availableCharacters, setAvailableCharacters] = useState([]);

  useEffect(() => {
    if (!socket) return;
    /* Recuperate the available characters from the DB using web sockets */
    console.log(socket);
    socket.emit("join-game", {});

    const onAvailableCharactersLocal = (data) => {
      onAvailableCharacters(data, setAvailableCharacters);
      // const { names, characters } = data;
      const dataParsed = JSON.stringify(data);
      setCookie("characters", dataParsed, { path: "/" });
    };

    socket.on("available-characters", onAvailableCharactersLocal);

    return () => {
      socket.off("available-characters", onAvailableCharactersLocal);
    };
  }, [socket]);

  return (
    <div className="characters-container">
      {characters.map((character, index) => {
        const isAvailable = availableCharacters[index];
        return (
          <div
            key={character}
            className={`individual-character ${isAvailable ? "" : "selected"}`}
            onClick={() => onSelectCharacter(character)}
          >
            {character}
          </div>
        );
      })}
    </div>
  );
}
