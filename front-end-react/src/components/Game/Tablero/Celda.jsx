import { useContext, useState } from "react";
import "../../../../../../front-end-shared/css/Game/Tablero/Celda.css";
import { infoTablero } from "../../../../../../front-end-shared/infoTablero.js";
import { CeldasContext } from "../../../context/celdas.jsx";
import { Door } from "../../Icons.jsx";

import { cellsClose } from "../../../bfs.mjs";

function useCellContext(index) {
  const handleClickContext = (index, dice) => {
    if (clicked) {
      const array = Array(24 * 24).fill(false);
      setCeldasOptions(JSON.stringify(array));
      setClicked((prev) => !prev);
      return;
    }
    const array = Array(24 * 24).fill(false);
    const bfs = cellsClose(index, dice);
    bfs.forEach((c) => (array[c] = true));
    setClicked((prev) => !prev);
    setCeldasOptions(JSON.stringify(array));
  };

  const [clicked, setClicked] = useState(false);
  const { celdasOptions, setCeldasOptions } = useContext(CeldasContext);
  const infoCellContext = JSON.parse(celdasOptions)[index];
  const infoCell = infoTablero[index];
  let selected = false;
  infoCellContext ? (selected = true) : null;
  if (infoCell.isRoom) {
    // buscar las puertas de la habitacion
    const doors = infoTablero.filter(
      (c) => c.roomName === infoCell.roomName && c.isDoor
    );
    // si alguna esta seleccionada, añadir clase
    if (doors.some((c) => JSON.parse(celdasOptions)[c.idx])) {
      selected = true;
    }
  }
  return { selected, handleClickContext };
}

function setSize(tam) {
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
  return style;
}

export function Celda({ fil, col, tam = "m" }) {
  let style = setSize(tam);

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

  const { selected, handleClickContext } = useCellContext(fil * 24 + col);

  selected ? (clase += " selected") : null;
  style.width = style.width + "px";
  style.height = style.height + "px";
  const handleClick = () => handleClickContext(fil * 24 + col, 2);

  return (
    <div style={style} className={clase} onClick={handleClick}>
      {
        infoCell?.isDoor ? <Flecha dir={infoCell.isDoor} /> : null
        // infoCell?.isDoor ? <Flecha dir={infoCell.isDoor} /> : fil * 24 + col
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
