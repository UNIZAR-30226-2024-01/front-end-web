import { createContext, useState } from "react";

// 1. crear el contexto
export const DesplegablesContext = createContext();

// 2. crear el Provider, para proveer el contexto
export function DesplegablesProvider({ children }) {
  const [opcionesDesplegado, setOpcionesDesplegado] = useState(false);
  const [chatDesplegado, setChatDesplegado] = useState(false);
  const [cartasDesplegado, setCartasDesplegado] = useState(false);
  const [tarjetaDesplegado, setTarjetaDesplegado] = useState(false);

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
      }}
    >
      {children}
    </DesplegablesContext.Provider>
  );
}
