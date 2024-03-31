import "../../../../../front-end-shared/css/Game/CharacterSelection.css";

export function CharacterSelection({ onSelectCharacter }) {
  const characters = [
    "character_1",
    "character_2",
    "character_3",
    "character_4",
    "character_5",
    "character_6",
  ];

  return (
    <div className="characters-container">
      {characters.map((character) => (
        <div
          key={character}
          className="individual-character"
          onClick={() => onSelectCharacter(character)}
        >
          {character}
        </div>
      ))}
    </div>
  );
}
