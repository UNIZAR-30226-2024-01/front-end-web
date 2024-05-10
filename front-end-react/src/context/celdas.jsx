import { createContext, useContext, useEffect, useState } from 'react';
import { TurnoContext } from './turno';
import { cellsClose } from '../bfs.mjs';
import { useCookies } from 'react-cookie';
import { GameInfoContext } from './gameinfo';
import { infoTablero } from '../../../../front-end-shared/infoTablero';
import React from 'react';
export const CeldasContext = createContext();

export function CeldasProvider({ children }) {
  const { dados } = useContext(TurnoContext);
  const { usernames } = useContext(GameInfoContext);
  const [cookies] = useCookies(['username']);
  // Indica cuales están seleccionadas
  const [celdasOptions, setCeldasOptions] = useState(() => {
    // pasar array a JSON:
    const array = Array(24 * 24).fill(false);
    return array;
  });

  const [playerPositions, setPlayerPositions] = useState([]);

  const restartCeldas = () => {
    setCeldasOptions(Array(24 * 24).fill(false));
    setPlayerPositions([]);
  }

  useEffect(() => {
    if (!dados) return;
    // Actualizar css de celdas a las que se puede mover
    if (!usernames) return;
    const player_idx = usernames.indexOf(cookies.username);
    const pp = playerPositions[player_idx];
    if (!pp) return;
    const bfs = cellsClose(pp, dados, playerPositions);

    setCeldasOptions((prev) => {
      let newPrev = [...prev];
      bfs.forEach((c) => (newPrev[c] = true));
      playerPositions.forEach((c) => (newPrev[c] = false));

      const bfs_doors = bfs.filter((c) => infoTablero[c].isDoor);
      const bfs_rooms = bfs_doors.map((c) => infoTablero[c].roomName);
      const bfs_rooms_cells = infoTablero.filter((c) => bfs_rooms.includes(c.roomName)).map((c) => c.idx);
      bfs_rooms_cells.forEach((c) => (newPrev[c] = true));

      return newPrev;
    });
  }, [dados]);

  return (
    <CeldasContext.Provider
      value={{
        celdasOptions,
        setCeldasOptions,
        playerPositions,
        setPlayerPositions,

        restartCeldas,
      }}
    >
      {children}
    </CeldasContext.Provider>
  );
}
