import { useState, useEffect } from "react";
import React from 'react';


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

  return <div>{segundos}</div>;
}
