import { useContext, useEffect } from "react";
import "../../../../../../front-end-shared/css/Game/Turno/Turno.css";
import { Dados } from "./Dados";
import { DesplegablesContext } from "../../../context/desplegables";
import { TurnoContext } from "../../../context/turno";
import { TurnoParte } from "./TurnoParte";

export function Turno() {
  const {
    setChatDesplegado,
    setTarjetaDesplegado,
    setCartasDesplegado,
    setOpcionesDesplegado,
  } = useContext(DesplegablesContext);
  const { parteTurno, setParteTurno } = useContext(TurnoContext);

  // const EndRoll = () => {
  //   console.log("Fin de tirar los dados");

  //   const $turnoDados = document.getElementById("turno-dados");
  //   const $turnoTablero = document.getElementById("turno-tablero");
  //   // const $turnoCartas = document.getElementById("turno-cartas");

  //   $turnoDados.classList.remove("turno-active");
  //   $turnoDados.classList.add("turno-inactive");
  //   $turnoTablero.classList.add("turno-active");
  // };

  // ocultar todos los desplegables al inicio del turno
  useEffect(() => {
    setChatDesplegado(false);
    setTarjetaDesplegado(false);
    setCartasDesplegado(false);
    setOpcionesDesplegado(false);
    console.log("Turno iniciado");
    setParteTurno("informar");
  }, []);

  useEffect(() => {
    console.log(parteTurno);
  }, [parteTurno]);

  return (
    <div className="turno">
      <TurnoParte turno="informar">
        <h1 className="tu-turno-texto">Es tu turno</h1>
      </TurnoParte>
      <TurnoParte turno="informar">
        <div id="turno-dados">
          <Dados buttonText={"Tirar los dados"} /* onEndRoll={EndRoll} */ />
        </div>
      </TurnoParte>

      <TurnoParte turno="elegir-casilla">
        <div id="turno-tablero"></div>
      </TurnoParte>

      <TurnoParte turno="elegir-pregunta">
        <div id="turno-cartas"></div>
      </TurnoParte>
    </div>
  );
}
