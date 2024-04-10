import "../../../../../front-end-shared/css/Game/CharacterSelection.css";
import { /* useState, */ useContext, /* useEffect */ } from "react";
import { SocketContext } from "../../context/socket";
import { useCookies } from "react-cookie";

import { GameInfoContext } from "../../context/gameinfo";

export function CharacterSelection({ onCharacterSelected }) {
  // export function CharacterSelection({ onSelectCharacter }) {
  const { socket } = useContext(SocketContext);
  const { usernames, characters } = useContext(GameInfoContext);
  const [, setCookie] = useCookies(["mycharacter", "characters"]);

  const selectCharacter = (event) => {
    const character = event.target.innerText;
    const index = characters.indexOf(character);
    if (usernames[index] != "") return;

    // onSelectCharacter(character);
    setCookie("mycharacter", character, { path: "/" });
    socket.emit("character-selected", character);
    onCharacterSelected();
  };

  return (
    <div className="characters-container">
      {characters.map((character, index) => {
        const isAvailable = usernames[index] == "";
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
