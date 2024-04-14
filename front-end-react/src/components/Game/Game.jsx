import "../../../../../front-end-shared/css/Game/Game.css";

import { Tarjeta } from "./Tarjeta/Tarjeta.jsx";
import { NavbarGame } from "./NavbarGame.jsx";
import { Chat } from "./Chat/Chat.jsx";
import { Tablero } from "./Tablero/Tablero.jsx";
import { Turno } from "./Turno/Turno.jsx";
import { CartaDesplegable } from "./Cartas/CartaDesplegable.jsx";
import { CharacterSelection } from "./CharacterSelection.jsx";
// import { Turno } from "./Turno/Turno.jsx";
import { useEffect, useState, useContext } from "react";
import { useFetch } from "../../hooks/useFetch.jsx";
import { useCookies } from "react-cookie";

import { SocketContext } from "../../context/socket";
import { socketio } from "../../socketio";
import { MainTablero } from "./Tablero/MainTablero.jsx";

export function Game() {
  const [characterSelection, setCharacterSelection] = useState(true);
  const [cookies] = useCookies(["username", "group"]);
  const [iniciada, setIniciada] = useState(false);

  const { socket, setSocket } = useContext(SocketContext);

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

  const startGame = () => {
    setIniciada(true);
    console.log("start game");
    socket.emit("start-game");
  };

  const handleCharacterSelection = () => {
    console.log("character selected");
    setCharacterSelection(false);
  };

  return (
    <>
      {/* {characterSelection && (
        <div className="game-characters-selection">
          <CharacterSelection onCharacterSelected={handleCharacterSelection} />
        </div>
      )} */}
      {/* {!iniciada && (
        <button className="start-game-button" onClick={startGame}>
          Comenzar partida
        </button>
      )} */}
      
      <Turno />
      <NavbarGame />
      <Tarjeta />
      <Chat />
      <CartaDesplegable />
      <MainTablero />
    </>
  );
}
