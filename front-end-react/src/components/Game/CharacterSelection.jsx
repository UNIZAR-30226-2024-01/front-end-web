import '../../../../../front-end-shared/css/Game/CharacterSelection.css';
import { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { useParams } from 'react-router-dom';

import { GameInfoContext } from '../../context/gameinfo';

export function CharacterSelection({ onCharacterSelected }) {
  // export function CharacterSelection({ onSelectCharacter }) {
  const { socket } = useContext(SocketContext);
  const { usernames, characters } = useContext(GameInfoContext);
  const { idGame } = useParams();

  const selectCharacter = (event) => {
    const character = event.target.innerText;
    const index = characters.indexOf(character);
    if (usernames[index] != '') return;

    socket.emit('character-selected', character);
    onCharacterSelected();
  };

  return (
    <div className="characters-selection">
      <h1>
        <u>ID de partida:</u> {idGame}
      </h1>
      <div className="characters-container">
        {characters.map((character, index) => {
          const isAvailable = usernames[index] == '';
          return (
            <div
              key={character}
              className={`individual-character ${isAvailable ? '' : 'selected'}`}
              onClick={selectCharacter}
            >
              {character}
            </div>
          );
        })}
      </div>
    </div>
  );
}
