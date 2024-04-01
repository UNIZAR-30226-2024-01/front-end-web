import "../../../../../front-end-shared/css/Game/Game.css";

import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
import { NavbarGame } from "./NavbarGame.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";
import { CartaDesplegable } from "./Cartas/CartaDesplegable.jsx";
import { CharacterSelection } from "./CharacterSelection.jsx";
// import { Turno } from "./Turno/Turno.jsx";
import { useEffect, useState, useContext } from "react";
import { useFetch } from "../../hooks/useFetch.jsx";
import { useCookies } from "react-cookie";

import { SocketContext } from "../../context/socket";
import { socketio } from "../../socketio";

export function Game() {
  const [characterSelection, setCharacterSelection] = useState(true);
  const [myCharacter, setMyCharacter] = useState(null);
  const [cookies] = useCookies(["username", "group"]);

  const { socket, setSocket } = useContext(SocketContext);

  const useHandleCharacterSelection = (character) => {
    setMyCharacter(character);
    setCharacterSelection(false); // Close the modal

    // Send the character to the backend
    const { error } = useFetch(
      "/characterSelected",
      { username: cookies.username, character: myCharacter },
      "PUT"
    );
    if (error) console.error("Error sending character to the backend:", error);
  };

  useEffect(() => {
    setSocket(socketio);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.auth.username = cookies.username ?? "anonymous";
    socket.auth.group = cookies.group ?? "0";
    socket.connect();
  }, [socket]);

  /* Get the users from the database and if there isn't
    enough players, set the name 'Bot_i' */

  return (
    <>
      {characterSelection && (
        <div className="game-characters-selection">
          <CharacterSelection onSelectCharacter={useHandleCharacterSelection} />
        </div>
      )}
      {/* <Turno /> */}
      <NavbarGame />
      <Tarjeta />
      <Chat />
      <CartaDesplegable />
      <div className="main-board">
        <div className="users-info">
          <h2> user1 </h2>
          <h2> user2 </h2>
          <h2> user3 </h2>
        </div>
        <Tablero />
        <div className="users-info">
          <h2> user4 </h2>
          <h2> user5 </h2>
          <h2> user6 </h2>
        </div>
      </div>
    </>
  );
}
