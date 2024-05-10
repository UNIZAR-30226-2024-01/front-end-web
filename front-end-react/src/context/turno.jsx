import { createContext, useState } from 'react';
import React from 'react';
export const TurnoContext = createContext();
/* 
espera-resto --> ESPEANDO CONFIRMACIÓN RESTO JUGADORES
es-tu-turno -> ES TU TURNO
dados -> DADOS
elegir-casilla -> ELEGIR CASILLA
elegir-pregunta -> ELEGIR PREGUNTA
*/

export function TurnoProvider({ children }) {
  const [turnoOwner, setTurnoOwner] = useState('');
  const [parteTurno, setParteTurno] = useState('espera-resto');
  const [dados, setDados] = useState();

  const restartTurno = () => {
    setTurnoOwner('');
    setParteTurno('espera-resto');
    setDados();
  };

  return (
    <TurnoContext.Provider
      value={{
        turnoOwner,
        setTurnoOwner,
        parteTurno,
        setParteTurno,
        dados,
        setDados,
        restartTurno,
      }}
    >
      {children}
    </TurnoContext.Provider>
  );
}
