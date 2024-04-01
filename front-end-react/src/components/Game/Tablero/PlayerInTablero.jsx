import { useContext } from "react";
import "../../../../../../front-end-shared/css/Game/Tablero/PlayerInTablero.css";
import { UserCharContext } from "../../../context/userchar";

export function PlayerInTablero({ index }) {
  const { characters, usernames } = useContext(UserCharContext);

  const character = characters[index];
  let username = usernames[index];
  const side = index < 3 ? "left" : "right";

  if (!username) {
    username = "anonymous";
  }
  const className = `player ${side}`;

  let style = {};
  switch (character) {
    case "mr SOPER":
      style = { color: "#80b37e" };
      break;
    case "miss REDES":
      style = { color: "#fcfd7f" };
      break;
    case "mr PROG":
      style = { color: "#7fd2e7" };
      break;
    case "miss FISICA":
      style = { color: "#fdfdfd" };
      break;
    case "mr DISCRETO":
      style = { color: "#dea9fb" };
      break;
    case "miss IA":
      style = { color: "#fc7e7e" };
      break;
    default:
      style = { color: "#000" };
      break;
  }

  return (
    <div style={style} className={className}>
      <h1>{username}</h1>
      <h2>{character}</h2>
    </div>
  );
}
