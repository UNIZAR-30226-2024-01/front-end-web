import "../../../../../../front-end-shared/css/Game/Turno/Turno.css";
import { Dados } from "./Dados";

export function Turno() {
  const EndRoll = () => {
    console.log("Fin de tirar los dados");

    const $turnoDados = document.getElementById("turno-dados");
    const $turnoTablero = document.getElementById("turno-tablero");
    // const $turnoCartas = document.getElementById("turno-cartas");

    $turnoDados.classList.remove("turno-active");
    $turnoDados.classList.add("turno-inactive");
    $turnoTablero.classList.add("turno-active");
  };

  return (
    <div className="turno">
      <div id="turno-dados" className="turno-active">
        <Dados buttonText={"Tirar los dados"} onEndRoll={EndRoll} />
      </div>
      <div id="turno-tablero" className="turno-inactive"></div>
      <div id="turno-cartas" className="turno-inactive"></div>
    </div>
  );
}
