import { useContext, useEffect, useState } from "react";
import "../../../../../../front-end-shared/css/Game/Turno/Turno.css";
import "../../../../../../front-end-shared/css/Game/Turno/Temporizador.css";
import { Dados } from "./Dados";
import { Carrusel } from "./Carrusel";
import { DesplegablesContext } from "../../../context/desplegables";
import { TurnoContext } from "../../../context/turno";
import { GameInfoContext } from "../../../context/gameinfo";
import { SocketContext } from "../../../context/socket";
import { Temporizador } from "./Temporizador";

export function Turno() {
  const {
    setChatDesplegado,
    setTarjetaDesplegado,
    setCartasDesplegado,
    setOpcionesDesplegado,
  } = useContext(DesplegablesContext);
  const { parteTurno, setParteTurno } = useContext(TurnoContext);
  const { characters, guns, rooms } = useContext(GameInfoContext);
  const { socket } = useContext(SocketContext);

  // ocultar todos los desplegables al inicio del turno
  useEffect(() => {
    setChatDesplegado(false);
    setTarjetaDesplegado(false);
    setCartasDesplegado(false);
    setOpcionesDesplegado(false);
    console.log("Turno iniciado");
    setParteTurno("es-tu-turno");
  }, []);

  useEffect(() => {
    console.log("Nueva parte del turno: " + parteTurno);
  }, [parteTurno]);

  const [dice, setDice] = useState(0);

  const handleDiceRoll = (totalValue) => {
    setDice(totalValue); // Establecer el valor obtenido entre los dos dados

    console.log("Dados lanzados, valor: " + totalValue);

    setTimeout(() => {
      setParteTurno("elegir-casilla");
    }, 2000);
  };

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

    return () => {
      socket.off("turno-owner");
      socket.off("turno-asks-for");
      socket.off("turno-show-cards");
      socket.off("turno-moves-to");
    };
  }, [socket]);

  return (
    <div className="turno">
      {parteTurno == "espera-resto" && (
        <button
          onClick={() => {
            setParteTurno("es-tu-turno");
          }}
        >
          Iniciar partida
        </button>
      )}

      {parteTurno == "es-tu-turno" && (
        <div>
          <h1 className="tu-turno-texto">Es tu turno</h1>
          <script>
            {setTimeout(() => {
              setParteTurno("dados");
            }, 2000)}
          </script>
        </div>
      )}

      {(parteTurno == "dados" || parteTurno == "elegir-casilla" || parteTurno == "elegir-pregunta") && (
        <Temporizador tiempo="30"></Temporizador>
      )}

      {parteTurno == "dados" && (
        <div id="turno-dados">
          <Dados
            buttonText={"Tirar los dados"}
            finRoll={handleDiceRoll} /* onEndRoll={EndRoll} */
          />
          {dice != 0 && <h1>Has sacado un {dice}</h1>}
        </div>
      )}

      {parteTurno == "elegir-casilla" && (
        <div id="turno-tablero">
          <h1>¡Elige una casilla!</h1>
          {/* Poner un onClick para que se cambie a "elegir-pregunta" cuando se seleccione una casilla */}
          {/* <script>
            {setTimeout(() => {
              setParteTurno("elegir-pregunta");
            }, 2000)}
          </script> */}
        </div>
      )}

      {parteTurno == "elegir-pregunta" && (
        <div id="turno-cartas">
          <h1>Elige una pregunta</h1>
          <div className="container-cartas">
            <div className="carta-quien">
              <h2>¿Quién lo hizo?</h2>
              <p>Elige un sospechoso</p>
              {/* <Carta /> */}
              <Carrusel options={characters} />
            </div>
            <div className="carta-arma">
              <h2>¿Con qué lo hizo?</h2>
              <p>Elige un arma</p>
              <Carrusel options={guns} />
            </div>
            <div className="carta-donde">
              <h2>¿Dónde lo hizo?</h2>
              <p>Elige una habitación</p>
              <Carrusel options={rooms} />
            </div>
          </div>

          <button style={{ marginTop: "15px" }}>Realizar sospecha🧐</button>
        </div>
      )}
    </div>
  );
}
