import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";

export function Game() {
  const style= {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }

  return (
    <>
      <Tarjeta />
      <Chat />
      <div style={style}>
        <Tablero />
      </div>
    </>
  );
}