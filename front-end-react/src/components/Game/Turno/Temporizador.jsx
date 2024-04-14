import { useState, useEffect } from "react";
import "../../../../../../front-end-shared/css/Game/Turno/Temporizador.css";

export function Temporizador({ tiempo }) {
  const [segundos, setSegundos] = useState(tiempo);

  useEffect(() => {
    const interval = setInterval(() => {
      if (segundos > 0) {
        setSegundos((prev) => prev - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [segundos]);

  return <div className="timer-in-your-turn">Tiempo restante: {segundos}</div>;
}
