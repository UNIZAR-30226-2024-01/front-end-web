import { useEffect } from "react";
import "../../../../../front-end-shared/css/Game/CharacterSelection.css";
import { BACKEND_URL } from "../../consts";
import { useState } from "react";
// import { useFetch } from "../../hooks/useFetch";

export function CharacterSelection({ onSelectCharacter }) {
  const [characters, ] = useState([
    "falta",
    "recuperar",
    "nombres",
    "del backend",
    "según",
    "idGame",
  ]);

  const [availableCharacters, setAvailableCharacters] = useState([true, false, true, false, true, true]);

  useEffect(() => {
    /* Recuperate the available characters from the DB */
  //   fetch(`${BACKEND_URL}/availableCharacters`)
  //     .then((res) => res.json())
  //     // .then((data) => setAvailableCharacters(data)) // <-- Uncomment when the backend is ready
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  }, []);
  
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