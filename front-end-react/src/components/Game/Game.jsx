import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
import { NavbarGame } from "./NavbarGame.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";
import { CartaDesplegable } from "./Cartas/CartaDesplegable.jsx";

export function Game() {
  const style= {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }

  const userStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "65%",
    padding: "0 30px",
    fontSize: "20px",
    color: "#fff",
    textShadow: "2px 2px 4px #000000",
  }

  /* Get the users from the database and if there isn't 
    enough players, set the name 'Bot_i' */

  return (
    <>
      <NavbarGame />
      <Tarjeta />
      <Chat />
      <CartaDesplegable />
      <div style={style}>
        <div style={userStyle}>
          <p> user1 </p>
          <p> user2 </p>
          <p> user3 </p>
        </div>
        <Tablero />
        <div style={userStyle}>
          <p> user4 </p>
          <p> user5 </p>
          <p> user6 </p>
        </div>
      </div>
    </>
  );
}