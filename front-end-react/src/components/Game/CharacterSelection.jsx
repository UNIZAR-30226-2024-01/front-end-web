import { useEffect } from "react";
import "../../../../../front-end-shared/css/Game/CharacterSelection.css";
import { useState, useContext } from "react";
import { SocketContext } from "../../context/socket";
import { useCookies } from "react-cookie";

import { onAvailableCharacters } from "../../socketio";

export function CharacterSelection({ onCharacterSelected }) {
  // export function CharacterSelection({ onSelectCharacter }) {
  const { socket } = useContext(SocketContext);
  const [cookies, setCookie] = useCookies(["username", "characters"]);

  const [characters, setCharacters] = useState([]);

  const [availableCharacters, setAvailableCharacters] = useState([]);

  useEffect(() => {
    if (!socket) return;
    /* Recuperate the available characters from the DB using web sockets */
    socket.emit("join-game", {});

    const onAvailableCharactersLocal = (data) => {
      onAvailableCharacters(data, setAvailableCharacters);

      setCharacters(data.names);
      const dataParsed = JSON.stringify(data);
      setCookie("characters", dataParsed, { path: "/" });
    };

    socket.on("available-characters", onAvailableCharactersLocal);

    return () => {
      socket.off("available-characters", onAvailableCharactersLocal);
    };
  }, [socket]);

  const selectCharacter = (event) => {
    const character = event.target.innerText;
    const index = characters.indexOf(character);
    if (availableCharacters[index] != "") return;

    // onSelectCharacter(character);
    setCookie("mycharacter", character, { path: "/" });
    socket.emit("character-selected", character);
    onCharacterSelected();
  };

  return (
    <div className="characters-container">
      {characters.map((character, index) => {
        const isAvailable = availableCharacters[index] == "";
        return (
          <div
            key={character}
            className={`individual-character ${isAvailable ? "" : "selected"}`}
            onClick={selectCharacter}
          >
            {character}
          </div>
        );
      })}
    </div>
  );
}
