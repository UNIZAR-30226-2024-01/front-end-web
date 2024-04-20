import "../../../../../../front-end-shared/css/Game/Tablero/Tablero.css";

import { Celda } from "./Celda.jsx";
import { Text } from "./Text.jsx";
import { useState, useEffect, useContext } from "react";
import { TurnoContext } from "../../../context/turno.jsx";
import { useCookies } from "react-cookie";
import { CeldasContext } from "../../../context/celdas.jsx";

export function Tablero() {
  const [size] = useState("m");
  const [filas] = useState(24);
  const [columnas] = useState(24);
  const [tablero, setTablero] = useState([]);
  const [cookies] = useCookies(["username"]);

  const { playerPositions, setPlayerPositions } = useContext(CeldasContext);

  useEffect(() => {
    const newTablero = [];
    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        // Initialize each cell with default properties
        // You can modify this to set up your rooms and players
        fila.push({ isRoom: false, roomName: "", hasPlayer: false });
      }
      newTablero.push(fila);
    }
    setTablero(newTablero);
  }, [filas, columnas]);

  const [rooms] = useState(10);

  const { turnoOwner, parteTurno } = useContext(TurnoContext);
  const style = `tablero-body ${parteTurno === "elegir-casilla" ? "being-chosen" : ""}`;

  const handleClickOnCell = (idx) => {
    if (turnoOwner == turnoOwner && parteTurno === "elegir-casilla") {
      // if (turnoOwner == cookies.username && parteTurno === "elegir-casilla") {
      const player_idx = 0;
      // const player_idx = playerPositions.indexOf(idx);

      console.log("Cell clicked", idx);
      setPlayerPositions((prev) => {
        const newPrev = [...prev];
        newPrev[player_idx] = idx;
        console.log("newPrev", newPrev);
        return newPrev;
      });
    }
  };

  return (
    <div className={style}>
      <div className="tablero">
        {tablero.map((fila, i) => (
          <div className="fila" key={i}>
            {fila.map((celda, j) => (
              <Celda
                key={j}
                fil={i}
                col={j}
                tam={size}
                selected={true}
                handleClickOnCell={handleClickOnCell}
              />
            ))}
          </div>
        ))}
        <div className="texts">
          {[...Array(rooms)].map((_, idx) => {
            return <Text idx={idx + 1} key={idx} />;
          })}
        </div>
      </div>
      {/* <div className='tablero-container-button'>
                <button onClick={() => {setSize('s')}}>S</button>
                <button onClick={() => {setSize('m')}}>M</button>
                <button onClick={() => {setSize('l')}}>L</button>
            </div> */}
    </div>
  );
}
