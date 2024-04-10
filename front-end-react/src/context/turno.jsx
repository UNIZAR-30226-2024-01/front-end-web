import { createContext, useState } from "react";

export const TurnoContext = createContext();
/* 
espera-resto --> ESPEANDO CONFIRMACIÓN RESTO JUGADORES
es-tu-turno -> ES TU TURNO
dados -> DADOS
elegir-casilla -> ELEGIR CASILLA
elegir-pregunta -> ELEGIR PREGUNTA
*/

export function TurnoProvider({ children }) {
  const [turnoOwner, setTurnoOwner] = useState("mr SOPER");
  const [parteTurno, setParteTurno] = useState("espera-resto");

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
