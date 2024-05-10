import { useState, useEffect, useContext } from 'react';
import '../../../../../../front-end-shared/css/Game/Turno/Temporizador.css';
import { TurnoContext } from '../../../context/turno';
import React from 'react';
export function Temporizador({ tiempo, temporizadorDone }) {
  const [segundos, setSegundos] = useState(tiempo);

  useEffect(() => {
    const interval = setInterval(() => {
      if (segundos > 0) {
        setSegundos((prev) => prev - 1);
      } else {
        temporizadorDone();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [segundos]);

  return <div className="timer-in-your-turn">Tiempo restante: {segundos}</div>;
}
