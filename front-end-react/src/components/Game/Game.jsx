import { Tarjeta } from "./Tarjeta/Tarjeta";
import { Chat } from "./Chat/Chat";
import { Tablero } from "./Tablero/Tablero";

export function Game() {
  return (
    <>
      <Tarjeta />
      <Chat />
      <Tablero />
    </>
  );
}