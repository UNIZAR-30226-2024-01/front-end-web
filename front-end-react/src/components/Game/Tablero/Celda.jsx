import "../../../../../../front-end-shared/css/Game/Tablero/Celda.css";
import { infoTablero } from "../../../../../../front-end-shared/infoTablero.js";
import { Door } from "../../Icons.jsx";

export function Celda({ fil, col, tam = "m" }) {
  let style;
  switch (tam) {
    case "s":
      style = {
        width: 22,
        height: 22,
      };
      break;

    case "m":
      style = {
        width: 26,
        height: 26,
      };
      break;

    case "l":
      style = {
        width: 30,
        height: 30,
      };
      break;

    default:
      break;
  }

  const infoCell = infoTablero[fil * 24 + col];

  let clase = "";
  if (infoCell?.isRoom) {
    clase = "room room-" + infoCell.roomName;
    style.width = style.width + 2;
    style.height = style.height + 2;
  } else if (!infoCell?.isWalkable) {
    clase = "invalid";
    style.width = style.width + 2;
    style.height = style.height + 2;
  } else {
    clase =
      "celda " +
      (fil % 2 === 0
        ? col % 2 === 0
          ? "dark"
          : "light"
        : col % 2 === 0
          ? "light"
          : "dark");
    if (infoCell?.isStartingCell) {
      clase += " start start-" + infoCell.isStartingCell;
    }
  }

  style.width = style.width + "px";
  style.height = style.height + "px";
  return (
    <div style={style} className={clase}>
      {
        // infoCell?.isDoor ? <Door dir={infoCell.isDoor}/> : null
        infoCell?.isDoor ? (
          <Flecha dir={infoCell.isDoor} />
        ) : null /*fil * 24 + col*/
      }
      {infoCell?.isStartingCell ? (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />{" "}
        </svg>
      ) : null}
    </div>
  );
}

function Flecha({ dir }) {
  let style = {};
  if (dir == "u") style = { rotate: "270deg" };
  else if (dir == "d") style = { rotate: "90deg" };
  else if (dir == "l") style = { rotate: "180deg" };
  else if (dir == "r") style = { rotate: "0deg" };
  else return dir;
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
