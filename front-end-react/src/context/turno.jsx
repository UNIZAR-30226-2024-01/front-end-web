import { createContext, useState } from "react";

export const TurnoContext = createContext();

export function TurnoProvider({ children }) {
  const [turnoOwner, setTurnoOwner] = useState();
  const [parteTurno, setParteTurno] = useState();

  return (
    <TurnoContext.Provider
      value={{
        turnoOwner,
        setTurnoOwner,
        parteTurno,
        setParteTurno,
      }}
    >
      {children}
    </TurnoContext.Provider>
  );
}
