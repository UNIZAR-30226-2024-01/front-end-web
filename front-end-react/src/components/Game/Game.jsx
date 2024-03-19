import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
// import { Navbar } from "../Home/Navbar.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";
import { CartaDesplegable } from "./Cartas/CartaDesplegable.jsx";

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
      {/* <Navbar /> */}
      <Tarjeta />
      <Chat />
      <CartaDesplegable />
      <div style={style}>
        <Tablero />
      </div>
    </>
  );
}