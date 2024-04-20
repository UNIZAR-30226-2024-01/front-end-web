import { createContext, useContext, useEffect, useState } from 'react';
import { TurnoContext } from './turno';
import { cellsClose } from '../bfs.mjs';
import { useCookies } from 'react-cookie';
import { GameInfoContext } from './gameinfo';

export const CeldasContext = createContext();

export function CeldasProvider({ children }) {
  const { dados, setDados } = useContext(TurnoContext);
  const { usernames } = useContext(GameInfoContext);
  const [cookies] = useCookies(['username']);
  // Indica cuales están seleccionadas
  const [celdasOptions, setCeldasOptions] = useState(() => {
    // pasar array a JSON:
    const array = Array(24 * 24).fill(false);
    return array;
  });

  const [playerPositions, setPlayerPositions] = useState([120, 432, 561, 16, 191, 566]);

  useEffect(() => {
    if (!dados) return;
    // Actualizar css de celdas a las que se puede mover
    if (!usernames) return;
    const player_idx = usernames.indexOf(cookies.username);
    const pp = playerPositions[player_idx];
    if (!pp) return;
    const bfs = cellsClose(pp, dados);

    setCeldasOptions((prev) => {
      const newPrev = [...prev];
      bfs.forEach((c) => (newPrev[c] = true));
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
      }}
    >
      {children}
    </CeldasContext.Provider>
  );
}
