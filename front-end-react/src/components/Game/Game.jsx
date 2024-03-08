import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";

export function Game() {
  return (
    <>
      <Tarjeta />
      <Chat />
      <Tablero />
    </>
  );
}