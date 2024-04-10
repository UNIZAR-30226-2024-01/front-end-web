import { createContext, useState } from "react";

export const CeldasContext = createContext();

export function CeldasProvider({ children }) {
  const [celdasOptions, setCeldasOptions] = useState(() => {
    // pasar array a JSON:
    const array = Array(24 * 24).fill(false);
    return JSON.stringify(array);
  });
  return (
    <CeldasContext.Provider
      value={{
        celdasOptions,
        setCeldasOptions,
      }}
    >
      {children}
    </CeldasContext.Provider>
  );
}
