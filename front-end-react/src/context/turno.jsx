import { createContext, useState, useEffect, useContext } from "react";
import { CeldasContext } from "./celdas";
import { SocketContext } from "./socket";

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
  const [dados, setDados] = useState(5);
  const { socket } = useContext(SocketContext);

  // useEffect grande para controlar el flujo del turno
  useEffect(() => {
    if (!socket) return;

    socket.on("turno-owner", (username_owner) => {});
    socket.on("turno-asks-for", (username_asking, character, gun, room) => {});
    socket.on(
      "turno-show-cards",
      (username_showed, username_shower, character, gun, room) => {}
    );
    socket.on("turno-moves-to", (username, position) => {});

    // socket.on("fin-turno", () => {
    //   setParteTurno("espera-resto");
    // });

    return () => {
      socket.off("turno-owner");
      socket.off("turno-asks-for");
      socket.off("turno-show-cards");
      socket.off("turno-moves-to");
    };
  }, [socket]);

  useEffect(() => {
    // console.log("TURNO OWNER", turnoOwner);
    // console.log("PARTE TURNO", parteTurno);
  }, [turnoOwner, parteTurno]);


  return (
    <TurnoContext.Provider
      value={{
        turnoOwner,
        setTurnoOwner,
        parteTurno,
        setParteTurno,
        dados,
        setDados,
      }}
    >
      {children}
    </TurnoContext.Provider>
  );
}
