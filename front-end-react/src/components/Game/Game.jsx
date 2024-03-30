import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
import { NavbarGame } from "./NavbarGame.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";
import { CartaDesplegable } from "./Cartas/CartaDesplegable.jsx";
import { Turno } from "../Turno/Turno.jsx";

export function Game() {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const userStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "65%",
    padding: "0 30px",
    fontSize: "20px",
    color: "#fff",
    textShadow: "2px 2px 4px #000000",
  };

  /* Get the users from the database and if there isn't 
    enough players, set the name 'Bot_i' */

  return (
    <>
      {/* <Turno /> */}
      <NavbarGame />
      <Tarjeta />
      <Chat />
      <CartaDesplegable />
      <div style={style}>
        <div style={userStyle}>
          <h2> user1 </h2>
          <h2> user2 </h2>
          <h2> user3 </h2>
        </div>
        <Tablero />
        <div style={userStyle}>
          <h2> user4 </h2>
          <h2> user5 </h2>
          <h2> user6 </h2>
        </div>
      </div>
    </>
  );
}
