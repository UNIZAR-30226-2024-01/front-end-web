import { createContext, useState } from 'react';
import React from 'react';
export const DesplegablesContext = createContext();

export function DesplegablesProvider({ children }) {
  const [opcionesDesplegado, setOpcionesDesplegado] = useState(false);
  const [chatDesplegado, setChatDesplegado] = useState(false);
  const [cartasDesplegado, setCartasDesplegado] = useState(false);
  const [tarjetaDesplegado, setTarjetaDesplegado] = useState(false);

  const restartDesplegables = () => {
    setOpcionesDesplegado(false);
    setChatDesplegado(false);
    setCartasDesplegado(false);
    setTarjetaDesplegado(false);
  }

  return (
    <DesplegablesContext.Provider
      value={{
        chatDesplegado,
        setChatDesplegado,
        tarjetaDesplegado,
        setTarjetaDesplegado,
        cartasDesplegado,
        setCartasDesplegado,
        opcionesDesplegado,
        setOpcionesDesplegado,
        restartDesplegables,
      }}
    >
      {children}
    </DesplegablesContext.Provider>
  );
}
