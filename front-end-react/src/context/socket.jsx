import { createContext, useState } from 'react';
import React from 'react';
export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
