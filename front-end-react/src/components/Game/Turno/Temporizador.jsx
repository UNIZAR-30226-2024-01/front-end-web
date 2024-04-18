import { useState, useEffect, useContext } from "react";
import "../../../../../../front-end-shared/css/Game/Turno/Temporizador.css";
import { TurnoContext } from "../../../context/turno";

export function Temporizador({ tiempo }) {
  const [segundos, setSegundos] = useState(tiempo);
  const { setParteTurno } = useContext(TurnoContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (segundos > 0) {
        setSegundos((prev) => prev - 1);
      } else {
        setParteTurno("fin-turno"); // terminar turno si se acaba el tiempo
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [segundos]);

  return <div className="timer-in-your-turn">Tiempo restante: {segundos}</div>;
}
